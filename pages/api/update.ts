import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = req.query.id;

  const { title, author, category, code } = req.body;
  console.log(req.method);
  const books = await prisma.m_books.update({
    where: { id: Number(bookId) },
    data: { title, author, category, code },
  });
  res.json(books);
}
