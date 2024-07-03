import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import util from 'util';
import db from '../../../../util/db';

const query = util.promisify(db.query).bind(db);

export async function POST(req) {
  const user = await req.json();

  try {
    // Check if username already exists
    const existingUsername = await query('SELECT * FROM users WHERE username = ?', [
      user.username,
    ]);
    if (existingUsername.length > 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Username already taken.' }),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await query('SELECT * FROM users WHERE email = ?', [
      user.email,
    ]);
    if (existingEmail.length > 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Email already registered.' }),
        { status: 400 }
      );
    }

    // Hash the password before storing in database
    const hashedPassword = await hashPassword(user.password);

    // Insert new user into the database
    const results = await query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [user.username, user.email, hashedPassword]
    );
    
    if (results) return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    console.error('Error during registration:', err);
    return new NextResponse(
      JSON.stringify({ message: 'An error occurred during registration.' }),
      { status: 500 }
    );
  }
}

//Hash Function
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}