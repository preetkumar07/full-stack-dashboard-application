import { NextResponse } from "next/server"

// Mock user credentials (in production, this would be hashed and stored securely)
const mockCredentials = {
  "admin@example.com": {
    password: "admin123",
    user: {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
    },
  },
  "user@example.com": {
    password: "user123",
    user: {
      id: 2,
      name: "Regular User",
      email: "user@example.com",
      role: "User",
    },
  },
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const credentials = mockCredentials[email as keyof typeof mockCredentials]

    if (!credentials || credentials.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    // Generate mock JWT token (in production, use proper JWT library)
    const token = `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json({
      success: true,
      data: {
        user: credentials.user,
        token,
        expiresIn: "24h",
      },
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}
