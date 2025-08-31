"use client"
import { motion } from "framer-motion"
import { Shield, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const attackVectors = [
  { name: "SQL Injection", count: 45, percentage: 28, trend: "+15%", severity: "high" },
  { name: "Cross-Site Scripting", count: 38, percentage: 24, trend: "-8%", severity: "medium" },
  { name: "CSRF", count: 22, percentage: 14, trend: "+32%", severity: "high" },
  { name: "Authentication Bypass", count: 18, percentage: 11, trend: "-12%", severity: "critical" },
  { name: "Path Traversal", count: 15, percentage: 9, trend: "+5%", severity: "medium" },
  { name: "Command Injection", count: 12, percentage: 8, trend: "-3%", severity: "critical" },
  { name: "Information Disclosure", count: 10, percentage: 6, trend: "+18%", severity: "low" },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

interface AttackVectorAnalysisProps {
  timeRange: string
}

export function AttackVectorAnalysis({ timeRange }: AttackVectorAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Attack Vector Analysis
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 ml-auto">
              {timeRange}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attackVectors.map((vector, index) => (
              <motion.div
                key={vector.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(vector.severity)}`} />
                    <span className="font-medium text-sm">{vector.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {vector.count}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {vector.trend.startsWith("+") ? (
                        <TrendingUp className="h-3 w-3 text-red-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-green-500" />
                      )}
                      <span className={`text-xs ${vector.trend.startsWith("+") ? "text-red-500" : "text-green-500"}`}>
                        {vector.trend}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={vector.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{vector.percentage}% of total</span>
                    <span className="capitalize">{vector.severity} severity</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-600/5 border border-blue-500/10">
            <h4 className="font-semibold text-sm mb-2">Key Insights</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• SQL Injection attacks increased by 15% this period</li>
              <li>• CSRF vulnerabilities showing concerning 32% growth</li>
              <li>• Authentication bypasses decreased by 12% - good progress</li>
              <li>• Focus needed on injection-based attack prevention</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
