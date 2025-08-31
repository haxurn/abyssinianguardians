"use client"

import type * as React from "react"
import { createContext, useContext, useReducer } from "react"

interface User {
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  xpToNext: number
  streak: number
  achievements: string[]
  totalScore: number
  reportsSubmitted: number
  rank: number
}

interface DashboardState {
  activeTab: string
  user: User
  notifications: any[]
  isAddReportOpen: boolean
  filters: {
    severity: string
    member: string
    dateRange: string
  }
  gamification: {
    dailyChallenge: any
    weeklyGoals: any[]
    achievements: any[]
  }
}

const initialState: DashboardState = {
  activeTab: "dashboard",
  user: {
    id: "1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 12,
    xp: 2450,
    xpToNext: 550,
    streak: 7,
    achievements: ["first-critical", "streak-master", "team-player"],
    totalScore: 1850,
    reportsSubmitted: 23,
    rank: 2,
  },
  notifications: [],
  isAddReportOpen: false,
  filters: {
    severity: "all",
    member: "all",
    dateRange: "week",
  },
  gamification: {
    dailyChallenge: {
      title: "Critical Hunter",
      description: "Find 3 critical vulnerabilities today",
      progress: 1,
      target: 3,
      reward: 150,
    },
    weeklyGoals: [
      { title: "Report Master", progress: 15, target: 20, reward: 300 },
      { title: "Team Collaborator", progress: 8, target: 10, reward: 200 },
    ],
    achievements: [
      { id: "first-critical", title: "First Critical", unlocked: true },
      { id: "streak-master", title: "7-Day Streak", unlocked: true },
      { id: "team-player", title: "Team Player", unlocked: true },
      { id: "vulnerability-hunter", title: "Vulnerability Hunter", unlocked: false },
    ],
  },
}

type DashboardAction =
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "TOGGLE_ADD_REPORT" }
  | { type: "SET_FILTER"; payload: { key: string; value: string } }
  | { type: "ADD_XP"; payload: number }
  | { type: "UPDATE_STREAK" }

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload }
    case "TOGGLE_ADD_REPORT":
      return { ...state, isAddReportOpen: !state.isAddReportOpen }
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      }
    case "ADD_XP":
      const newXp = state.user.xp + action.payload
      const newLevel = Math.floor(newXp / 1000) + 1
      return {
        ...state,
        user: { ...state.user, xp: newXp, level: newLevel },
      }
    default:
      return state
  }
}

const DashboardContext = createContext<{
  state: DashboardState
  dispatch: React.Dispatch<DashboardAction>
} | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}
