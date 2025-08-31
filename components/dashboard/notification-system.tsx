"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertTriangle, Info, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "achievement"
  title: string
  message: string
  duration?: number
}

export function NotificationSystem() {
  const [notifications, setNotifications] = React.useState<Notification[]>([])

  const addNotification = React.useCallback((notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    if (notification.duration !== 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, notification.duration || 5000)
    }
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Example: Add a notification when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: "achievement",
        title: "Achievement Unlocked!",
        message: "You've earned the 'Early Bird' badge for logging in today!",
        duration: 7000,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [addNotification])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "achievement":
        return <Award className="h-5 w-5 text-purple-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/20 bg-green-500/5"
      case "warning":
        return "border-yellow-500/20 bg-yellow-500/5"
      case "achievement":
        return "border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
      default:
        return "border-blue-500/20 bg-blue-500/5"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Card className={`border-2 ${getColors(notification.type)} backdrop-blur-sm shadow-lg`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 h-6 w-6 p-0"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
