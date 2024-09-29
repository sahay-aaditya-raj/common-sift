import Product from "@/models/product";
import Image from "@/models/image";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import updateVisitCount from "./updateCount";

export async function GET(req) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
            }
            const images = await Image.find({productId : id}, "_id")
            updateVisitCount(id);
            return NextResponse.json({ message: "Data Provided", data: product, imagesIDs: images }, { status: 200 });
        } else {
            const products = await Product.find();
            return NextResponse.json({ message: "Data Provided", data: products }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}