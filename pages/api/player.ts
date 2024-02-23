// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createPlayer, getPlayer } from "@/backend/controller/playerController";

const get = async (name: string, pin: number) => {
  const player = await getPlayer(name, pin);
  return player;
};

const post = async (name: string, pin: number) => {
  const player = await createPlayer(name, pin);
  return player;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, pin } = req.body;
  if (req.method == "GET") {
    const existingPlayer = await get(name, pin);
    res.json({ existingPlayer });
  }
  if (req.method == "POST") {
    const player = await post(name, pin);
    res.json({ player });
  }
}
