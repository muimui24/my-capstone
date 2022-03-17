import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = req.query.id;

  if (req.method === "DELETE") {
    const books = await prisma.m_books.delete({
      where: { id: Number(bookId) },
    });
    res.json(books);
  } else {
    console.log("Unable");
  }
}
