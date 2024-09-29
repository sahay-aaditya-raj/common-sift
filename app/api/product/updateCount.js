import Product from "@/models/product";
import Count from "@/models/count";
import { connectMongoDB } from "@/lib/mongodb";

export default async function updateVisitCount(productId) {
    try {
        await connectMongoDB();
        const currentDate = new Date();
        const count = await Count.findOne({ productId });

        if (!count) {
            // Create a new count entry if it doesn't exist
            await Count.create({
                productId,
                dailyVisits: 1,
                weeklyVisits: 1,
                monthlyVisits: 1,
                yearlyVisits: 1,
                lastVisit: currentDate, // Set lastVisit when creating
            });
            return;
        }

        const lastVisit = new Date(count.lastVisit);

        // Reset daily visits if the day has changed (ignores time)
        const isNewDay = currentDate.toDateString() !== lastVisit.toDateString();
        const isNewWeek = currentDate.getTime() - lastVisit.getTime() >= 7 * 24 * 60 * 60 * 1000;
        const monthDifference = currentDate.getMonth() - lastVisit.getMonth() + (12 * (currentDate.getFullYear() - lastVisit.getFullYear()));
        const yearDifference = currentDate.getFullYear() - lastVisit.getFullYear();

        // Reset counters if the time period has changed
        if (isNewDay) count.dailyVisits = 0;
        if (isNewWeek) count.weeklyVisits = 0;
        if (monthDifference > 0) count.monthlyVisits = 0;
        if (yearDifference > 0) count.yearlyVisits = 0;

        // Increment the counts
        count.dailyVisits += 1;
        count.weeklyVisits += 1;
        count.monthlyVisits += 1;
        count.yearlyVisits += 1;

        // Update last visit date
        count.lastVisit = currentDate;

        // Save updated count
        await count.save();
    } catch (error) {
        console.error("Error updating visit count:", error);
        throw new Error("Visit count update failed");
    }
}
