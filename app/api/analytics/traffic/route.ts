import { NextResponse } from "next/server"

// Mock analytics data
const mockTrafficData = [
  { name: "Jan", total: 1200, visitors: 800, pageViews: 2400 },
  { name: "Feb", total: 1900, visitors: 1200, pageViews: 3800 },
  { name: "Mar", total: 2800, visitors: 1800, pageViews: 5600 },
  { name: "Apr", total: 3900, visitors: 2500, pageViews: 7800 },
  { name: "May", total: 4800, visitors: 3100, pageViews: 9600 },
  { name: "Jun", total: 3800, visitors: 2400, pageViews: 7600 },
  { name: "Jul", total: 4300, visitors: 2800, pageViews: 8600 },
  { name: "Aug", total: 5200, visitors: 3400, pageViews: 10400 },
  { name: "Sep", total: 4100, visitors: 2700, pageViews: 8200 },
  { name: "Oct", total: 4600, visitors: 3000, pageViews: 9200 },
  { name: "Nov", total: 5100, visitors: 3300, pageViews: 10200 },
  { name: "Dec", total: 5800, visitors: 3800, pageViews: 11600 },
]

const mockAnalyticsStats = {
  pageViews: {
    value: 45231,
    change: 12,
    period: "from last month",
  },
  uniqueVisitors: {
    value: 12234,
    change: 8,
    period: "from last month",
  },
  bounceRate: {
    value: 23.1,
    change: -2,
    period: "from last month",
  },
  avgSession: {
    value: "4m 32s",
    change: 15,
    period: "from last month",
  },
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    await new Promise((resolve) => setTimeout(resolve, 150))

    if (type === "stats") {
      return NextResponse.json({
        success: true,
        data: mockAnalyticsStats,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      data: mockTrafficData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
