import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import util from "util";
import db from "../../../util/db";

const query = util.promisify(db.query).bind(db);

//Add new transactions
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

//Get all transactions for a specific user
export async function GET(req) {
  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    const userId = token.id;

    try {
      const results = await query(
        "SELECT * FROM transactions WHERE user_id = ?",
        [userId]
      );

      return NextResponse.json(results);
    } catch (err) {
      return NextResponse.json(err);
    }
  } else {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
}

//Delete specific transaction
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const transactionID = searchParams.get("transactionID");

  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    const userId = token.id;
    try {
      const transaction = await query(
        "SELECT * FROM transactions WHERE user_id = ? AND transactionID = ?",
        [userId, transactionID]
      );

      if (transaction.lenght === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Transaction not found or user unauthorized",
          },
          { status: 404 }
        );
      }

      await query(
        "DELETE FROM transactions WHERE transactionID = ? AND user_id = ?",
        [transactionID, userId]
      );

      return NextResponse.json({
        success: true,
        message: "Transaction deleted successfully",
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Error deleting transaction" },
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

export async function PUT(req) {
  const body = await req.json();

  const { searchParams } = new URL(req.url);
  const transactionID = searchParams.get("transactionID");

  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    const userId = token.id;

    try {
      const transaction = await query(
        "SELECT * FROM transactions WHERE user_id = ? AND transactionID = ?",
        [userId, transactionID]
      );

      if (transaction.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Transaction not found or user unauthorized",
          },
          { status: 404 }
        );
      }

      await query(
        "UPDATE transactions SET title = ?, type = ?, amount = ?, category = ?, transactionDate = ? WHERE transactionID = ? AND user_id = ?",
        [
          body.title,
          body.type,
          body.amount,
          body.category,
          body.transactionDate,
          transactionID,
          userId,
        ]
      );

      return NextResponse.json({
        success: true,
        message: "Transaction updated successfully",
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Error editing transaction" },
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