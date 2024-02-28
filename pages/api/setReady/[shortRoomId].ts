// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setReady } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { playerId } = req.body;
  const ready = await setReady(String(shortRoomId), playerId);
  if (!ready) return res.status(400).json("Algo salió mal");
  if (ready) return res.status(200).json(ready);
}
