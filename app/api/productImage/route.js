import { connectMongoDB } from "@/lib/mongodb";
import Image from "@/models/image";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const imageId = url.searchParams.get("id");
        
        if (!imageId) {
            return NextResponse.json({ message: "Image ID is required" }, { status: 400 });
        }

        const image = await Image.findById(imageId);
        if (!image) {
            return NextResponse.json({ message: "Image not found" }, { status: 404 });
        }

        // Convert the buffer to a Blob for better compatibility
        const imageBuffer = Buffer.from(image.image.buffer);
        return new NextResponse(imageBuffer, {
            headers: {
                "Content-Type": image.contentType,
                "Content-Length": imageBuffer.length
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
