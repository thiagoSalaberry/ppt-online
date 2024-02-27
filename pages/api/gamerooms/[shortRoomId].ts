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
    if (gameroom.status == 0) return res.status(404).json(gameroom.response);
    if (gameroom.status == 1) return res.status(200).json(gameroom.response);
  }
  if (req.method == "POST") {
    const joined = await post(String(shortRoomId), name, pin);
    if (joined?.status == 0) return res.status(404).json(joined.response);
    if (joined?.status == 1) return res.status(403).json(joined.response);
    if (joined?.status == 2 || joined?.status == 3)
      return res.status(200).json(joined.response);
  }
}
