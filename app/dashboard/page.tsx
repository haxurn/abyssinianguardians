"use client"
import { ThemeProvider } from "next-themes"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DashboardProvider>
        <DashboardLayout />
      </DashboardProvider>
    </ThemeProvider>
  )
}
