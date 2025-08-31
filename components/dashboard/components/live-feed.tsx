"use client"
import { motion } from "framer-motion"
import { Activity, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const liveActivities = [
  {
    id: 1,
    user: "Alice J.",
    action: "reported critical vulnerability",
    time: "2m ago",
    type: "critical",
  },
  {
    id: 2,
    user: "Bob S.",
    action: "closed medium issue",
    time: "5m ago",
    type: "resolved",
  },
  {
    id: 3,
    user: "Carol D.",
    action: "started investigation",
    time: "8m ago",
    type: "progress",
  },
  {
    id: 4,
    user: "David W.",
    action: "updated report status",
    time: "12m ago",
    type: "update",
  },
]

function getActivityColor(type: string) {
  switch (type) {
    case "critical":
      return "bg-red-500"
    case "resolved":
      return "bg-green-500"
    case "progress":
      return "bg-yellow-500"
    case "update":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export function LiveFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Live Activity
            <div className="ml-auto">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
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
