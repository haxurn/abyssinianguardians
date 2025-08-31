"use client"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const attackVectors = [
  { name: "SQL Injection", count: 12, trend: "+15%" },
  { name: "XSS", count: 8, trend: "-5%" },
  { name: "CSRF", count: 6, trend: "+25%" },
  { name: "Authentication", count: 4, trend: "0%" },
  { name: "Authorization", count: 3, trend: "-10%" },
]

export function AttackVectors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Top Attack Vectors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attackVectors.map((vector, index) => (
              <motion.div
                key={vector.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">{vector.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{vector.count}</Badge>
                  <span
                    className={`text-xs ${
                      vector.trend.startsWith("+")
                        ? "text-red-500"
                        : vector.trend.startsWith("-")
                          ? "text-green-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    {vector.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
