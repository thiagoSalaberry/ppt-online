// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pushToHistory } from "@/backend/controller/gameroomController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortRoomId } = req.query;
  const { result } = req.body;
  if (!shortRoomId || !result) {
    return res.status(400).send({ message: "Faltan datos" });
  }
  const historyUpdate = await pushToHistory(String(shortRoomId), result);
  if (!historyUpdate) return res.status(400).json("Algo salió mal");
  if (historyUpdate) return res.status(200).json(historyUpdate);
}
