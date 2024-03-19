import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();


//todoリスト記事詳細取得api
export const GET=async(req:Request,res:NextResponse)=>{
    try{
        const id:number=parseInt(req.url.split("/todo/")[1]);
        await prisma.$connect();
        const post=await prisma.post.findFirst({where:{id}});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }finally{
        await prisma.$disconnect();
    }
}

//ブログ記事編集用API
export const PUT=async(req:Request,res:NextResponse)=>{
    try{
        const id:number=parseInt(req.url.split("/todo/")[1]);

        const{title}=await req.json();

        await prisma.$connect();
        
        const post=await prisma.post.update({
            data:{title},
            where:{id},
        });

        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }finally{
        await prisma.$disconnect();
    }
}

//todoリスト削除用API
export const DELETE=async(req:Request,res:NextResponse)=>{
    try{
        const id:number=parseInt(req.url.split("/todo/")[1]);
        await prisma.$connect();
        const post=await prisma.post.delete({where:{id}});
        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}