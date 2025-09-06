import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // In a real application, you would invalidate the token here
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 })
  }
}
