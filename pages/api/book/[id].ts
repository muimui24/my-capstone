import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = req.query.id;

  if (req.method === 'DELETE') {
    const books = await prisma.m_books.delete({
      where: { id: Number(bookId) },
    });
    res.json(books);
  } else if (req.method === 'PUT') {
    try {
      const bookId = req.query.id;
      const { title, author, category, code } = req.body;
      const books = await prisma.m_books.update({
        where: { id: Number(bookId) },
        data: { title, author, category, code },
      });
      res.json(books);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Unable');
  }
}
