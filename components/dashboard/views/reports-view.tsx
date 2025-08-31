"use client"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDashboard } from "../dashboard-context"

const vulnerabilityReports = [
  {
    id: "VUL-001",
    title: "SQL Injection in Login Form",
    severity: "Critical",
    score: 95,
    status: "Open",
    assignedTo: "Alice Johnson",
    date: "2024-01-15",
    description: "Critical SQL injection vulnerability found in the main login form",
    xpReward: 200,
  },
  {
    id: "VUL-002",
    title: "XSS in Comment Section",
    severity: "High",
    score: 78,
    status: "In Progress",
    assignedTo: "Bob Smith",
    date: "2024-01-14",
    description: "Cross-site scripting vulnerability in user comments",
    xpReward: 100,
  },
  {
    id: "VUL-003",
    title: "Weak Password Policy",
    severity: "Medium",
    score: 45,
    status: "Closed",
    assignedTo: "Carol Davis",
    date: "2024-01-13",
    description: "Password policy allows weak passwords",
    xpReward: 50,
  },
  {
    id: "VUL-004",
    title: "Missing HTTPS Redirect",
    severity: "Low",
    score: 25,
    status: "Open",
    assignedTo: "David Wilson",
    date: "2024-01-12",
    description: "HTTP traffic not properly redirected to HTTPS",
    xpReward: 25,
  },
  {
    id: "VUL-005",
    title: "CSRF Token Missing",
    severity: "High",
    score: 82,
    status: "Open",
    assignedTo: "Eve Brown",
    date: "2024-01-11",
    description: "Cross-site request forgery protection missing",
    xpReward: 100,
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

function getStatusColor(status: string) {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Closed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function ReportsView() {
  const { state, dispatch } = useDashboard()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Vulnerability Reports
          </h2>
          <p className="text-muted-foreground">Manage and track security vulnerabilities</p>
        </div>
        <Button
          onClick={() => dispatch({ type: "TOGGLE_ADD_REPORT" })}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Report
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search reports..." className="pl-8" />
                </div>
              </div>
              <Select
                value={state.filters.severity}
                onValueChange={(value) => dispatch({ type: "SET_FILTER", payload: { key: "severity", value } })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={state.filters.member}
                onValueChange={(value) => dispatch({ type: "SET_FILTER", payload: { key: "member", value } })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="bob">Bob Smith</SelectItem>
                  <SelectItem value="carol">Carol Davis</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reports Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vulnerabilityReports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-sm">{report.id}</TableCell>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>
                      <Badge className={`${getSeverityColor(report.severity)} text-white`}>{report.severity}</Badge>
                    </TableCell>
                    <TableCell className="font-bold">{report.score}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
                        <span className="text-sm">{report.assignedTo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{report.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-500/10 text-purple-500">+{report.xpReward} XP</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
