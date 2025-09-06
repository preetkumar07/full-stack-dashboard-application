import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { RevenueChart, UserGrowthChart } from "@/components/analytics-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, Database, Users, Clock, Zap } from "lucide-react"

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <div className="flex-1 space-y-6 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-1">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Dashboard
              </h2>
              <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening today.</p>
            </div>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 hover:scale-105 transition-transform duration-200"
            >
              <Activity className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>

          <DashboardStats />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 card-hover border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Revenue Overview
                    </CardTitle>
                    <CardDescription className="text-base">Monthly revenue vs expenses comparison</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    +12.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <RevenueChart />
              </CardContent>
            </Card>

            <Card className="col-span-3 card-hover border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full -translate-y-12 -translate-x-12" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <Users className="w-5 h-5 mr-2 text-accent" />
                      User Growth
                    </CardTitle>
                    <CardDescription className="text-base">User acquisition over time</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                    +8.2%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/50 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-accent/5 rounded-full translate-y-10 translate-x-10" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-base">Latest user actions and system events</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {[
                    { user: "John Doe", action: "Created new report", time: "2 minutes ago", color: "bg-green-500" },
                    { user: "Jane Smith", action: "Updated user profile", time: "5 minutes ago", color: "bg-blue-500" },
                    {
                      user: "Bob Johnson",
                      action: "Downloaded analytics data",
                      time: "10 minutes ago",
                      color: "bg-purple-500",
                    },
                    {
                      user: "Alice Brown",
                      action: "Generated monthly report",
                      time: "15 minutes ago",
                      color: "bg-orange-500",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 ${activity.color} rounded-full animate-pulse`} />
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                            {activity.user}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full -translate-y-8 -translate-x-8" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Database className="w-5 h-5 mr-2 text-accent" />
                  System Status
                </CardTitle>
                <CardDescription className="text-base">Current system health and performance</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group">
                    <span className="text-sm font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      API Response Time
                    </span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        120ms
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group">
                    <span className="text-sm font-medium flex items-center">
                      <Database className="w-4 h-4 mr-2 text-primary" />
                      Database Status
                    </span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Healthy
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group">
                    <span className="text-sm font-medium flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-primary" />
                      Server Uptime
                    </span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        99.9%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group">
                    <span className="text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-2 text-accent" />
                      Active Users
                    </span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        1,234
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
