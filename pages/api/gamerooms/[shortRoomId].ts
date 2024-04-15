// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getGameroom, joinRoom } from "@/backend/controller/gameroomController";
//GET OBTENER NUEVA GAMEROOM
async function get(shortRoomId: string) {
  const gameroom = await getGameroom(shortRoomId);
  return gameroom;
}
async function patch(shortRoomId: string, playerId: string) {
  const joined = await joinRoom(shortRoomId, playerId);
  return joined;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { playerId } = req.body;
  if (req.method == "GET") {
    if (!shortRoomId)
      return res.status(400).json({ message: "Falta el ID de la sala." });
    const gameroom = await get(String(shortRoomId));
    if (gameroom.status == 0) return res.status(404).json(gameroom.response);
    if (gameroom.status == 1) return res.status(200).json(gameroom.response);
  }
  if (req.method == "PATCH") {
    if (!playerId)
      return res.status(400).json({ message: "Falta el ID del jugador" });
    const joined = await patch(String(shortRoomId), playerId);
    if (joined?.status == 0) return res.status(404).json(joined.response);
    if (joined?.status == 1) return res.status(404).json(joined.response);
    if (joined?.status == 2) return res.status(200).json(joined.response);
    if (joined?.status == 3) return res.status(200).json(joined.response);
    if (joined?.status == 4) return res.status(403).json(joined.response);
  }
}
