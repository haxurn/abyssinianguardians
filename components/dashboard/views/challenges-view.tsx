"use client"
import { motion } from "framer-motion"
import { Target, Trophy, Clock, Zap, Star, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useDashboard } from "../dashboard-context"

const challenges = [
  {
    id: "daily-hunter",
    title: "Daily Vulnerability Hunter",
    description: "Find and report 3 vulnerabilities today",
    type: "daily",
    progress: 1,
    target: 3,
    reward: 150,
    timeLeft: "18h 32m",
    difficulty: "Medium",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "critical-finder",
    title: "Critical Issue Finder",
    description: "Discover a critical vulnerability",
    type: "special",
    progress: 0,
    target: 1,
    reward: 500,
    timeLeft: "2d 14h",
    difficulty: "Hard",
    icon: Zap,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "team-player",
    title: "Team Collaboration",
    description: "Help resolve 5 team member reports",
    type: "weekly",
    progress: 3,
    target: 5,
    reward: 300,
    timeLeft: "4d 8h",
    difficulty: "Easy",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Report 10 vulnerabilities in under 2 hours",
    type: "special",
    progress: 0,
    target: 10,
    reward: 750,
    timeLeft: "∞",
    difficulty: "Expert",
    icon: Clock,
    color: "from-purple-500 to-violet-500",
  },
]

const weeklyGoals = [
  {
    title: "Report Master",
    description: "Submit 20 vulnerability reports this week",
    progress: 15,
    target: 20,
    reward: 400,
    icon: Star,
  },
  {
    title: "Quality Assurance",
    description: "Maintain 90% accuracy rate",
    progress: 92,
    target: 90,
    reward: 300,
    icon: Award,
  },
]

export function ChallengesView() {
  const { state } = useDashboard()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Challenges & Goals
          </h2>
          <p className="text-muted-foreground">Complete challenges to earn XP and unlock achievements</p>
        </div>
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <Trophy className="h-3 w-3 mr-1" />
          {state.user.xp} Total XP
        </Badge>
      </motion.div>

      {/* Daily Challenge Highlight */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Card className="relative overflow-hidden border-2 border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-purple-600/5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-50" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Daily Challenge</CardTitle>
                  <CardDescription>Extra XP opportunity!</CardDescription>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                +{state.gamification.dailyChallenge.reward} XP
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <h3 className="font-semibold mb-2">{state.gamification.dailyChallenge.title}</h3>
            <p className="text-muted-foreground mb-4">{state.gamification.dailyChallenge.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {state.gamification.dailyChallenge.progress}/{state.gamification.dailyChallenge.target}
                </span>
              </div>
              <Progress
                value={(state.gamification.dailyChallenge.progress / state.gamification.dailyChallenge.target) * 100}
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* All Challenges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="text-xl font-semibold mb-4">Available Challenges</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${challenge.color} flex items-center justify-center`}
                      >
                        <challenge.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-500 transition-colors">
                          {challenge.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {challenge.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-500">+{challenge.reward} XP</div>
                      <div className="text-xs text-muted-foreground">{challenge.timeLeft}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Goals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-xl font-semibold mb-4">Weekly Goals</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {weeklyGoals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <goal.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">+{goal.reward} XP</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {goal.progress}/{goal.target}
                      </span>
                    </div>
                    <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
