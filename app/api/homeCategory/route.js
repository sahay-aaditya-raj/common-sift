import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import Product from "@/models/product";

export async function GET(req){
    try{
        await connectMongoDB()
        const categories = await Category.find({ name: { $ne: 'None' } });

        let productObject = {};

        for (const category of categories) {
            const products = await Product.find({ category: category.name });
            productObject[category.name] = products;
            }
        // (productObject);
        return NextResponse.json({message:"Success", data:productObject},{status: 200})
    } catch(e) {
        console.log(e)
        return NextResponse.json({message:"internal Server Error"}, {status:500})
    }
}