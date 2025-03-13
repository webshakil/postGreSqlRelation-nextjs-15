// import pool from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const userId = await params.id;

//   try {
//     // Validate user ID
//     if (!userId) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 });
//     }

//     const { rows } = await pool.query("SELECT * FROM blogs WHERE user_id = $1", [userId]);

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "No blogs found for this user" }, { status: 404 });
//     }

//     return NextResponse.json(rows, { status: 200 });
//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
//   }
// }

// import pool from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//   const { id } = await context.params; 

//   try {
//     // Validate user ID
//     if (!id) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 });
//     }

//     // Convert ID to a number if necessary
//     const userId = Number(id);
//     if (isNaN(userId)) {
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     // Fetch blogs related to the user
//     const { rows } = await pool.query("SELECT * FROM blogs WHERE user_id = $1", [userId]);

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "No blogs found for this user" }, { status: 404 });
//     }

//     return NextResponse.json(rows, { status: 200 });
//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
//   }
// }


// import pool from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//   const { id } = await context.params; // Get user ID from params

//   try {
//     // Validate user ID
//     const userId = Number(id);
//     if (isNaN(userId)) {
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     // Fetch blogs along with user name using a JOIN
//     const { rows } = await pool.query(
//       `SELECT blogs.*, users.name AS user_name 
//        FROM blogs 
//        JOIN users ON blogs.user_id = users.id 
//        WHERE blogs.user_id = $1`, 
//       [userId]
//     );

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "No blogs found for this user" }, { status: 404 });
//     }

//     return NextResponse.json(rows, { status: 200 });
//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
//   }
// }


import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; // Extract user ID

  try {
    const userId = Number(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Fetch blogs with user name
    const query = `
      SELECT blogs.id, blogs.user_id, blogs.title, blogs.content, users.name AS user_name
      FROM blogs
      INNER JOIN users ON blogs.user_id = users.id
      WHERE blogs.user_id = $1;
    `;
    


    const { rows } = await pool.query(query, [userId]);

    

    if (rows.length === 0) {
      return NextResponse.json({ message: "No blogs found for this user" }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
  }
}



