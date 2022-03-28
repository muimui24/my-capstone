import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { now } from "next-auth/client/_utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const reqId = req.query.id;
      const { id, bookCondtion } = req.body;
      const borrow = await prisma.t_borrowingbooks.update({
        where: { id: Number(reqId) },
        data: { isReturned: true, DateReturned: new Date(), bookCondtion },
      });
      res.json(borrow);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Unable");
  }
}
