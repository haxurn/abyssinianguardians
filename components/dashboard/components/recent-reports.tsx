"use client"
import { motion } from "framer-motion"
import { Eye, Edit, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentReports = [
  {
    id: "VUL-001",
    title: "SQL Injection in Login Form",
    severity: "Critical",
    assignedTo: "Alice Johnson",
    date: "2 hours ago",
    status: "Open",
  },
  {
    id: "VUL-002",
    title: "XSS in Comment Section",
    severity: "High",
    assignedTo: "Bob Smith",
    date: "4 hours ago",
    status: "In Progress",
  },
  {
    id: "VUL-003",
    title: "Weak Password Policy",
    severity: "Medium",
    assignedTo: "Carol Davis",
    date: "1 day ago",
    status: "Closed",
  },
  {
    id: "VUL-004",
    title: "Missing HTTPS Redirect",
    severity: "Low",
    assignedTo: "David Wilson",
    date: "2 days ago",
    status: "Open",
  },
]

function getSeverityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return "bg-red-500"
    case "High":
      return "bg-orange-500"
    case "Medium":
      return "bg-yellow-500"
    case "Low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export function RecentReports() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(report.severity)}`} />

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{report.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {report.id}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-xs">
                      {report.assignedTo
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
