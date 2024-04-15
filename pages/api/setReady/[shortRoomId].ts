// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setReady } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!shortRoomId || !accessToken) {
    return res.status(400).send({ message: "Faltan datos" });
  }
  const ready = await setReady(String(shortRoomId), accessToken);
  if (!ready) return res.status(400).json("Algo salió mal");
  if (ready) return res.status(200).json(ready);
}