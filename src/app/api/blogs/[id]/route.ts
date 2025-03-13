import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return NextResponse.json(result.rows[0]);
}


export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || req.url.split("/").pop(); // Get ID from URL
  if (!id) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  try {
    const result = await pool.query("DELETE FROM blogs WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
