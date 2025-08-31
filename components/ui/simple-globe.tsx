"use client"

import { motion } from "framer-motion"
import { Shield, Activity, Globe, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const connections = [
  { from: { x: 20, y: 30 }, to: { x: 80, y: 40 }, color: "#06b6d4", delay: 0 },
  { from: { x: 15, y: 60 }, to: { x: 85, y: 25 }, color: "#0d9488", delay: 1 },
  { from: { x: 30, y: 80 }, to: { x: 70, y: 20 }, color: "#f59e0b", delay: 2 },
  { from: { x: 60, y: 85 }, to: { x: 25, y: 15 }, color: "#ef4444", delay: 3 },
  { from: { x: 75, y: 70 }, to: { x: 35, y: 35 }, color: "#8b5cf6", delay: 4 },
]

const stats = [
  { label: "Threats Blocked", value: "2.4M", icon: Shield, color: "#06b6d4" },
  { label: "Active Monitoring", value: "24/7", icon: Activity, color: "#0d9488" },
  { label: "Global Coverage", value: "195", icon: Globe, color: "#f59e0b" },
  { label: "Response Time", value: "<1s", icon: Zap, color: "#ef4444" },
]

export default function SimpleGlobe() {
  const [activeConnection, setActiveConnection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Global Threat Intelligence Network</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time cybersecurity monitoring across 195 countries with AI-powered threat detection and instant response
          capabilities.
        </p>
      </motion.div>

      <div className="relative">
        {/* Globe Visualization */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] bg-gradient-to-br from-background via-muted/20 to-background rounded-3xl border border-border overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* World Map Outline */}
          <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
            {/* Simplified continent outlines */}
            <path
              d="M150 120 Q200 100 250 120 Q300 140 350 130 Q400 120 450 140 Q500 160 550 150 Q600 140 650 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
              className="text-muted-foreground"
            />
            <path
              d="M100 200 Q150 180 200 200 Q250 220 300 210 Q350 200 400 220 Q450 240 500 230 Q550 220 600 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
              className="text-muted-foreground"
            />
            <path
              d="M200 280 Q250 260 300 280 Q350 300 400 290 Q450 280 500 300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
              className="text-muted-foreground"
            />
          </svg>

          {/* Threat Connections */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {connections.map((connection, index) => (
              <motion.g key={index}>
                {/* Connection Line */}
                <motion.path
                  d={`M ${connection.from.x} ${connection.from.y} Q ${(connection.from.x + connection.to.x) / 2} ${Math.min(connection.from.y, connection.to.y) - 10} ${connection.to.x} ${connection.to.y}`}
                  fill="none"
                  stroke={connection.color}
                  strokeWidth="0.5"
                  opacity={activeConnection === index ? 1 : 0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: connection.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 8,
                  }}
                />

                {/* Animated Pulse */}
                <motion.circle
                  r="1"
                  fill={connection.color}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    cx: [connection.from.x, connection.to.x],
                    cy: [connection.from.y, connection.to.y],
                  }}
                  transition={{
                    duration: 2,
                    delay: connection.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 8,
                    ease: "easeInOut",
                  }}
                />

                {/* Source Node */}
                <motion.circle
                  cx={connection.from.x}
                  cy={connection.from.y}
                  r="2"
                  fill={connection.color}
                  animate={{
                    scale: activeConnection === index ? [1, 1.5, 1] : 1,
                    opacity: activeConnection === index ? [0.7, 1, 0.7] : 0.5,
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Target Node */}
                <motion.circle
                  cx={connection.to.x}
                  cy={connection.to.y}
                  r="2"
                  fill={connection.color}
                  animate={{
                    scale: activeConnection === index ? [1, 1.5, 1] : 1,
                    opacity: activeConnection === index ? [0.7, 1, 0.7] : 0.5,
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </motion.g>
            ))}
          </svg>

          {/* Floating Stats */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 min-w-[120px]"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Connection Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Threat Detection", desc: "AI-powered real-time analysis", color: "#06b6d4" },
            { title: "Global Response", desc: "Instant threat mitigation", color: "#0d9488" },
            { title: "Intelligence Sharing", desc: "Collaborative defense network", color: "#f59e0b" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center"
            >
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
