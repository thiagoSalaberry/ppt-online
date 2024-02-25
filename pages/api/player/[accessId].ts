// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlayerById } from "@/backend/controller/playerController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessId } = req.query;
  const player = await getPlayerById(String(accessId));
  res.json(player);
}
