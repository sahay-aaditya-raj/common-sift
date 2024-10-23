import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";

export async function GET(req) {
    try {
        await connectMongoDB();
        const categories = await Category.find({}, 'name').sort({ updatedAt: -1 });
        return NextResponse.json({ message: "Data Provided", data: categories }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}
