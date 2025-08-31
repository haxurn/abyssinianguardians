export const DASHBOARD_METRICS = {
  totalVulnerabilities: {
    value: 1247,
    change: "+12.5%",
    trend: "up" as const,
  },
  criticalIssues: {
    value: 23,
    change: "-8.2%",
    trend: "down" as const,
  },
  avgResolutionTime: {
    value: "4.2h",
    change: "-15.3%",
    trend: "down" as const,
  },
  securityScore: {
    value: 87.5,
    change: "+5.1%",
    trend: "up" as const,
  },
}

export const VULNERABILITY_TREND_DATA = [
  { date: "Jan 1", total: 45, critical: 3, high: 12, medium: 20, low: 10, resolved: 38 },
  { date: "Jan 8", total: 52, critical: 5, high: 15, medium: 22, low: 10, resolved: 45 },
  { date: "Jan 15", total: 48, critical: 2, high: 13, medium: 23, low: 10, resolved: 42 },
  { date: "Jan 22", total: 61, critical: 7, high: 18, medium: 25, low: 11, resolved: 55 },
  { date: "Jan 29", total: 58, critical: 4, high: 16, medium: 26, low: 12, resolved: 52 },
  { date: "Feb 5", total: 67, critical: 6, high: 20, medium: 28, low: 13, resolved: 60 },
  { date: "Feb 12", total: 63, critical: 5, high: 18, medium: 27, low: 13, resolved: 58 },
  { date: "Feb 19", total: 71, critical: 8, high: 22, medium: 29, low: 12, resolved: 65 },
]

export const SEVERITY_DATA = [
  { name: "Critical", value: 15, color: "#ef4444", count: 23 },
  { name: "High", value: 28, color: "#f97316", count: 89 },
  { name: "Medium", value: 35, color: "#eab308", count: 156 },
  { name: "Low", value: 22, color: "#22c55e", count: 98 },
]

export const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Senior Security Analyst",
    avatar: "/placeholder.svg?height=60&width=60",
    email: "alice@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2022-03-15",
    level: 15,
    xp: 2850,
    totalReports: 28,
    criticalFinds: 8,
    status: "online" as const,
    specialties: ["Web Security", "Penetration Testing", "OWASP"],
    achievements: ["Top 1%", "Critical Hunter", "Team Lead"],
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Security Researcher",
    avatar: "/placeholder.svg?height=60&width=60",
    email: "bob@company.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    joinDate: "2022-07-20",
    level: 13,
    xp: 2340,
    totalReports: 22,
    criticalFinds: 6,
    status: "online" as const,
    specialties: ["Mobile Security", "API Testing", "Cloud Security"],
    achievements: ["Critical Hunter", "Speed Demon"],
  },
  // Add more team members...
]

export const VULNERABILITY_REPORTS = [
  {
    id: "VUL-001",
    title: "SQL Injection in Login Form",
    severity: "Critical" as const,
    score: 95,
    status: "Open" as const,
    assignedTo: "Alice Johnson",
    date: "2024-01-15",
    description: "Critical SQL injection vulnerability found in the main login form",
    xpReward: 200,
  },
  {
    id: "VUL-002",
    title: "XSS in Comment Section",
    severity: "High" as const,
    score: 78,
    status: "In Progress" as const,
    assignedTo: "Bob Smith",
    date: "2024-01-14",
    description: "Cross-site scripting vulnerability in user comments",
    xpReward: 100,
  },
  // Add more reports...
]

export const ATTACK_VECTORS = [
  { name: "SQL Injection", count: 45, percentage: 28, trend: "+15%", severity: "high" as const },
  { name: "Cross-Site Scripting", count: 38, percentage: 24, trend: "-8%", severity: "medium" as const },
  { name: "CSRF", count: 22, percentage: 14, trend: "+32%", severity: "high" as const },
  { name: "Authentication Bypass", count: 18, percentage: 11, trend: "-12%", severity: "critical" as const },
  { name: "Path Traversal", count: 15, percentage: 9, trend: "+5%", severity: "medium" as const },
]
