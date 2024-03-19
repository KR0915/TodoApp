import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma=new PrismaClient();


//todoリスト記事詳細取得api
export const GET=async(req:Request,res:NextResponse)=>{
    try{
        const id:number=parseInt(req.url.split("/todo/")[1]);//https://localhost:3000/api/blog/1の/blog/部分で切り分ける parseIntは文字列から整数を取得するために使う　urlをsplitでぶつ切りにし、そのあとの[id]を取得し、その[id]のデータを持ってくる
        await main();//ここでプリズマにつなぐ
        const post=await prisma.post.findFirst({where:{id}});//https://localhost:3000/api/blog/1<=ここの部分にブログのidがふられのでそれを取得する  findFirstはfindMannyと違い部分取得 where句はidなどをとくていする　ここでデータベースから値をとる
        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }finally{
        await prisma.$disconnect();
    }
}

//ブログ記事編集用API
export const PUT=async(req:Request,res:NextResponse)=>{
    try{
        const id:number=parseInt(req.url.split("/todo/")[1]);//parseIntで中身をnumber型にする

        const{title}=await req.json();//titleとdescriptionをjson形式に格納する

        await main();
        
        const post=await prisma.post.update({//updatateはprismaの関数でデータベースの値をアップデートできる
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
        await main();
        const post=await prisma.post.delete({where:{id}});
        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}