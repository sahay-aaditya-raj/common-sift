import { connectMongoDB } from "@/lib/mongodb";
import Review from "@/models/review";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get headers
    const limit = req.headers.get('Limit');
    const productId = req.headers.get('Product-Id');
    let reviews;

    if (limit) {
      reviews = await Review.find({ productId:productId }).sort({ createdAt: -1 }).limit(5);
    } else {
      reviews = await Review.find({ productId:productId }).sort({ createdAt: -1 });
    }
    console.log(reviews);
    return NextResponse.json({data: reviews}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Backend Error" }, { status: 500 });
  }
}
