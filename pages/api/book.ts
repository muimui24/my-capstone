import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { title, author, category, code } = req.body;
      await prisma.m_books.create({
        data: {
          title,
          author,
          category,
          code,
        },
      });
      res.status(200).json({ message: 'Book Added' });
    } else if (req.method === 'GET') {
      const books = await prisma.m_books.findMany({
        select: {
          id: true,
          title: true,
          author: true,
          category: true,
          code: true,
        },
      });
      res.status(200).json(books);
    }
  } catch (error) {
    console.log('Failure');
  }
}
