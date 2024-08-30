import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Image from "@/models/image";
export async function GET(req) {
    try{
        await connectMongoDB();
        const url = new URL(req.url);
        const productId = url.searchParams.get("id");
        if(productId){
            const image = await Image.findOne({productId: productId})
            if (!image) {
                return NextResponse.json({ message: "Image not found" }, { status: 404 });
            }
            return new NextResponse(image.image.buffer, {
                headers: {
                    "Content-Type": image.contentType,
                    "Content-Length": image.image.buffer.length
                }
            });
        }
        return NextResponse.json({message: "No Product Id"}, {status: 400});

    } catch (e) {
        console.log(e)
        return NextResponse.json({message: "Server Error"}, {status:500})
    }
}