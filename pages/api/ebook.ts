import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        title,
        author,
        category,
        description,
        downloadLink,
        image,
        publisher,
      } = req.body;
      await prisma.m_ebooks.create({
        data: {
          title,
          author,
          category,
          description,
          downloadLink,
          image,
          publisher,
        },
      });
      res.status(200).json({ message: "Book Added" });
    } else if (req.method === "GET") {
      const ebooks = await prisma.m_ebooks.findMany({
        select: {
          id: true,
          title: true,
          author: true,
          category: true,
          description: true,
          downloadLink: true,
          image: true,
          publisher: true,
        },
      });
      res.status(200).json(ebooks);
    }
  } catch (error) {
    console.log("Failure");
  }
}
