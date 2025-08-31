"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Download, FileText, ImageIcon, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const exportFormats = [
  { value: "pdf", label: "PDF Report", icon: FileText, description: "Comprehensive formatted report" },
  { value: "csv", label: "CSV Data", icon: Table, description: "Raw data for analysis" },
  { value: "png", label: "PNG Charts", icon: ImageIcon, description: "High-resolution chart images" },
  { value: "json", label: "JSON Data", icon: FileText, description: "Structured data export" },
]

const reportSections = [
  { id: "executive", label: "Executive Summary", included: true },
  { id: "metrics", label: "Key Metrics", included: true },
  { id: "trends", label: "Trend Analysis", included: true },
  { id: "performance", label: "Team Performance", included: false },
  { id: "compliance", label: "Compliance Status", included: false },
  { id: "threats", label: "Threat Intelligence", included: false },
  { id: "recommendations", label: "Recommendations", included: true },
]

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  reportType: string
  timeRange: string
}

export function ExportModal({ isOpen, onClose, reportType, timeRange }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [reportTitle, setReportTitle] = useState("Security Analytics Report")
  const [reportDescription, setReportDescription] = useState("")
  const [sections, setSections] = useState(reportSections)
  const [isExporting, setIsExporting] = useState(false)

  const handleSectionToggle = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, included: !section.included } : section)),
    )
  }

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsExporting(false)
    onClose()

    // In a real implementation, this would trigger the actual export
    console.log("Exporting report:", {
      format: selectedFormat,
      title: reportTitle,
      description: reportDescription,
      sections: sections.filter((s) => s.included),
      reportType,
      timeRange,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Export Analytics Report
                </DialogTitle>
                <DialogDescription>Generate and download a comprehensive security analytics report</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Report Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title</Label>
                    <Input
                      id="title"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      placeholder="Enter report title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Add a description for this report"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label>Report Type</Label>
                      <div className="mt-1">
                        <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500">
                          {reportType}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label>Time Range</Label>
                      <div className="mt-1">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                          {timeRange}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Format */}
                <div className="space-y-3">
                  <Label>Export Format</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {exportFormats.map((format) => (
                      <motion.div key={format.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <div
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedFormat === format.value
                              ? "border-indigo-500 bg-indigo-500/10"
                              : "border-muted hover:border-muted-foreground/50"
                          }`}
                          onClick={() => setSelectedFormat(format.value)}
                        >
                          <div className="flex items-center gap-3">
                            <format.icon className="h-5 w-5" />
                            <div>
                              <div className="font-medium text-sm">{format.label}</div>
                              <div className="text-xs text-muted-foreground">{format.description}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-3">
                  <Label>Include Sections</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={section.id}
                          checked={section.included}
                          onCheckedChange={() => handleSectionToggle(section.id)}
                        />
                        <Label htmlFor={section.id} className="text-sm font-normal cursor-pointer">
                          {section.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-medium text-sm mb-2">Export Preview</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Format: {exportFormats.find((f) => f.value === selectedFormat)?.label}</div>
                    <div>
                      Sections: {sections.filter((s) => s.included).length} of {sections.length}
                    </div>
                    <div>Estimated size: ~{Math.round(sections.filter((s) => s.included).length * 1.2)}MB</div>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={onClose} disabled={isExporting}>
                  Cancel
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={isExporting || !reportTitle.trim()}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {isExporting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {isExporting ? "Generating..." : "Export Report"}
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
