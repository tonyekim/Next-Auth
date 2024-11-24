import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Ensure database is connected
    await connect();

    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log("Request body:", reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10); // Corrected method name
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("Saved user:", savedUser);

    // Exclude sensitive information from response
    const { password: _, ...userDetails } = savedUser._doc;

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: userDetails,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
