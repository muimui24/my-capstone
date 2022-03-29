import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const reqId = req.query.id;
      const { id } = req.body;
      const borrow = await prisma.t_borrowingbooks.update({
        where: { id: Number(reqId) },
        data: { isReject: true },
      });
      res.json(borrow);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Unable");
  }
}
