import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

import { signIn, signOut, useSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { quantity, bookId, bookCode, email } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      await prisma.t_borrowingbooks.create({
        data: {
          quantity: quantity,
          isIssued: false,
          bookId: bookId,
          userId: user?.id,
          bookCode: bookCode,
        },
      });
      res.status(200).json({ message: 'Book Added' });
    } else if (req.method === 'GET') {
      const books = await prisma.t_borrowingbooks.findMany({
        select: {
          quantity: true,
          isIssued: true,
          bookId: true,
          issuedDate: true,
          borrowingDate: true,
          userId: true,
          DateReturned: true,
          targetreturnDate: true,
          creationDate: true,
          isApproved: true,
          isCancelled: true,
          isReturned: true,
          id: true,
        },
      });
      res.status(200).json(books);
    }
  } catch (error) {
    console.log(error);
  }
}
