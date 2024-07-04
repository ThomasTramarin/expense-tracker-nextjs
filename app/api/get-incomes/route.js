import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import util from "util";
import db from "../../../util/db";

const query = util.promisify(db.query).bind(db);

export async function GET(req) {
  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    const userId = token.id;

    try {
      // Query to get incomes grouped by data and ordered by transactionDate
      const results = await query(`
        SELECT DATE_FORMAT(transactionDate, '%d/%m/%Y') AS date, SUM(amount) AS totalIncome
        FROM transactions
        WHERE user_id = ? AND type = "income"
        GROUP BY DATE_FORMAT(transactionDate, '%d/%m/%Y')
        ORDER BY transactionDate ASC
      `, [userId]);

      const labels = results.map(row => row.date);
      const values = results.map(row => row.totalIncome);

      return NextResponse.json({ labels, values });

    } catch (error) {
      console.error("Error during recovery transactions: ", error);
      return NextResponse.json({ message: "Error during recovery transactions" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}