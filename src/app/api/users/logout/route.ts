import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });

    response.headers.set(
      "Set-Cookie",
      `token=; HttpOnly; Path=/; Expires=${new Date(0).toUTCString()}`
    );

    return response;
  } catch (error: any) {
    console.error("Error during signout:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

