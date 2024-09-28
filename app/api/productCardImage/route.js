import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Image from "@/models/image";

export async function GET(req) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const productId = url.searchParams.get("id");
        
        if (productId) {
            const image = await Image.findOne({ productId: productId });
            if (!image) {
                return NextResponse.json({ message: "Image not found" }, { status: 404 });
            }

            // Convert the image buffer to a Buffer object
            const imageBuffer = Buffer.from(image.image.buffer);

            return new NextResponse(imageBuffer, {
                headers: {
                    "Content-Type": image.contentType,
                    "Content-Length": imageBuffer.length.toString(), // Ensure it's a string
                },
            });
        }

        return NextResponse.json({ message: "No Product Id" }, { status: 400 });

    } catch (e) {
        console.error(e); // Log the error for debugging
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
