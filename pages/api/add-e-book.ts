import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, author, category } = req.body;

  try {
    await prisma.m_ebooks.create({
      data: {
        title,
        author,
        category,
      },
    });
    res.status(200).json({ message: "Book Added" });
  } catch (error) {
    console.log("Failure");
  }
}
