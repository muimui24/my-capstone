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
          quantity: parseInt(quantity, 0),
          isIssued: false,
          bookId: parseInt(bookId ?? 0),
          userId: user?.id ?? '',
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
          creationDate: true,
          isApproved: true,
          isCancelled: true,
          cancelledDate: true,
          isReturned: true,
          bookCode: true,
          approvalDate: true,
          isReject: true,
          reasonForRejection: true,
          rejectionDate: true,
          id: true,
          book: {
            select: {
              title: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      res.status(200).json(books);
    }
  } catch (error) {
    console.log(error);
  }
}
