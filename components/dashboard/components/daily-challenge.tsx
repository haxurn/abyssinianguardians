"use client"
import { motion } from "framer-motion"
import { Target, Clock, Gift } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDashboard } from "../dashboard-context"

export function DailyChallenge() {
  const { state } = useDashboard()
  const challenge = state.gamification.dailyChallenge

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-2 border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
        </div>

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg"
              >
                <Target className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  Daily Challenge
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
                    <Gift className="h-3 w-3 mr-1" />+{challenge.reward} XP
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Resets in 18h 32m</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-yellow-500/20 hover:bg-yellow-500/10 bg-transparent">
              View Details
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
          <p className="text-muted-foreground mb-4">{challenge.description}</p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold">
                {challenge.progress}/{challenge.target}
              </span>
            </div>

            <div className="relative">
              <Progress value={(challenge.progress / challenge.target) * 100} className="h-3" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Keep going!</span>
              <span>{Math.round((challenge.progress / challenge.target) * 100)}% complete</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
