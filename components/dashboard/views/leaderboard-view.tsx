"use client"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, Crown, Star, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const leaderboardData = [
  {
    rank: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    totalScore: 2850,
    reportsSubmitted: 28,
    averageSeverity: "High",
    badge: "Top 1%",
    badgeColor: "from-yellow-400 to-yellow-600",
    level: 15,
    xp: 2850,
    streak: 12,
    achievements: 8,
  },
  {
    rank: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    totalScore: 2340,
    reportsSubmitted: 22,
    averageSeverity: "High",
    badge: "Critical Hunter",
    badgeColor: "from-red-400 to-red-600",
    level: 13,
    xp: 2340,
    streak: 8,
    achievements: 6,
  },
  {
    rank: 3,
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    totalScore: 1980,
    reportsSubmitted: 35,
    averageSeverity: "Medium",
    badge: "Report Master",
    badgeColor: "from-blue-400 to-blue-600",
    level: 11,
    xp: 1980,
    streak: 15,
    achievements: 7,
  },
  {
    rank: 4,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    totalScore: 1720,
    reportsSubmitted: 19,
    averageSeverity: "Medium",
    badge: null,
    badgeColor: null,
    level: 10,
    xp: 1720,
    streak: 5,
    achievements: 4,
  },
  {
    rank: 5,
    name: "Eve Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    totalScore: 1450,
    reportsSubmitted: 16,
    averageSeverity: "High",
    badge: null,
    badgeColor: null,
    level: 9,
    xp: 1450,
    streak: 3,
    achievements: 3,
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }
}

const getRankGradient = (rank: number) => {
  switch (rank) {
    case 1:
      return "from-yellow-400/20 to-yellow-600/20"
    case 2:
      return "from-gray-400/20 to-gray-600/20"
    case 3:
      return "from-amber-400/20 to-amber-600/20"
    default:
      return "from-muted/20 to-muted/40"
  }
}

export function LeaderboardView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
            Leaderboard
          </h2>
          <p className="text-muted-foreground">Top performers in vulnerability detection</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Trophy className="h-3 w-3 mr-1" />
            Season 2025
          </Badge>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {leaderboardData.slice(0, 3).map((user, index) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`${index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}`}
          >
            <Card
              className={`relative overflow-hidden border-2 ${
                user.rank === 1
                  ? "border-yellow-500/30"
                  : user.rank === 2
                    ? "border-gray-400/30"
                    : "border-amber-600/30"
              } bg-gradient-to-br ${getRankGradient(user.rank)}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5" />
              <CardContent className="p-6 text-center relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  className="mb-4"
                >
                  {getRankIcon(user.rank)}
                </motion.div>

                <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-white/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-bold text-lg mb-2">{user.name}</h3>

                {user.badge && (
                  <Badge className={`bg-gradient-to-r ${user.badgeColor} text-white mb-3`}>{user.badge}</Badge>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Score</span>
                    <span className="font-bold">{user.totalScore.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reports</span>
                    <span className="font-bold">{user.reportsSubmitted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-bold">{user.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-muted/20 to-transparent hover:from-muted/40 hover:to-muted/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>

                  <Avatar className="h-12 w-12 ring-2 ring-muted group-hover:ring-primary/50 transition-all">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{user.name}</h4>
                      {user.badge && (
                        <Badge className={`bg-gradient-to-r ${user.badgeColor} text-white text-xs`}>{user.badge}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Level {user.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {user.streak} day streak
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {user.achievements} achievements
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{user.totalScore.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{user.reportsSubmitted} reports</div>
                  </div>

                  <div className="w-20">
                    <Progress value={(user.xp % 1000) / 10} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1 text-center">{user.xp % 1000}/1000 XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
