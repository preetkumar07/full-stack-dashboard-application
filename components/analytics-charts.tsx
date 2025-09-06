"use client"

import { useEffect, useState } from "react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { apiClient } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface TrafficData {
  name: string
  total: number
  visitors: number
  pageViews: number
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function AnalyticsCharts() {
  const [data, setData] = useState<TrafficData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getAnalyticsData()
        if (response.success && response.data) {
          setData(response.data)
        } else {
          setError(response.error || "Failed to fetch analytics data")
        }
      } catch (err) {
        setError("Network error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[350px] text-muted-foreground">
        <p>Error loading chart data: {error}</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--card-foreground))",
          }}
          labelStyle={{ color: "hsl(var(--card-foreground))" }}
        />
        <Line
          type="monotone"
          dataKey="total"
          strokeWidth={3}
          stroke="hsl(var(--primary))"
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="visitors"
          strokeWidth={2}
          stroke="hsl(var(--chart-2))"
          dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function RevenueChart() {
  const [data, setData] = useState([
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 3000, expenses: 1398 },
    { name: "Mar", revenue: 2000, expenses: 9800 },
    { name: "Apr", revenue: 2780, expenses: 3908 },
    { name: "May", revenue: 1890, expenses: 4800 },
    { name: "Jun", revenue: 2390, expenses: 3800 },
    { name: "Jul", revenue: 3490, expenses: 4300 },
  ])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--card-foreground))",
          }}
          formatter={(value) => [`$${value}`, ""]}
        />
        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function UserGrowthChart() {
  const [data, setData] = useState([
    { name: "Jan", users: 400 },
    { name: "Feb", users: 600 },
    { name: "Mar", users: 800 },
    { name: "Apr", users: 1200 },
    { name: "May", users: 1600 },
    { name: "Jun", users: 2000 },
    { name: "Jul", users: 2400 },
  ])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--card-foreground))",
          }}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function DeviceUsageChart() {
  const data = [
    { name: "Desktop", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Mobile", value: 35, color: "hsl(var(--chart-2))" },
    { name: "Tablet", value: 20, color: "hsl(var(--chart-3))" },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--card-foreground))",
          }}
          formatter={(value) => [`${value}%`, ""]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
