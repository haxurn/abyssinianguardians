"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { TrendingUp, Download, Filter, Calendar, BarChart3, PieChart, LineChart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "../components/date-range-picker"
import { VulnerabilityTrendChart } from "../components/analytics/vulnerability-trend-chart"
import { SeverityAnalysisChart } from "../components/analytics/severity-analysis-chart"
import { TeamPerformanceChart } from "../components/analytics/team-performance-chart"
import { AttackVectorAnalysis } from "../components/analytics/attack-vector-analysis"
import { TimeToResolutionChart } from "../components/analytics/time-to-resolution-chart"
import { VulnerabilityHeatmap } from "../components/analytics/vulnerability-heatmap"
import { ComplianceMetrics } from "../components/analytics/compliance-metrics"
import { ThreatIntelligence } from "../components/analytics/threat-intelligence"
import { ExportModal } from "../components/analytics/export-modal"

const timeRanges = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last 6 months", value: "6m" },
  { label: "Last year", value: "1y" },
  { label: "Custom range", value: "custom" },
]

const reportTypes = [
  { label: "Executive Summary", value: "executive" },
  { label: "Technical Report", value: "technical" },
  { label: "Compliance Report", value: "compliance" },
  { label: "Team Performance", value: "team" },
  { label: "Trend Analysis", value: "trends" },
]

export function AnalyticsView() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")
  const [selectedReportType, setSelectedReportType] = useState("executive")
  const [showExportModal, setShowExportModal] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "trends", label: "Trends", icon: LineChart },
    { id: "performance", label: "Performance", icon: Users },
    { id: "compliance", label: "Compliance", icon: PieChart },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Analytics & Reporting
          </h2>
          <p className="text-muted-foreground">Comprehensive security metrics and trend analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowExportModal(true)}
            className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border-indigo-500/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTimeRange === "custom" && <DatePickerWithRange />}

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && <OverviewTab timeRange={selectedTimeRange} />}
        {activeTab === "trends" && <TrendsTab timeRange={selectedTimeRange} />}
        {activeTab === "performance" && <PerformanceTab timeRange={selectedTimeRange} />}
        {activeTab === "compliance" && <ComplianceTab timeRange={selectedTimeRange} />}
      </motion.div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        reportType={selectedReportType}
        timeRange={selectedTimeRange}
      />
    </div>
  )
}

function OverviewTab({ timeRange }: { timeRange: string }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Vulnerabilities"
          value="1,247"
          change="+12.5%"
          trend="up"
          icon={TrendingUp}
          color="from-blue-500 to-cyan-500"
        />
        <MetricCard
          title="Critical Issues"
          value="23"
          change="-8.2%"
          trend="down"
          icon={TrendingUp}
          color="from-red-500 to-pink-500"
        />
        <MetricCard
          title="Avg Resolution Time"
          value="4.2h"
          change="-15.3%"
          trend="down"
          icon={TrendingUp}
          color="from-green-500 to-emerald-500"
        />
        <MetricCard
          title="Security Score"
          value="87.5"
          change="+5.1%"
          trend="up"
          icon={TrendingUp}
          color="from-purple-500 to-violet-500"
        />
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <VulnerabilityTrendChart timeRange={timeRange} />
        <SeverityAnalysisChart timeRange={timeRange} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VulnerabilityHeatmap timeRange={timeRange} />
        </div>
        <AttackVectorAnalysis timeRange={timeRange} />
      </div>
    </div>
  )
}

function TrendsTab({ timeRange }: { timeRange: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <VulnerabilityTrendChart timeRange={timeRange} detailed />
        <TimeToResolutionChart timeRange={timeRange} />
        <ThreatIntelligence timeRange={timeRange} />
      </div>
    </div>
  )
}

function PerformanceTab({ timeRange }: { timeRange: string }) {
  return (
    <div className="space-y-6">
      <TeamPerformanceChart timeRange={timeRange} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alice Johnson", score: 2850, reports: 28, efficiency: 95 },
                { name: "Bob Smith", score: 2340, reports: 22, efficiency: 92 },
                { name: "Carol Davis", score: 1980, reports: 35, efficiency: 88 },
              ].map((performer, index) => (
                <div key={performer.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">{performer.name}</div>
                    <div className="text-sm text-muted-foreground">{performer.reports} reports</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{performer.score}</div>
                    <div className="text-sm text-green-500">{performer.efficiency}% efficiency</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Average Response Time</span>
                <span className="font-bold">2.4 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution Rate</span>
                <span className="font-bold text-green-500">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span>False Positive Rate</span>
                <span className="font-bold text-red-500">3.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Team Efficiency</span>
                <span className="font-bold text-blue-500">91.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ComplianceTab({ timeRange }: { timeRange: string }) {
  return (
    <div className="space-y-6">
      <ComplianceMetrics timeRange={timeRange} />
    </div>
  )
}

function MetricCard({ title, value, change, trend, icon: Icon, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`}
        />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform`}
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold mb-1">{value}</div>
          <div className="flex items-center text-xs">
            <TrendingUp className={`h-3 w-3 mr-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`} />
            <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
