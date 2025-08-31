"use client"
import { motion } from "framer-motion"
import { Shield, BarChart3, Users, Settings, FileText, Trophy, Target, Zap, Award, TrendingUp } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useDashboard } from "./dashboard-context"

const sidebarItems = [
  { title: "Dashboard", icon: BarChart3, id: "dashboard", color: "text-blue-500" },
  { title: "Reports", icon: FileText, id: "reports", color: "text-green-500" },
  { title: "Analytics", icon: TrendingUp, id: "analytics", color: "text-indigo-500" },
  { title: "Leaderboard", icon: Trophy, id: "leaderboard", color: "text-yellow-500" },
  { title: "Challenges", icon: Target, id: "challenges", color: "text-purple-500" },
  { title: "Team", icon: Users, id: "team", color: "text-pink-500" },
  { title: "Achievements", icon: Award, id: "achievements", color: "text-orange-500" },
  { title: "Settings", icon: Settings, id: "settings", color: "text-gray-500" },
]

export function DashboardSidebar() {
  const { state, dispatch } = useDashboard()

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
      <SidebarHeader className="border-b border-border/50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              CyberGuard
            </span>
            <span className="text-xs text-muted-foreground">Security Dashboard</span>
          </div>
        </motion.div>

        {/* User Level Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {state.user.level}</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              <Zap className="h-3 w-3 mr-1" />
              {state.user.xp} XP
            </Badge>
          </div>
          <Progress value={(state.user.xp % 1000) / 10} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">{state.user.xpToNext} XP to next level</div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: item.id })}
                      isActive={state.activeTab === item.id}
                      className="group relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10"
                    >
                      <item.icon className={`h-4 w-4 ${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>
                      {state.activeTab === item.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Daily Streak */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mb-4 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">🔥</span>
            </div>
            <span className="text-sm font-medium">Daily Streak</span>
          </div>
          <div className="text-2xl font-bold text-orange-500">{state.user.streak} days</div>
          <div className="text-xs text-muted-foreground">Keep it up!</div>
        </motion.div>
      </SidebarContent>
    </Sidebar>
  )
}
