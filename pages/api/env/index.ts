// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const env = process.env.NODE_ENV;
const API_URL =
  env == "development"
    ? "http://localhost:3000"
    : "https://ppt-online-react.vercel.app/api";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({
    env,
    API_URL,
  });
}
