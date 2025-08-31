"use client"
import { useDashboard } from "./dashboard-context"
import { DashboardOverview } from "./views/dashboard-overview"
import { ReportsView } from "./views/reports-view"
import { LeaderboardView } from "./views/leaderboard-view"
import { ChallengesView } from "./views/challenges-view"
import { TeamView } from "./views/team-view"
import { AchievementsView } from "./views/achievements-view"
import { SettingsView } from "./views/settings-view"
import { AnalyticsView } from "./views/analytics-view"

export function DashboardContent() {
  const { state } = useDashboard()

  const renderContent = () => {
    switch (state.activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "reports":
        return <ReportsView />
      case "leaderboard":
        return <LeaderboardView />
      case "challenges":
        return <ChallengesView />
      case "team":
        return <TeamView />
      case "achievements":
        return <AchievementsView />
      case "settings":
        return <SettingsView />
      case "analytics":
        return <AnalyticsView />
      default:
        return <DashboardOverview />
    }
  }

  return <div className="space-y-6">{renderContent()}</div>
}
