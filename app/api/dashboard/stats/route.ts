import { NextResponse } from "next/server"

// Mock data for dashboard statistics
const mockStats = {
  totalRevenue: {
    value: 45231.89,
    change: 20.1,
    period: "from last month",
  },
  subscriptions: {
    value: 2350,
    change: 180.1,
    period: "from last month",
  },
  sales: {
    value: 12234,
    change: 19,
    period: "from last month",
  },
  activeNow: {
    value: 573,
    change: 201,
    period: "since last hour",
  },
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: mockStats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
