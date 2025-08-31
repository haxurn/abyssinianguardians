"use client"
import { motion } from "framer-motion"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const teamData = [
  { name: "Alice J.", reports: 28, critical: 8, resolved: 25, efficiency: 89, responseTime: 2.1 },
  { name: "Bob S.", reports: 22, critical: 6, resolved: 20, efficiency: 91, responseTime: 1.8 },
  { name: "Carol D.", reports: 35, critical: 4, resolved: 32, efficiency: 91, responseTime: 2.3 },
  { name: "David W.", reports: 19, critical: 3, resolved: 17, efficiency: 89, responseTime: 2.7 },
  { name: "Eve B.", reports: 16, critical: 5, resolved: 14, efficiency: 88, responseTime: 2.2 },
]

const skillsData = [
  { skill: "Web Security", alice: 95, bob: 88, carol: 82, david: 75, eve: 90 },
  { skill: "Mobile Security", alice: 78, bob: 95, carol: 70, david: 85, eve: 88 },
  { skill: "Network Security", alice: 85, bob: 82, carol: 95, david: 90, eve: 75 },
  { skill: "Cloud Security", alice: 90, bob: 85, carol: 78, david: 95, eve: 82 },
  { skill: "Compliance", alice: 82, bob: 75, carol: 88, david: 95, eve: 80 },
]

interface TeamPerformanceChartProps {
  timeRange: string
}

export function TeamPerformanceChart({ timeRange }: TeamPerformanceChartProps) {
  const [viewType, setViewType] = useState<"performance" | "skills">("performance")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Team Performance Analysis
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                {timeRange}
              </Badge>
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant={viewType === "performance" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("performance")}
              >
                Performance
              </Button>
              <Button
                variant={viewType === "skills" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("skills")}
              >
                Skills
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === "performance" ? (
            <div className="space-y-6">
              <ChartContainer
                config={{
                  reports: { label: "Reports", color: "hsl(var(--chart-1))" },
                  resolved: { label: "Resolved", color: "hsl(var(--chart-2))" },
                  critical: { label: "Critical Found", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="reports" fill="var(--color-reports)" />
                    <Bar dataKey="resolved" fill="var(--color-resolved)" />
                    <Bar dataKey="critical" fill="var(--color-critical)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="grid gap-4">
                <h4 className="font-semibold">Individual Performance Metrics</h4>
                {teamData.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.reports} reports • {member.critical} critical
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-500">{member.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-500">{member.responseTime}h</div>
                        <div className="text-xs text-muted-foreground">Avg Response</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-500">
                          {Math.round((member.resolved / member.reports) * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Resolution</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <ChartContainer
              config={{
                alice: { label: "Alice J.", color: "#3b82f6" },
                bob: { label: "Bob S.", color: "#ef4444" },
                carol: { label: "Carol D.", color: "#22c55e" },
                david: { label: "David W.", color: "#f59e0b" },
                eve: { label: "Eve B.", color: "#8b5cf6" },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Alice J." dataKey="alice" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                  <Radar name="Bob S." dataKey="bob" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                  <Radar name="Carol D." dataKey="carol" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
