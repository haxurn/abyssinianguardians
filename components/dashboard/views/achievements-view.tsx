"use client"
import { motion } from "framer-motion"
import { Award, Trophy, Star, Shield, Zap, Target, Crown, Medal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const achievements = [
  {
    id: "first-critical",
    title: "First Critical",
    description: "Discovered your first critical vulnerability",
    icon: Shield,
    unlocked: true,
    unlockedAt: "2025-01-10",
    rarity: "Common",
    xpReward: 100,
    color: "from-red-500 to-red-600",
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Maintained a 7-day reporting streak",
    icon: Zap,
    unlocked: true,
    unlockedAt: "2025-01-15",
    rarity: "Uncommon",
    xpReward: 200,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "team-player",
    title: "Team Player",
    description: "Helped resolve 10 team member reports",
    icon: Trophy,
    unlocked: true,
    unlockedAt: "2025-01-20",
    rarity: "Common",
    xpReward: 150,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "vulnerability-hunter",
    title: "Vulnerability Hunter",
    description: "Discovered 50 vulnerabilities",
    icon: Target,
    unlocked: false,
    progress: 28,
    target: 50,
    rarity: "Rare",
    xpReward: 500,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "critical-master",
    title: "Critical Master",
    description: "Found 10 critical vulnerabilities",
    icon: Crown,
    unlocked: false,
    progress: 3,
    target: 10,
    rarity: "Epic",
    xpReward: 1000,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Reported 10 vulnerabilities in under 2 hours",
    icon: Medal,
    unlocked: false,
    progress: 0,
    target: 1,
    rarity: "Legendary",
    xpReward: 2000,
    color: "from-gradient-to-r from-purple-600 to-pink-600",
  },
]

const categories = [
  {
    name: "Discovery",
    achievements: achievements.filter((a) =>
      ["first-critical", "vulnerability-hunter", "critical-master"].includes(a.id),
    ),
    icon: Shield,
    color: "from-red-500 to-red-600",
  },
  {
    name: "Consistency",
    achievements: achievements.filter((a) => ["streak-master", "speed-demon"].includes(a.id)),
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Collaboration",
    achievements: achievements.filter((a) => ["team-player"].includes(a.id)),
    icon: Trophy,
    color: "from-blue-500 to-blue-600",
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    case "Uncommon":
      return "bg-green-500/10 text-green-600 border-green-500/20"
    case "Rare":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20"
    case "Epic":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20"
    case "Legendary":
      return "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-orange-600 border-orange-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

export function AchievementsView() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalXP = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            Achievements
          </h2>
          <p className="text-muted-foreground">Track your progress and unlock rewards</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Award className="h-3 w-3 mr-1" />
            {unlockedCount}/{achievements.length} Unlocked
          </Badge>
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Star className="h-3 w-3 mr-1" />
            {totalXP} XP Earned
          </Badge>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Achievement Progress</h3>
              <span className="text-2xl font-bold text-purple-500">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </span>
            </div>
            <Progress value={(unlockedCount / achievements.length) * 100} className="h-3 mb-2" />
            <div className="text-sm text-muted-foreground">
              {unlockedCount} of {achievements.length} achievements unlocked
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievement Categories */}
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + categoryIndex * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                {category.name}
                <Badge variant="outline" className="ml-auto">
                  {category.achievements.filter((a) => a.unlocked).length}/{category.achievements.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card
                      className={`relative overflow-hidden transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-card to-card/50 border-2 border-green-500/20"
                          : "bg-muted/20 border-dashed border-muted-foreground/20"
                      }`}
                    >
                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      )}

                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${achievement.color} ${
                              !achievement.unlocked ? "opacity-50" : ""
                            }`}
                          >
                            <achievement.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${!achievement.unlocked ? "text-muted-foreground" : ""}`}>
                              {achievement.title}
                            </h4>
                            <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>

                        <p className={`text-sm mb-3 ${!achievement.unlocked ? "text-muted-foreground" : ""}`}>
                          {achievement.description}
                        </p>

                        {achievement.unlocked ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-600 font-medium">Unlocked!</span>
                              <span className="text-purple-600 font-medium">+{achievement.xpReward} XP</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Unlocked on {new Date(achievement.unlockedAt!).toLocaleDateString()}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                {achievement.progress || 0}/{achievement.target || 1}
                              </span>
                            </div>
                            <Progress
                              value={((achievement.progress || 0) / (achievement.target || 1)) * 100}
                              className="h-2"
                            />
                            <div className="text-xs text-muted-foreground">Reward: +{achievement.xpReward} XP</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
