// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setMove } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { playerId, move } = req.body;
  if (
    move.toLowerCase() !== "piedra" &&
    move.toLowerCase() !== "papel" &&
    move.toLowerCase() != "tijera"
  )
    return res
      .status(400)
      .json({ error: "Debes elegir entre piedra papel o tijera" });
  const setted = await setMove(String(shortRoomId), playerId, move);
  if (!setted) return res.status(400).json("Algo salió mal");
  if (setted) return res.status(200).json(setted);
}
