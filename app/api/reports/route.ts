import { NextResponse } from "next/server"

// Mock reports data
const mockReports = [
  {
    id: 1,
    title: "Monthly Revenue Report",
    description: "Comprehensive revenue analysis for the current month",
    date: "2024-12-15",
    status: "Ready",
    type: "revenue",
    fileSize: "2.4 MB",
    downloadUrl: "/api/reports/1/download",
  },
  {
    id: 2,
    title: "User Activity Report",
    description: "Detailed user engagement and activity metrics",
    date: "2024-12-14",
    status: "Ready",
    type: "activity",
    fileSize: "1.8 MB",
    downloadUrl: "/api/reports/2/download",
  },
  {
    id: 3,
    title: "Performance Analytics",
    description: "System performance and optimization insights",
    date: "2024-12-13",
    status: "Ready",
    type: "performance",
    fileSize: "3.1 MB",
    downloadUrl: "/api/reports/3/download",
  },
  {
    id: 4,
    title: "Security Audit Report",
    description: "Comprehensive security analysis and recommendations",
    date: "2024-12-12",
    status: "Processing",
    type: "security",
    fileSize: null,
    downloadUrl: null,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    let filteredReports = mockReports

    if (type) {
      filteredReports = filteredReports.filter((report) => report.type === type)
    }

    if (status) {
      filteredReports = filteredReports.filter((report) => report.status === status)
    }

    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: filteredReports,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reports" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, type } = body

    if (!title || !description || !type) {
      return NextResponse.json({ success: false, error: "Title, description, and type are required" }, { status: 400 })
    }

    const newReport = {
      id: Math.max(...mockReports.map((r) => r.id)) + 1,
      title,
      description,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      type,
      fileSize: null,
      downloadUrl: null,
    }

    // Simulate report generation delay
    setTimeout(() => {
      newReport.status = "Ready"
      newReport.fileSize = `${(Math.random() * 3 + 1).toFixed(1)} MB`
      newReport.downloadUrl = `/api/reports/${newReport.id}/download`
    }, 5000)

    await new Promise((resolve) => setTimeout(resolve, 200))

    return NextResponse.json(
      {
        success: true,
        data: newReport,
        message: "Report generation started",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate report" }, { status: 500 })
  }
}
