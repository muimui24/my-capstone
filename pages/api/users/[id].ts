import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id;

  if (req.method === "DELETE") {
    const users = await prisma.a_user.delete({
      where: { id: Number(userId) },
    });
    res.json(users);
  } else if (req.method === "PUT") {
    try {
      const userId = req.query.id;
      const {
        firstName,
        lastName,
        middleName,
        contactNumber,
        role,
        userName,
        password,
      } = req.body;
      const users = await prisma.a_user.update({
        where: { id: Number(userId) },
        data: {
          firstName,
          lastName,
          middleName,
          contactNumber,
          role,
          userName,
          password,
        },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Unable");
  }
}
