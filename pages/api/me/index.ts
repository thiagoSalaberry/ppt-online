// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlayerById } from "@/backend/controller/playerController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(400).json({ message: "Falta el token de acceso." });
  try {
    const player = await getPlayerById(accessToken);
    if (!player)
      return res.status(404).json({ message: "El usuario no existe" });
    return res.status(200).json(player);
  } catch (error) {
    console.log("Error en el servidor", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
