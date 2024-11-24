import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Ensure the database is connected
    await connect();

    // Parse the request body
    const reqBody = await request.json();
    const { email, password, username } = reqBody;

    console.log("Login request body:", reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare the password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, username: username },
      process.env.TOKEN_SECRET, // Ensure this is defined in your environment variables
      { expiresIn: "1d" }
    );

    console.log("User logged in successfully:", user);

    // Create a response and set the token as a cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      },
      { status: 200 }
    );

    // Set the token in an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true, // Cookie is only accessible by the server
    //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    //   sameSite: "strict", // Prevent CSRF
    //   maxAge: 60 * 60, // 1 hour
    //   path: "/", // Cookie is accessible throughout the app
    });

    return response;
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
