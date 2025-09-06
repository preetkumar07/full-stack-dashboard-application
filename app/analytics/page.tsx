import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsCharts, DeviceUsageChart } from "@/components/analytics-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.1%</div>
                <p className="text-xs text-muted-foreground">-2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 32s</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Monthly website traffic trends with real-time data</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsCharts />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/dashboard", views: "12,234", percentage: "32%" },
                    { page: "/analytics", views: "8,432", percentage: "22%" },
                    { page: "/users", views: "6,234", percentage: "16%" },
                    { page: "/reports", views: "4,123", percentage: "11%" },
                    { page: "/settings", views: "2,876", percentage: "8%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.page}</span>
                        <span className="text-xs text-muted-foreground">{item.views} views</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>Traffic breakdown by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <DeviceUsageChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Organic Search", visitors: "15,234", percentage: "45%", color: "bg-chart-1" },
                    { source: "Direct", visitors: "8,432", percentage: "25%", color: "bg-chart-2" },
                    { source: "Social Media", visitors: "5,123", percentage: "15%", color: "bg-chart-3" },
                    { source: "Referral", visitors: "3,456", percentage: "10%", color: "bg-chart-4" },
                    { source: "Email", visitors: "1,678", percentage: "5%", color: "bg-chart-5" },
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{source.source}</span>
                          <span className="text-xs text-muted-foreground">{source.visitors} visitors</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{source.percentage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
