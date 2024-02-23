// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getGameroom } from "@/backend/controller/gameroomController";
//GET OBTENER NUEVA GAMEROOM
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { guestData } = req.body;
  const gameroom = await getGameroom(
    String(shortRoomId),
    guestData.name,
    guestData.pin
  );
  if (gameroom.error) return res.json({ message: gameroom.error });
  return res.json({ message: gameroom.message });
}
