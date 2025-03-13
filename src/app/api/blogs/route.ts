import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query(`
    SELECT blogs.*, users.name as author 
    FROM blogs 
    JOIN users ON blogs.user_id = users.id
  `);
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const { user_id, title, content } = await req.json();
  const result = await pool.query(
    "INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
    
    [user_id, title, content]
  );
  return NextResponse.json(result.rows[0]);
}



