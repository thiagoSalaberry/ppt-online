// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const API_BASE_URL = process.env.API_BASE_URL;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({
    message: "Esta es la API del piedra papel o tijeras online.",
    branch: "DEV",
    APIUrl: API_BASE_URL,
  });
}
