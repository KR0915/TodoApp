import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma=new PrismaClient()

export async function main(){
    try{
        await prisma.$connect();
    }catch(err){
        return Error("DB接続に失敗しました")
    }
}


//todoリスト全取得API
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await main();
      const posts = await prisma.post.findMany();
      res.status(200).json({ message: "Success", posts });
    } catch (err) {
      res.status(500).json({ message: "Error", err });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { title } = req.body;
      await main();
      const post = await prisma.post.create({ data: { title } });
      res.status(201).json({ message: "Success", post });
    } catch (err) {
      res.status(500).json({ message: "Error", err });
    } finally {
      await prisma.$disconnect();
    }
  }