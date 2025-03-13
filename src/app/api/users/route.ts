import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query("SELECT * FROM users");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const result = await pool.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
  return NextResponse.json(result.rows[0]);
}

