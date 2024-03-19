import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next";

const prisma=new PrismaClient()

//todoリスト全取得API
export const GET = async (_req: Request, res: NextApiResponse) => {
    try {
      await prisma.$connect();
      const posts = await prisma.post.findMany();
      res.status(200).json({ message: "Success", posts });
    } catch (err) {
      res.status(500).json({ message: "Error", err });
    } finally {
      await prisma.$disconnect();
    }
  }

//todoリスト投稿API
  export const POST = async (req: Request, res: NextApiResponse) => {
    try {
      const { title } = await req.json();
      await prisma.$connect();
      const post = await prisma.post.create({ data: { title } });
      res.status(201).json({ message: "Success", post });
    } catch (err) {
      res.status(500).json({ message: "Error", err });
    } finally {
      await prisma.$disconnect();
    }
  }