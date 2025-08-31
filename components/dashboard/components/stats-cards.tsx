"use client"
import { motion } from "framer-motion"
import { FileText, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Reports",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Critical Issues",
    value: "15",
    change: "-3%",
    trend: "down",
    icon: AlertTriangle,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Resolved",
    value: "89",
    change: "+18%",
    trend: "up",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Avg Response",
    value: "2.4h",
    change: "-15%",
    trend: "down",
    icon: Clock,
    color: "from-purple-500 to-violet-500",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="group"
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.title}
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
