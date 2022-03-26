import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ebookId = req.query.id;

  if (req.method === "DELETE") {
    const ebooks = await prisma.m_ebooks.delete({
      where: { id: Number(ebookId) },
    });
    res.json(ebooks);
  } else if (req.method === "PUT") {
    try {
      const ebookId = req.query.id;
      const {
        title,
        author,
        category,
        description,
        downloadLink,
        image,
        publisher,
      } = req.body;
      const ebooks = await prisma.m_ebooks.update({
        where: { id: Number(ebookId) },
        data: {
          title,
          author,
          category,
          description,
          downloadLink,
          image,
          publisher,
        },
      });
      res.json(ebooks);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Unable");
  }
}
