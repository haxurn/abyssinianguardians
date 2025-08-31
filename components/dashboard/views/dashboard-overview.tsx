"use client"
import { motion } from "framer-motion"
import { StatsCards } from "../components/stats-cards"
import { VulnerabilityChart } from "../components/vulnerability-chart"
import { SeverityChart } from "../components/severity-chart"
import { RecentReports } from "../components/recent-reports"
import { DailyChallenge } from "../components/daily-challenge"
import { AttackVectors } from "../components/attack-vectors"
import { LiveFeed } from "../components/live-feed"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <StatsCards />
      </motion.div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <DailyChallenge />
      </motion.div>

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="col-span-2">
          <VulnerabilityChart />
        </div>
        <SeverityChart />
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <RecentReports />
        </div>
        <div className="space-y-6">
          <AttackVectors />
          <LiveFeed />
        </div>
      </motion.div>
    </div>
  )
}
