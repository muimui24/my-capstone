import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = req.query.id;

  if (req.method === 'PUT') {
    try {
      const reqId = req.query.id;
      const borrow = await prisma.t_borrowingbooks.update({
        where: { id: Number(reqId) },
        data: {
          isApproved: true,
          approvalDate: new Date(),
        },
      });
      res.json(borrow);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Unable');
  }
}
