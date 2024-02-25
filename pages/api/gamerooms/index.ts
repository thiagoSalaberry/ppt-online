import type { NextApiRequest, NextApiResponse } from "next";
import { createGameroom } from "@/backend/controller/gameroomController";
//POST CREAR NUEVA GAMEROOM
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, pin } = req.body;
  const gameroom = await createGameroom({ name, pin });
  return res.json({
    message: `Compartí el siguiente código con tu contrincante: ${gameroom.newGameroom?.shortRoomId}`,
  });
}
