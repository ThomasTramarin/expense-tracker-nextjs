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
      // Query for incomes
      const incomeResults = await query(
        `
        SELECT category, SUM(amount) as total_amount
        FROM transactions
        WHERE user_id = ? AND type = "income"
        GROUP BY category
      `,
        [userId]
      );

      // Query for expenses
      const expenseResults = await query(
        `
        SELECT category, SUM(amount) as total_amount
        FROM transactions
        WHERE user_id = ? AND type = "expense"
        GROUP BY category
      `,
        [userId]
      );
      
      const incomeCategories = [
        "salary",
        "bonus",
        "bank-interests",
        "rental-income",
        "gifts-and-donations"
      ];

      const expenseCategories = [
        "housing",
        "transportation",
        "food",
        "utilities",
        "healthcare",
        "entertainment",
        "education",
        "miscellaneous"
      ];

      const incomeLabels = incomeCategories;
      const incomeValues = incomeCategories.map(category => {
        const result = incomeResults.find(row => row.category === category);
        return result ? result.total_amount : 0;
      });

      const expenseLabels = expenseCategories;
      const expenseValues = expenseCategories.map(category => {
        const result = expenseResults.find(row => row.category === category);
        return result ? result.total_amount : 0;
      });

      return NextResponse.json({
        incomes: {labels: incomeLabels, values: incomeValues},
        expenses: {labels: expenseLabels, values: expenseValues}
      });
    } catch (error) {
      console.error("Error during recovery transactions: ", error);
      return NextResponse.json(
        { message: "Error during recovery transactions" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}
