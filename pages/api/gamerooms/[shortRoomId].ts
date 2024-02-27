// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getGameroom, joinRoom } from "@/backend/controller/gameroomController";
//GET OBTENER NUEVA GAMEROOM
async function get(shortRoomId: string) {
  const gameroom = await getGameroom(shortRoomId);
  return gameroom;
}
async function post(
  shortRoomId: string,
  playerName: string,
  playerPin: number
) {
  const joined = await joinRoom(shortRoomId, playerName, playerPin);
  return joined;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { name, pin } = req.body;
  if (req.method == "GET") {
    const gameroom = await get(String(shortRoomId));
    if (gameroom.error) return res.status(404).send(false);
    return res.json(gameroom.gameroom);
  }
  if (req.method == "POST") {
    const joined = await post(String(shortRoomId), name, pin);
    if (!joined) {
      return res.status(403).json({ message: "La sala está llena" });
    } else {
      return res.status(200).json(joined);
    }
  }
}
