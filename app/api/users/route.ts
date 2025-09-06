import { NextResponse } from "next/server"

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-12-15",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-12-14",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2024-12-10",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Moderator",
    status: "Active",
    lastLogin: "2024-12-15",
    createdAt: "2024-04-05",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-12-13",
    createdAt: "2024-05-12",
  },
]

const mockUserStats = {
  totalUsers: {
    value: 2350,
    change: 180,
    period: "from last month",
  },
  activeUsers: {
    value: 1234,
    change: 12,
    period: "from last month",
  },
  newSignups: {
    value: 89,
    change: 23,
    period: "from last week",
  },
  churnRate: {
    value: 2.1,
    change: -0.5,
    period: "from last month",
  },
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    await new Promise((resolve) => setTimeout(resolve, 100))

    if (type === "stats") {
      return NextResponse.json({
        success: true,
        data: mockUserStats,
        timestamp: new Date().toISOString(),
      })
    }

    let filteredUsers = mockUsers

    if (search) {
      filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role } = body

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json({ success: false, error: "Name, email, and role are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = mockUsers.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User with this email already exists" }, { status: 409 })
    }

    const newUser = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      name,
      email,
      role,
      status: "Active",
      lastLogin: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
    }

    mockUsers.push(newUser)

    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}
