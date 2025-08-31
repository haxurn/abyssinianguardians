"use client"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SEVERITY_DATA } from "@/constants/dashboard-data"

const severityTrends = [
  { month: "Oct", critical: 12, high: 25, medium: 45, low: 18 },
  { month: "Nov", critical: 18, high: 32, medium: 52, low: 22 },
  { month: "Dec", critical: 15, high: 28, medium: 48, low: 19 },
  { month: "Jan", critical: 23, high: 35, medium: 56, low: 26 },
  { month: "Feb", critical: 19, high: 31, medium: 51, low: 23 },
]

const COLORS = {
  Critical: "hsl(351, 95%, 71%)",
  High: "hsl(25, 95%, 53%)",
  Medium: "hsl(48, 96%, 53%)",
  Low: "hsl(142, 76%, 36%)",
}

interface SeverityAnalysisChartProps {
  timeRange: string
}

export function SeverityAnalysisChart({ timeRange }: SeverityAnalysisChartProps) {
  const [viewType, setViewType] = useState<"pie" | "bar">("pie")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-100">
              Severity Analysis
              <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                {timeRange}
              </Badge>
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant={viewType === "pie" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("pie")}
                className={
                  viewType === "pie"
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }
              >
                Distribution
              </Button>
              <Button
                variant={viewType === "bar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("bar")}
                className={
                  viewType === "bar"
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }
              >
                Trends
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              critical: { label: "Critical", color: COLORS.Critical },
              high: { label: "High", color: COLORS.High },
              medium: { label: "Medium", color: COLORS.Medium },
              low: { label: "Low", color: COLORS.Low },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              {viewType === "pie" ? (
                <PieChart>
                  <Pie
                    data={SEVERITY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {SEVERITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              ) : (
                <BarChart data={severityTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 17%)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(215, 28%, 17%)" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(215, 28%, 17%)" }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="critical" stackId="a" fill="var(--color-critical)" />
                  <Bar dataKey="high" stackId="a" fill="var(--color-high)" />
                  <Bar dataKey="medium" stackId="a" fill="var(--color-medium)" />
                  <Bar dataKey="low" stackId="a" fill="var(--color-low)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>

          {viewType === "pie" && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {SEVERITY_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
                    />
                    <span className="text-sm font-medium text-slate-300">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-200">{item.count}</div>
                    <div className="text-xs text-slate-400">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
