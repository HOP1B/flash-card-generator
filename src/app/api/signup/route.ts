import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL!);

// GET all users (for testing purposes)
export const GET = async () => {
  try {
    const result = await sql`SELECT * FROM useraccount`;
    return NextResponse.json(result);
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
};

// POST - Sign Up
export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  try {
    // Check if user already exists
    const userExists =
      await sql`SELECT * FROM useraccount WHERE email = ${email}`;
    if (userExists.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Insert new user into the database
    const newUser = await sql`
      INSERT INTO useraccount (id, email, password)
      VALUES (${nanoid()}, ${email}, ${hashedPassword})
      RETURNING *
    `;

    // Generate JWT token
    const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    return NextResponse.json({ token }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
};
