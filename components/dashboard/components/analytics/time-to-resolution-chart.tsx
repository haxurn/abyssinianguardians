"use client"
import { motion } from "framer-motion"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

const resolutionData = [
  { date: "Week 1", critical: 8.5, high: 24.2, medium: 72.5, low: 168.3, average: 45.2 },
  { date: "Week 2", critical: 6.8, high: 22.1, medium: 68.9, low: 156.7, average: 42.1 },
  { date: "Week 3", critical: 7.2, high: 26.5, medium: 75.2, low: 172.1, average: 47.8 },
  { date: "Week 4", critical: 5.9, high: 21.8, medium: 65.4, low: 148.9, average: 39.6 },
  { date: "Week 5", critical: 9.1, high: 28.3, medium: 78.6, low: 185.2, average: 52.3 },
  { date: "Week 6", critical: 4.2, high: 19.5, medium: 62.1, low: 142.8, average: 36.9 },
  { date: "Week 7", critical: 6.5, high: 23.7, medium: 71.3, low: 159.4, average: 43.2 },
  { date: "Week 8", critical: 5.1, high: 20.9, medium: 67.8, low: 151.6, average: 40.1 },
]

interface TimeToResolutionChartProps {
  timeRange: string
}

export function TimeToResolutionChart({ timeRange }: TimeToResolutionChartProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Time to Resolution Analysis
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                {timeRange}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Low</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              critical: { label: "Critical (hours)", color: "#ef4444" },
              high: { label: "High (hours)", color: "#f97316" },
              medium: { label: "Medium (hours)", color: "#eab308" },
              low: { label: "Low (hours)", color: "#22c55e" },
              average: { label: "Average (hours)", color: "#8b5cf6" },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Critical Avg", value: "6.4h", color: "text-red-500", target: "< 8h" },
              { label: "High Avg", value: "23.1h", color: "text-orange-500", target: "< 24h" },
              { label: "Medium Avg", value: "70.2h", color: "text-yellow-500", target: "< 72h" },
              { label: "Low Avg", value: "160.6h", color: "text-green-500", target: "< 168h" },
            ].map((metric) => (
              <div key={metric.label} className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-xs text-muted-foreground">Target: {metric.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
