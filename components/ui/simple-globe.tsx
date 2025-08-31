"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const connections = [
  { from: { x: 20, y: 30 }, to: { x: 80, y: 25 }, color: "#06b6d4", label: "NYC ↔ London" },
  { from: { x: 15, y: 45 }, to: { x: 75, y: 35 }, color: "#0d9488", label: "SF ↔ Tokyo" },
  { from: { x: 45, y: 20 }, to: { x: 70, y: 50 }, color: "#67e8f9", label: "Berlin ↔ Moscow" },
  { from: { x: 75, y: 60 }, to: { x: 85, y: 75 }, color: "#22d3ee", label: "Singapore ↔ Sydney" },
  { from: { x: 25, y: 55 }, to: { x: 60, y: 40 }, color: "#0891b2", label: "São Paulo ↔ Mumbai" },
]

const threatStats = [
  { label: "Threats Blocked", value: "2.4M", change: "+12%" },
  { label: "Active Monitoring", value: "847", change: "+5%" },
  { label: "Response Time", value: "0.3s", change: "-23%" },
  { label: "Global Coverage", value: "99.9%", change: "+0.1%" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Threat Intelligence</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time cybersecurity monitoring across major global hubs with AI-powered threat detection.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Globe Visualization */}
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Globe Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700">
              {/* Continents */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30" fill="currentColor">
                {/* North America */}
                <path d="M15,25 Q20,20 25,25 L30,30 Q25,35 20,30 Z" className="text-cyan-500" />
                {/* Europe */}
                <path d="M45,20 Q50,18 55,22 L52,28 Q48,26 45,20 Z" className="text-cyan-500" />
                {/* Asia */}
                <path d="M65,25 Q75,20 80,30 L85,35 Q80,40 70,35 Z" className="text-cyan-500" />
                {/* Africa */}
                <path d="M48,35 Q52,32 56,38 L54,50 Q50,48 48,35 Z" className="text-cyan-500" />
                {/* Australia */}
                <path d="M75,65 Q80,63 85,67 L82,72 Q78,70 75,65 Z" className="text-cyan-500" />
                {/* South America */}
                <path d="M25,50 Q30,48 32,55 L28,70 Q24,65 25,50 Z" className="text-cyan-500" />
              </svg>

              {/* Connection Lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {connections.map((connection, index) => (
                  <motion.path
                    key={index}
                    d={`M ${connection.from.x} ${connection.from.y} Q ${
                      (connection.from.x + connection.to.x) / 2
                    } ${Math.min(connection.from.y, connection.to.y) - 10} ${connection.to.x} ${connection.to.y}`}
                    stroke={connection.color}
                    strokeWidth="0.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{
                      pathLength: activeConnection === index ? 1 : 0.7,
                      opacity: activeConnection === index ? 1 : 0.4,
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                ))}
              </svg>

              {/* Connection Points */}
              {connections.map((connection, index) => (
                <div key={index}>
                  <motion.div
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${connection.from.x}%`,
                      top: `${connection.from.y}%`,
                      backgroundColor: connection.color,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      scale: activeConnection === index ? [1, 1.5, 1] : 1,
                      opacity: activeConnection === index ? [0.7, 1, 0.7] : 0.6,
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${connection.to.x}%`,
                      top: `${connection.to.y}%`,
                      backgroundColor: connection.color,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      scale: activeConnection === index ? [1, 1.5, 1] : 1,
                      opacity: activeConnection === index ? [0.7, 1, 0.7] : 0.6,
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              ))}

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl" />
            </div>

            {/* Active Connection Info */}
            <motion.div
              key={activeConnection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-1">
                <p className="text-sm font-medium text-foreground">{connections[activeConnection].label}</p>
                <p className="text-xs text-muted-foreground">Active Connection</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {threatStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
              >
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-xs text-green-500 font-medium">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Live Threat Feed</h3>
            <div className="space-y-3">
              {[
                { type: "DDoS Attack", location: "Tokyo", severity: "High", time: "2m ago" },
                { type: "Malware Detected", location: "London", severity: "Medium", time: "5m ago" },
                { type: "Phishing Attempt", location: "New York", severity: "Low", time: "8m ago" },
              ].map((threat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0"
                >
                  <div>
                    <div className="text-sm font-medium text-foreground">{threat.type}</div>
                    <div className="text-xs text-muted-foreground">{threat.location}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        threat.severity === "High"
                          ? "bg-red-500/20 text-red-400"
                          : threat.severity === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {threat.severity}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{threat.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
