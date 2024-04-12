import type { NextApiRequest, NextApiResponse } from "next";
import { getPlayerById } from "@/backend/controller/playerController";
import { createGameroom } from "@/backend/controller/gameroomController";
//POST CREAR NUEVA GAMEROOM
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playerId } = req.body;
  if (!playerId)
    return res.status(400).json({ message: "Falta el ID del jugador." });
  try {
    const player = await getPlayerById(playerId);
    if (!player)
      return res.status(400).json({ message: "El jugador no existe" });
    const gameroom = await createGameroom(player);
    return res
      .status(201)
      .json({ shortRoomId: gameroom.newGameroom.shortRoomId });
  } catch (error) {
    console.log("Error en el servidor", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
