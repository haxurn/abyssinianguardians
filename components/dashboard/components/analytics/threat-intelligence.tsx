"use client"
import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, Globe, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const threatData = [
  {
    name: "Ransomware",
    riskLevel: "Critical",
    trend: "+25%",
    affectedSectors: ["Healthcare", "Finance", "Education"],
    likelihood: 85,
    impact: 95,
    description: "Increased ransomware attacks targeting healthcare infrastructure",
  },
  {
    name: "Supply Chain Attacks",
    riskLevel: "High",
    trend: "+18%",
    affectedSectors: ["Technology", "Manufacturing"],
    likelihood: 72,
    impact: 88,
    description: "Sophisticated attacks on software supply chains",
  },
  {
    name: "AI-Powered Phishing",
    riskLevel: "High",
    trend: "+45%",
    affectedSectors: ["Finance", "Retail", "Government"],
    likelihood: 78,
    impact: 65,
    description: "AI-generated phishing campaigns with higher success rates",
  },
  {
    name: "IoT Botnets",
    riskLevel: "Medium",
    trend: "+12%",
    affectedSectors: ["Smart Cities", "Healthcare"],
    likelihood: 65,
    impact: 70,
    description: "Growing IoT device compromises for botnet operations",
  },
]

const getRiskColor = (level: string) => {
  switch (level) {
    case "Critical":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "High":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    case "Medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "Low":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

interface ThreatIntelligenceProps {
  timeRange: string
}

export function ThreatIntelligence({ timeRange }: ThreatIntelligenceProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-red-500" />
            Threat Intelligence
            <Badge variant="outline" className="bg-red-500/10 text-red-500 ml-auto">
              Live Feed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {threatData.map((threat, index) => (
              <motion.div
                key={threat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-semibold">{threat.name}</h4>
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getRiskColor(threat.riskLevel)}>
                      {threat.riskLevel}
                    </Badge>
                    <div className="flex items-center gap-1 text-red-500">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">{threat.trend}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Likelihood</span>
                      <span>{threat.likelihood}%</span>
                    </div>
                    <Progress value={threat.likelihood} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Impact</span>
                      <span>{threat.impact}%</span>
                    </div>
                    <Progress value={threat.impact} className="h-2" />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Affected Sectors</div>
                  <div className="flex flex-wrap gap-1">
                    {threat.affectedSectors.map((sector) => (
                      <Badge key={sector} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-red-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-red-500" />
              <h4 className="font-semibold text-sm">Recommended Actions</h4>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Increase monitoring for ransomware indicators</li>
              <li>• Review and update supply chain security policies</li>
              <li>• Enhance email security filters for AI-generated phishing</li>
              <li>• Audit IoT device security configurations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
