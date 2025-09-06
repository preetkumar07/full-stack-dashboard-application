import { NextResponse } from "next/server"

// This would normally come from a database
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const user = mockUsers.find((u) => u.id === id)

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Update user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    await new Promise((resolve) => setTimeout(resolve, 150))

    return NextResponse.json({
      success: true,
      data: mockUsers[userIndex],
      message: "User updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    const deletedUser = mockUsers.splice(userIndex, 1)[0]

    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: deletedUser,
      message: "User deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}
