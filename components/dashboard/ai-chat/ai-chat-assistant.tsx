"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

const QUICK_ACTIONS = [
  "Show vulnerability trends",
  "Analyze security metrics",
  "Team performance summary",
  "Critical issues overview",
  "Compliance status",
  "Risk assessment",
]

const AI_RESPONSES = {
  vulnerability:
    "Based on current data, we have 71 total vulnerabilities with 8 critical issues. The trend shows a 12% increase from last week, primarily in SQL injection and XSS categories.",
  security:
    "Your security score is 87.5% with an upward trend of +5.1%. Key strengths include incident response time and patch management. Areas for improvement: authentication protocols.",
  team: "Team performance is excellent! Alice Johnson leads with 28 reports and 8 critical finds. Average resolution time has improved by 15.3% to 4.2 hours.",
  critical:
    "Currently tracking 8 critical vulnerabilities: 3 SQL injections, 2 authentication bypasses, 2 XSS, and 1 CSRF. Immediate attention required for VUL-001 and VUL-005.",
  compliance:
    "Compliance status: 94% SOC 2 compliant, 89% ISO 27001 compliant. Recent improvements in access controls and data encryption. Next audit scheduled for Q2.",
  risk: "Current risk level: MEDIUM. Primary concerns: unpatched systems (23%), weak authentication (15%), and social engineering susceptibility (12%). Recommended actions available.",
  default:
    "I'm here to help with cybersecurity analysis, vulnerability management, team performance, and compliance monitoring. What would you like to know?",
}

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your cybersecurity AI assistant. I can help you analyze vulnerabilities, track team performance, and provide security insights. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    for (const [key, response] of Object.entries(AI_RESPONSES)) {
      if (key !== "default" && lowerInput.includes(key)) {
        return response
      }
    }

    return AI_RESPONSES.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateResponse(inputValue),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    handleSendMessage()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card
              className={`w-96 bg-slate-900/95 border-slate-700/50 backdrop-blur-sm shadow-2xl ${isMinimized ? "h-16" : "h-[600px]"} transition-all duration-300`}
            >
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm text-slate-100">AI Security Assistant</CardTitle>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-slate-400">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 text-slate-400 hover:text-slate-200"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-slate-400 hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          {message.type === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                message.type === "user"
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                  : "bg-slate-800 text-slate-200"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 px-1">{formatTime(message.timestamp)}</p>
                          </div>
                          {message.type === "user" && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-slate-300" />
                            </div>
                          )}
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-slate-800 p-3 rounded-lg">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="p-4 border-t border-slate-700/50">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {QUICK_ACTIONS.slice(0, 3).map((action) => (
                        <Badge
                          key={action}
                          variant="outline"
                          className="cursor-pointer hover:bg-slate-700 text-xs border-slate-600 text-slate-300"
                          onClick={() => handleQuickAction(action)}
                        >
                          {action}
                        </Badge>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Ask about security metrics, vulnerabilities..."
                        className="flex-1 bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
