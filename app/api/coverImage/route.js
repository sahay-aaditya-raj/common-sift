import { connectMongoDB } from "@/lib/mongodb";
import Cover from "@/models/cover";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        await connectMongoDB()
        const url = new URL(req.url);
        const imageId = url.searchParams.get("id");
        const cover = await Cover.findById(imageId)
        if(!cover){
            return NextResponse.json({message: "No cover found"},{status: 404})
        }
        return new NextResponse(cover.image.buffer,{
            headers:{
                'Content-Type': cover.contentType,
                "Content-Length": cover.image.buffer.length
            }
        })
    } catch(e){
        return NextResponse.json({message: e},{status: 500})
    }
}