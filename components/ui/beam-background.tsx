"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface BeamProps {
  className?: string
  delay?: number
  duration?: number
  pathOptions?: {
    curvature?: number
    startY?: number
    endY?: number
  }
}

export function BeamBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Multiple animated beams */}
      <Beam delay={0} duration={8} pathOptions={{ curvature: 0.3, startY: 20, endY: 80 }} />
      <Beam delay={2} duration={10} pathOptions={{ curvature: -0.2, startY: 60, endY: 30 }} />
      <Beam delay={4} duration={12} pathOptions={{ curvature: 0.4, startY: 10, endY: 90 }} />
      <Beam delay={1} duration={9} pathOptions={{ curvature: -0.3, startY: 70, endY: 20 }} />
      <Beam delay={3} duration={11} pathOptions={{ curvature: 0.1, startY: 40, endY: 60 }} />
    </div>
  )
}

function Beam({ delay = 0, duration = 8, pathOptions = {} }: BeamProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const { curvature = 0.2, startY = 50, endY = 50 } = pathOptions

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const pathLength = path.getTotalLength()
    path.style.strokeDasharray = `${pathLength}`
    path.style.strokeDashoffset = `${pathLength}`
  }, [])

  // Generate a curved path
  const pathData = `M 0,${startY} Q 25,${startY + curvature * 100} 50,${(startY + endY) / 2} T 100,${endY}`

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id={`beam-gradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="hsl(186, 100%, 69%)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(186, 100%, 69%)" stopOpacity="0.8" />
          <stop offset="80%" stopColor="hsl(158, 64%, 52%)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id={`glow-${delay}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        ref={pathRef}
        d={pathData}
        stroke={`url(#beam-gradient-${delay})`}
        strokeWidth="0.5"
        fill="none"
        filter={`url(#glow-${delay})`}
        initial={{ strokeDashoffset: "100%" }}
        animate={{ strokeDashoffset: "-100%" }}
        transition={{
          duration,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </svg>
  )
}

export function GridBeams({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(186, 100%, 69%)" strokeWidth="0.1" opacity="0.1" />
          </pattern>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(186, 100%, 69%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(186, 100%, 69%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(186, 100%, 69%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <motion.rect
          width="100"
          height="100"
          fill="url(#grid-gradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

export function FloatingOrbs({ className = "" }: { className?: string }) {
  const orbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-600/10 blur-xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.8, 0.3, 0.3],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
