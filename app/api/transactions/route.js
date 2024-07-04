import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import util from "util";
import db from "../../../util/db";

const query = util.promisify(db.query).bind(db);

export async function POST(req) {
  const body = await req.json();

  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    const userId = token.id;

    try {
      const results = await query(
        `
            INSERT INTO transactions (user_id, title, type, amount, category, transactionDate)
            VALUES (?,?,?,?,?,?)
          `,
        [userId, body.title, body.type, body.amount, body.category, body.date]
      );

      return NextResponse.json({
        success: true,
        message: "Transaction added successfully",
      });
      
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Error adding transaction" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
}
