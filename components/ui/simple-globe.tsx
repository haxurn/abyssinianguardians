"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const SimpleGlobe = () => {
  const [connections, setConnections] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const generateConnections = () => {
      const newConnections = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
        delay: Math.random() * 2,
      }))
      setConnections(newConnections)
    }

    generateConnections()
    const interval = setInterval(generateConnections, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-96 w-96 mx-auto">
      {/* Globe SVG */}
      <svg width="400" height="400" viewBox="0 0 400 400" className="absolute inset-0">
        {/* Globe circle */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-cyan-500/30"
        />

        {/* Latitude lines */}
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-cyan-500/20"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-cyan-500/20"
        />
        <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500/20" />

        {/* Longitude lines */}
        <ellipse
          cx="200"
          cy="200"
          rx="60"
          ry="180"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-cyan-500/20"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="180"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-cyan-500/20"
        />
        <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500/20" />

        {/* Connection points */}
        {connections.map((connection) => (
          <motion.circle
            key={connection.id}
            cx={connection.x}
            cy={connection.y}
            r="3"
            fill="currentColor"
            className="text-cyan-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: connection.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Connection lines */}
        {connections.map((connection, index) => {
          if (index === connections.length - 1) return null
          const nextConnection = connections[index + 1]
          return (
            <motion.line
              key={`line-${connection.id}`}
              x1={connection.x}
              y1={connection.y}
              x2={nextConnection.x}
              y2={nextConnection.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-cyan-500/40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.6, 0.6, 0],
              }}
              transition={{
                duration: 2,
                delay: connection.delay + 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            />
          )
        })}
      </svg>

      {/* Floating stats */}
      <motion.div
        className="absolute top-8 left-8 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-xs text-cyan-400">Active Threats</div>
        <div className="text-lg font-bold">1,247</div>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-xs text-teal-400">Blocked Today</div>
        <div className="text-lg font-bold">89,432</div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="text-xs text-cyan-400">Global Coverage</div>
        <div className="text-lg font-bold">195 Countries</div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <div className="text-xs text-teal-400">Response Time</div>
        <div className="text-lg font-bold">{"<"}50ms</div>
      </motion.div>
    </div>
  )
}
