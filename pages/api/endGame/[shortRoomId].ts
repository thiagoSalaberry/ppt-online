// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { endGame, setReady } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  if (!shortRoomId) {
    return res.status(400).send({ message: "Faltan datos" });
  }
  const ended = await endGame(String(shortRoomId));
  if (!ended) return res.status(400).json("Algo salió mal");
  if (ended) return res.status(200).json(ended);
}
