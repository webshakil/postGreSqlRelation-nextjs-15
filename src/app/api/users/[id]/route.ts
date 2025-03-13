import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  
  const result = await pool.query(
    "SELECT * FROM blogs WHERE user_id = $1",
    [params.id]
  );
  return NextResponse.json(result.rows);
}


import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { rows } = await pool.query("SELECT * FROM blogs WHERE user_id = $1", [id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching blogs for the user" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

