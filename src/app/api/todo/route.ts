import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma=new PrismaClient()

//todoリスト全取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
      await prisma.$connect();
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
      await prisma.$connect();
      const post = await prisma.post.create({ data: { title } });
      return NextResponse.json({message:"Success",post},{status:201});
    } catch (err) {
      return NextResponse.json({message:"Error",err},{status:500});
    } finally {
      await prisma.$disconnect();
    }
  }