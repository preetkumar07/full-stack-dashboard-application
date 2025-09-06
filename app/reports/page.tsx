import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      title: "Monthly Revenue Report",
      description: "Comprehensive revenue analysis for the current month",
      date: "Generated on Dec 15, 2024",
      status: "Ready",
      icon: TrendingUp,
    },
    {
      title: "User Activity Report",
      description: "Detailed user engagement and activity metrics",
      date: "Generated on Dec 14, 2024",
      status: "Ready",
      icon: FileText,
    },
    {
      title: "Performance Analytics",
      description: "System performance and optimization insights",
      date: "Generated on Dec 13, 2024",
      status: "Ready",
      icon: TrendingUp,
    },
  ]

  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Reports</h2>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <report.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {report.status}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Schedule</CardTitle>
              <CardDescription>Automated report generation settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Weekly Performance Report</h4>
                    <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Monthly Revenue Summary</h4>
                    <p className="text-sm text-muted-foreground">First day of each month at 8:00 AM</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
