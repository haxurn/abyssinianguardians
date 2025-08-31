"use client"
import { motion } from "framer-motion"
import { Shield, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const complianceFrameworks = [
  {
    name: "SOC 2 Type II",
    score: 94,
    status: "compliant",
    lastAudit: "2025-01-15",
    nextAudit: "2025-07-15",
    controls: { total: 64, passed: 60, failed: 2, pending: 2 },
  },
  {
    name: "ISO 27001",
    score: 87,
    status: "compliant",
    lastAudit: "2023-12-10",
    nextAudit: "2025-12-10",
    controls: { total: 114, passed: 99, failed: 8, pending: 7 },
  },
  {
    name: "PCI DSS",
    score: 91,
    status: "compliant",
    lastAudit: "2025-02-01",
    nextAudit: "2025-02-01",
    controls: { total: 12, passed: 11, failed: 0, pending: 1 },
  },
  {
    name: "GDPR",
    score: 78,
    status: "partial",
    lastAudit: "2025-01-20",
    nextAudit: "2025-04-20",
    controls: { total: 32, passed: 25, failed: 4, pending: 3 },
  },
  {
    name: "HIPAA",
    score: 82,
    status: "compliant",
    lastAudit: "2023-11-30",
    nextAudit: "2025-11-30",
    controls: { total: 18, passed: 15, failed: 2, pending: 1 },
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "compliant":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "partial":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "non-compliant":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Shield className="h-4 w-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "compliant":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "partial":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "non-compliant":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

interface ComplianceMetricsProps {
  timeRange: string
}

export function ComplianceMetrics({ timeRange }: ComplianceMetricsProps) {
  const overallScore = Math.round(
    complianceFrameworks.reduce((sum, framework) => sum + framework.score, 0) / complianceFrameworks.length,
  )

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{overallScore}%</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {complianceFrameworks.filter((f) => f.status === "compliant").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Compliant</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {complianceFrameworks.filter((f) => f.status === "partial").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Partial</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {complianceFrameworks.reduce((sum, f) => sum + f.controls.failed, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Failed Controls</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Compliance Frameworks */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Compliance Framework Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {complianceFrameworks.map((framework, index) => (
                <motion.div
                  key={framework.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-card/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(framework.status)}
                      <div>
                        <h4 className="font-semibold">{framework.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last audit: {new Date(framework.lastAudit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{framework.score}%</div>
                      <Badge variant="outline" className={getStatusColor(framework.status)}>
                        {framework.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span>{framework.score}%</span>
                    </div>
                    <Progress value={framework.score} className="h-2" />
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold">{framework.controls.total}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-500">{framework.controls.passed}</div>
                      <div className="text-xs text-muted-foreground">Passed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-500">{framework.controls.failed}</div>
                      <div className="text-xs text-muted-foreground">Failed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-500">{framework.controls.pending}</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground">
                    Next audit: {new Date(framework.nextAudit).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
