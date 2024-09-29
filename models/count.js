import mongoose, { Schema, models } from "mongoose";

const countSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        dailyVisits: { type: Number, default: 0 },
        weeklyVisits: { type: Number, default: 0 },
        monthlyVisits: { type: Number, default: 0 },
        yearlyVisits: { type: Number, default: 0 },
        lastVisit: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Count = models.Count || mongoose.model("Count", countSchema);
export default Count;
