"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiClient } from "@/lib/api"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react"

interface DashboardStats {
  totalRevenue: {
    value: number
    change: number
    period: string
  }
  subscriptions: {
    value: number
    change: number
    period: string
  }
  sales: {
    value: number
    change: number
    period: string
  }
  activeNow: {
    value: number
    change: number
    period: string
  }
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.getDashboardStats()
        if (response.success && response.data) {
          setStats(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.value.toLocaleString()}`,
      change: stats.totalRevenue.change,
      period: stats.totalRevenue.period,
      icon: DollarSign,
    },
    {
      title: "Subscriptions",
      value: `+${stats.subscriptions.value.toLocaleString()}`,
      change: stats.subscriptions.change,
      period: stats.subscriptions.period,
      icon: Users,
    },
    {
      title: "Sales",
      value: `+${stats.sales.value.toLocaleString()}`,
      change: stats.sales.change,
      period: stats.sales.period,
      icon: ShoppingCart,
    },
    {
      title: "Active Now",
      value: `+${stats.activeNow.value}`,
      change: stats.activeNow.change,
      period: stats.activeNow.period,
      icon: Activity,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stat.change > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stat.change > 0 ? "text-green-500" : "text-red-500"}>
                {stat.change > 0 ? "+" : ""}
                {stat.change}%
              </span>
              <span className="ml-1">{stat.period}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
