import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recId = req.query.id;

  if (req.method === 'PUT') {
    try {
      const reqId = req.query.id;
      let newDate = new Date();
      const borrow = await prisma.t_borrowingbooks.update({
        where: { id: Number(reqId) },
        data: {
          isCancelled: false,
          cancelledDate: new Date(),
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
