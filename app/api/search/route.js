import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/product'; // Import your Product model

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q'); // Get the query parameter 'q'

    if (!query) {
        return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    try {
        await connectMongoDB(); // Ensure the database connection is established

        // Search in name, category, and desc fields
        const searchResults = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search in name
                { category: { $regex: query, $options: 'i' } }, // Case-insensitive search in category
                { desc: { $regex: query, $options: 'i' } }, // Case-insensitive search in desc
            ]
        });

        return NextResponse.json(searchResults); // Return the search results as JSON
    } catch (error) {
        console.error("Error fetching search results:", error);
        return NextResponse.json({ error: "Error fetching search results" }, { status: 500 });
    }
}
