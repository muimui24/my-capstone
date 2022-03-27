import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const {
        firstName,
        lastName,
        middleName,
        contactNumber,
        role,
        userName,
        password,
      } = req.body;
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          middleName,
          contactNumber,
          role,
          userName,
          password,
          email: `${userName}@gmail.com`,
        },
      });
      res.status(200).json({ message: 'User Added' });
    } else if (req.method === 'GET') {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          middleName: true,
          contactNumber: true,
          role: true,
          userName: true,
          password: true,
        },
      });
      res.status(200).json(users);
    }
  } catch (error) {
    console.log('Failure');
  }
}
