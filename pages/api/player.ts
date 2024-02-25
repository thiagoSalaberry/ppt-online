// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlayer } from "@/backend/controller/playerController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, pin } = req.body;
  const player = await getPlayer(name, pin);
  res.json({ player });
}
