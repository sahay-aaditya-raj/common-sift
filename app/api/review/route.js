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

    // Check if productId is undefined or invalid
    if (!productId) {
      return NextResponse.json({ message: "Product ID is missing" }, { status: 400 });
    }

    let reviews;
    const allReviews = await Review.find({ productId }).sort({ createdAt: -1 });
    
    if (limit) {
      reviews = await Review.find({ productId }).sort({ createdAt: -1 }).limit(5);
    } else {
      reviews = allReviews;
    }

    // Calculate review average and star counts
    const totalReviews = allReviews.length;
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    reviews.forEach(review => {
      totalRating += review.rating;
      starCounts[review.rating] += 1;
    });

    const averageRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : 0;

    return NextResponse.json({
      data: reviews,
      averageRating: Number(averageRating),
      starCounts,
      totalReviews
    }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Backend Error" }, { status: 500 });
  }
}
