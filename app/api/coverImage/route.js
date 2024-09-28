import { connectMongoDB } from "@/lib/mongodb";
import Cover from "@/models/cover";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const imageId = url.searchParams.get("id");

        if (!imageId) {
            return NextResponse.json({ message: "Image ID is required" }, { status: 400 });
        }

        const cover = await Cover.findById(imageId);
        if (!cover) {
            return NextResponse.json({ message: "No cover found" }, { status: 404 });
        }

        // Convert the image buffer to a Buffer object
        const imageBuffer = Buffer.from(cover.image.buffer);

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': cover.contentType,
                "Content-Length": imageBuffer.length.toString(), // Ensure it's a string
            },
        });
    } catch (e) {
        console.error(e); // Log the error for debugging
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
