"use client"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { DashboardContent } from "./dashboard-content"
import { NotificationSystem } from "./notification-system"
import { AIChatAssistant } from "./ai-chat/ai-chat-assistant"
import { useDashboard } from "./dashboard-context"

export function DashboardLayout() {
  const { state } = useDashboard()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <AnimatePresence mode="wait">
            <motion.main
              key={state.activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-6"
            >
              <DashboardContent />
            </motion.main>
          </AnimatePresence>
        </div>
        <NotificationSystem />
        <AIChatAssistant />
      </div>
    </SidebarProvider>
  )
}
