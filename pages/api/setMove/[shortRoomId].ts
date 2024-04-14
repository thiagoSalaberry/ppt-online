// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setMove } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { move } = req.body;
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!shortRoomId || !accessToken || !move) {
    return res.status(400).send({ message: "Faltan datos" });
  }
  if (
    move.toLowerCase() !== "piedra" &&
    move.toLowerCase() !== "papel" &&
    move.toLowerCase() != "tijera"
  )
    return res
      .status(400)
      .json({ error: "Debes elegir entre piedra papel o tijera" });
  const setted = await setMove(String(shortRoomId), accessToken, move);
  if (!setted) return res.status(400).json("Algo salió mal");
  if (setted) return res.status(200).json(setted);
}
