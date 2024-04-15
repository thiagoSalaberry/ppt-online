// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  // getPlayer,
  findOrCreatePlayer,
} from "@/backend/controller/playerController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, pin } = req.body;
  if (!name || !pin) return res.status(400).json({ message: "Faltan datos" });
  try {
    const { status, message, player } = await findOrCreatePlayer(name, pin);
    if (status == 0)
      return res.status(201).json({ message: message, playerData: player });
    if (status == 1)
      return res.status(200).json({ message: message, playerData: player });
    if (status == 2) return res.status(403).json({ message: message });
  } catch (error) {
    console.log("Error en el servidor", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
