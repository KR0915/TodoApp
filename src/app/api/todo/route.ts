import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma=new PrismaClient()

export async function main(){//ここのコードは非同期通信でprismaにつなる　エラーが起こったときにDB接続に失敗しましたと返す。
  try{
      await prisma.$connect();
  }catch(err){
      return Error("DB接続に失敗しました")
  }
}

//todoリスト全取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
      await main();
      const posts = await prisma.post.findMany();
      return NextResponse.json({message:"Success",posts},{status:200});
    } catch (err) {
      return NextResponse.json({message:"Error",err},{status:500});
    } finally {
      await prisma.$disconnect();
    }
  }

//todoリスト投稿API
  export const POST = async (req: Request, res: NextResponse) => {
    try {
      const { title } = await req.json();
      await main();
      const post = await prisma.post.create({ data: { title } });
      return NextResponse.json({message:"Success",post},{status:201});
    } catch (err) {
      return NextResponse.json({message:"Error",err},{status:500});
    } finally {
      await prisma.$disconnect();
    }
  }