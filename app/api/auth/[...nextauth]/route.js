import { NextResponse } from "next/server";
import util from "util";
import bcrypt from "bcrypt";
import db from "../../../../util/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const query = util.promisify(db.query).bind(db);

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Incomplete credentials
        }

        try {
          const users = await query("SELECT * FROM users WHERE email = ?", [
            credentials.email,
          ]);

          if (!users || users.length === 0) {
            return null; // User not found
          }

          const user = users[0];

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            return null; // Passwords do not match
          }

          //Successful authentication
          return user;

        } catch (err) {
          console.log("Error during authentication: " + err);
          return null; // Error
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };