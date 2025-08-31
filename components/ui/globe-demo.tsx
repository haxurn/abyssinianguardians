"use client"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
})

export default function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#0f172a",
    showAtmosphere: true,
    atmosphereColor: "#06b6d4",
    atmosphereAltitude: 0.1,
    emissive: "#0f172a",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(6, 182, 212, 0.3)",
    ambientLight: "#06b6d4",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }

  // Cybersecurity threat connections between major security hubs
  const threatConnections = [
    {
      order: 1,
      startLat: 40.7128, // New York (Financial Hub)
      startLng: -74.006,
      endLat: 51.5074, // London (Banking Center)
      endLng: -0.1278,
      arcAlt: 0.3,
      color: "#ef4444", // Red for high threats
    },
    {
      order: 2,
      startLat: 35.6762, // Tokyo (Tech Hub)
      startLng: 139.6503,
      endLat: 37.7749, // San Francisco (Silicon Valley)
      endLng: -122.4194,
      arcAlt: 0.4,
      color: "#f97316", // Orange for medium threats
    },
    {
      order: 3,
      startLat: 52.52, // Berlin (European Security Center)
      startLng: 13.405,
      endLat: 55.7558, // Moscow (Eastern Europe)
      endLng: 37.6176,
      arcAlt: 0.2,
      color: "#06b6d4", // Cyan for monitoring
    },
    {
      order: 4,
      startLat: 1.3521, // Singapore (Asia-Pacific Hub)
      startLng: 103.8198,
      endLat: -33.8688, // Sydney (Oceania)
      endLng: 151.2093,
      arcAlt: 0.3,
      color: "#10b981", // Green for secure connections
    },
    {
      order: 5,
      startLat: 28.6139, // New Delhi (South Asia)
      startLng: 77.209,
      endLat: 25.2048, // Dubai (Middle East Hub)
      endLng: 55.2708,
      arcAlt: 0.2,
      color: "#8b5cf6", // Purple for encrypted traffic
    },
    {
      order: 6,
      startLat: -22.9068, // São Paulo (South America)
      startLng: -43.1729,
      endLat: 19.4326, // Mexico City (North America)
      endLng: -99.1332,
      arcAlt: 0.4,
      color: "#f59e0b", // Amber for warnings
    },
    {
      order: 7,
      startLat: 31.2304, // Shanghai (East Asia)
      startLng: 121.4737,
      endLat: 22.3193, // Hong Kong (Financial Center)
      endLng: 114.1694,
      arcAlt: 0.1,
      color: "#06b6d4", // Cyan for monitoring
    },
    {
      order: 8,
      startLat: 48.8566, // Paris (Western Europe)
      startLng: 2.3522,
      endLat: 41.9028, // Rome (Southern Europe)
      endLng: 12.4964,
      arcAlt: 0.2,
      color: "#10b981", // Green for secure
    },
    {
      order: 9,
      startLat: 34.0522, // Los Angeles (West Coast)
      startLng: -118.2437,
      endLat: 25.7617, // Miami (Southeast)
      endLng: -80.1918,
      arcAlt: 0.3,
      color: "#ef4444", // Red for threats
    },
    {
      order: 10,
      startLat: 59.9311, // Oslo (Northern Europe)
      startLng: 10.7522,
      endLat: 60.1699, // Helsinki (Nordic Region)
      endLng: 24.9384,
      arcAlt: 0.1,
      color: "#06b6d4", // Cyan for monitoring
    },
    {
      order: 11,
      startLat: -26.2041, // Johannesburg (Africa)
      startLng: 28.0473,
      endLat: 30.0444, // Cairo (North Africa)
      endLng: 31.2357,
      arcAlt: 0.4,
      color: "#8b5cf6", // Purple for encrypted
    },
    {
      order: 12,
      startLat: 43.6532, // Toronto (Canada)
      startLng: -79.3832,
      endLat: 49.2827, // Vancouver (West Canada)
      endLng: -123.1207,
      arcAlt: 0.2,
      color: "#10b981", // Green for secure
    },
  ]

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-foreground mb-4">
            Global Threat Intelligence Network
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-muted-foreground max-w-md mt-2 mx-auto">
            Real-time cybersecurity monitoring across major global hubs. Interactive threat visualization and network
            analysis.
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-background z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <World data={threatConnections} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  )
}
