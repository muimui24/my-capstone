import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = String(req.query.id);

  if (req.method === "DELETE") {
    const users = await prisma.user.delete({
      where: { id: userId },
    });
    res.json(users);
  } else if (req.method === "PUT") {
    try {
      const {
        firstName,
        lastName,
        middleName,
        contactNumber,
        role,
        userName,
        password,
      } = req.body;
      const users = await prisma.user.update({
        where: { id: userId },
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
