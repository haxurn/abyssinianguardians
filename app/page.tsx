"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Users, Settings, FileText, Trophy } from "lucide-react"

// Mock data
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
  },
]

const teamMembers = [
  {
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    totalScore: 1250,
    reportsSubmitted: 15,
    averageSeverity: "High",
    badge: "Top 1%",
    badgeColor: "bg-yellow-500",
  },
  {
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    totalScore: 980,
    reportsSubmitted: 12,
    averageSeverity: "Medium",
    badge: "Most Critical Finds",
    badgeColor: "bg-red-500",
  },
  {
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    totalScore: 875,
    reportsSubmitted: 18,
    averageSeverity: "Medium",
    badge: "Most Reports",
    badgeColor: "bg-blue-500",
  },
  {
    name: "David Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    totalScore: 720,
    reportsSubmitted: 9,
    averageSeverity: "Low",
    badge: null,
    badgeColor: null,
  },
  {
    name: "Eve Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    totalScore: 650,
    reportsSubmitted: 8,
    averageSeverity: "High",
    badge: null,
    badgeColor: null,
  },
]

const severityData = [
  { name: "Critical", value: 15, color: "#ef4444" },
  { name: "High", value: 28, color: "#f97316" },
  { name: "Medium", value: 35, color: "#eab308" },
  { name: "Low", value: 22, color: "#22c55e" },
]

const weeklyData = [
  { week: "Week 1", vulnerabilities: 12 },
  { week: "Week 2", vulnerabilities: 19 },
  { week: "Week 3", vulnerabilities: 15 },
  { week: "Week 4", vulnerabilities: 22 },
  { week: "Week 5", vulnerabilities: 18 },
  { week: "Week 6", vulnerabilities: 25 },
  { week: "Week 7", vulnerabilities: 20 },
]

const attackVectors = [
  { name: "SQL Injection", count: 8 },
  { name: "XSS", count: 12 },
  { name: "CSRF", count: 5 },
  { name: "Authentication", count: 7 },
  { name: "Authorization", count: 4 },
  { name: "Input Validation", count: 9 },
]

const sidebarItems = [
  { title: "Dashboard", icon: BarChart3, id: "dashboard" },
  { title: "Reports", icon: FileText, id: "reports" },
  { title: "Leaderboard", icon: Trophy, id: "leaderboard" },
  { title: "Team", icon: Users, id: "team" },
  { title: "Settings", icon: Settings, id: "settings" },
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

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/landing")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  )
}
