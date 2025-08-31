"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SimpleGlobe() {
  const [connections, setConnections] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate random connection points
    const newConnections = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setConnections(newConnections)
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
          Monitor and analyze cybersecurity threats from around the world in real-time.
        </p>
      </motion.div>

      <div className="relative w-full max-w-4xl mx-auto aspect-square">
        {/* Globe SVG */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            style={{
              filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))",
            }}
          >
            {/* Globe outline */}
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="url(#globeGradient)"
              strokeWidth="2"
              className="animate-pulse"
            />

            {/* Latitude lines */}
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="180" ry="120" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />

            {/* Longitude lines */}
            <ellipse cx="200" cy="200" rx="60" ry="180" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="120" ry="180" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0e7490" stopOpacity="0.4" />
              </linearGradient>
              <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Connection points */}
            {connections.map((connection) => (
              <g key={connection.id}>
                <motion.circle
                  cx={connection.x * 3.6 + 20}
                  cy={connection.y * 3.6 + 20}
                  r="3"
                  fill="#06b6d4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    delay: connection.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                />
                <motion.circle
                  cx={connection.x * 3.6 + 20}
                  cy={connection.y * 3.6 + 20}
                  r="8"
                  fill="url(#pulseGradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: connection.delay + 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-1/4 left-0 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
        >
          <div className="text-2xl font-bold text-cyan-500">2.4M+</div>
          <div className="text-sm text-muted-foreground">Threats Blocked</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-1/3 right-0 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
        >
          <div className="text-2xl font-bold text-teal-500">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
        >
          <div className="text-2xl font-bold text-cyan-600">150+</div>
          <div className="text-sm text-muted-foreground">Countries Protected</div>
        </motion.div>
      </div>
    </div>
  )
}
