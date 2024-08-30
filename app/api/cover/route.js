import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Cover from '@/models/cover';

export async function GET(){
    try{
        await connectMongoDB()
        const covers = await Cover.find({},'_id title description link')
        if(!covers){
            return NextResponse.json({message: 'not found'},{status: 404});
        }
        return NextResponse.json({data: covers},{status: 200});
    }catch(e){
        return NextResponse.json({message: e}, {status: 500});
    }
}
