"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useDashboard } from "./dashboard-context"

const teamMembers = ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Eve Brown"]

export function AddReportModal() {
  const { state, dispatch } = useDashboard()
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    severity: "",
    score: "",
    assignee: "",
    attachments: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add XP based on severity
    const xpReward =
      {
        low: 25,
        medium: 50,
        high: 100,
        critical: 200,
      }[formData.severity] || 25

    dispatch({ type: "ADD_XP", payload: xpReward })
    dispatch({ type: "TOGGLE_ADD_REPORT" })

    // Reset form
    setFormData({
      title: "",
      description: "",
      severity: "",
      score: "",
      assignee: "",
      attachments: [],
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files!)],
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  return (
    <AnimatePresence>
      {state.isAddReportOpen && (
        <Dialog open={state.isAddReportOpen} onOpenChange={() => dispatch({ type: "TOGGLE_ADD_REPORT" })}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Add Vulnerability Report
                </DialogTitle>
                <DialogDescription>
                  Create a new vulnerability report and earn XP based on severity level.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter vulnerability title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the vulnerability in detail"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    required
                    className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity *</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            Low (+25 XP)
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            Medium (+50 XP)
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            High (+100 XP)
                          </div>
                        </SelectItem>
                        <SelectItem value="critical">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            Critical (+200 XP)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="score">CVSS Score</Label>
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="0.0 - 10.0"
                      value={formData.score}
                      onChange={(e) => setFormData((prev) => ({ ...prev, score: e.target.value }))}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignee">Assigned To</Label>
                  <Select
                    value={formData.assignee}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, assignee: value }))}
                  >
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                    <input id="attachments" type="file" multiple onChange={handleFileUpload} className="hidden" />
                    <label htmlFor="attachments" className="flex flex-col items-center gap-2 cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload files or drag and drop</span>
                    </label>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-2 bg-muted rounded-lg"
                        >
                          <span className="text-sm truncate">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <DialogFooter className="gap-2">
                  <Button type="button" variant="outline" onClick={() => dispatch({ type: "TOGGLE_ADD_REPORT" })}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={!formData.title || !formData.description}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Report
                    {formData.severity && (
                      <Badge className="ml-2 bg-white/20">
                        +{{ low: 25, medium: 50, high: 100, critical: 200 }[formData.severity]} XP
                      </Badge>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
