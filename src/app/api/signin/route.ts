import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL!);

// POST - Sign In
export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  try {
    // Find user by email
    const user = await sql`SELECT * FROM useraccount WHERE email = ${email}`;
    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { message: "Error signing in", error: error.message },
      { status: 500 }
    );
  }
};
