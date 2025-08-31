"use client"
import { motion } from "framer-motion"
import { Plus, Moon, Sun, Bell, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddReportModal } from "./add-report-modal"
import { useDashboard } from "./dashboard-context"

export function DashboardHeader() {
  const { state, dispatch } = useDashboard()
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 bg-card/50 backdrop-blur-sm"
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold capitalize bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {state.activeTab}
          </h1>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Rank #{state.user.rank}
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              {state.user.totalScore} pts
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 w-[200px] bg-background/50" />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-xs text-white font-bold">3</span>
                </motion.div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-sm font-medium">New Critical Vulnerability</div>
                    <div className="text-xs text-muted-foreground">SQL injection found in login form</div>
                  </div>
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-sm font-medium">Achievement Unlocked!</div>
                    <div className="text-xs text-muted-foreground">You've earned "Streak Master"</div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-accent/50"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Add Report */}
          <Button
            onClick={() => dispatch({ type: "TOGGLE_ADD_REPORT" })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Report
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                  <AvatarImage src={state.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <div className="text-sm font-medium">{state.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  Level {state.user.level} • {state.user.xp} XP
                </div>
              </div>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AddReportModal />
    </motion.header>
  )
}
