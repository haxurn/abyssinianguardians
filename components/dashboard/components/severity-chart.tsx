"use client"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SEVERITY_DATA } from "@/constants/dashboard-data"

const COLORS = {
  Critical: "hsl(351, 95%, 71%)",
  High: "hsl(25, 95%, 53%)",
  Medium: "hsl(48, 96%, 53%)",
  Low: "hsl(142, 76%, 36%)",
}

export function SeverityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-100">Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              critical: { label: "Critical", color: COLORS.Critical },
              high: { label: "High", color: COLORS.High },
              medium: { label: "Medium", color: COLORS.Medium },
              low: { label: "Low", color: COLORS.Low },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {SEVERITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-4 space-y-2">
            {SEVERITY_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
                  />
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-200">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
