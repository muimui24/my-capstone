import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, author, category, code } = req.body;

  try {
    await prisma.m_books.create({
      data: {
        title,
        author,
        category,
        code,
      },
    });
    res.status(200).json({ message: 'Book Added' });
  } catch (error) {
    console.log('Failure');
  }
}
