// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { listenRTDB } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameroomId } = req.query;
  const rtdbData = await listenRTDB(String(gameroomId));
  res.status(200).json({rtdbData});
}
