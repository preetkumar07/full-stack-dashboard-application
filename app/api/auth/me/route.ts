import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "No valid token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Mock token validation (in production, verify JWT properly)
    if (!token.startsWith("mock-jwt-token-")) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    // Mock user data (in production, decode from JWT or fetch from database)
    const mockUser = {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
    }

    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: mockUser,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch user data" }, { status: 500 })
  }
}
