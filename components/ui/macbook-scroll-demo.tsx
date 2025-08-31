import { MacbookScroll } from "@/components/ui/macbook-scroll"
import { Shield } from "lucide-react"

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-background">
      <MacbookScroll
        title={
          <span>
            Experience the future of cybersecurity. <br />
            <span className="bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
              Built for enterprise security teams.
            </span>
          </span>
        }
        badge={
          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            <Shield className="h-3 w-3" />
            CyberGuard
          </div>
        }
        src="/cybersecurity-dashboard-dark-theme-with-charts-and.png"
        showGradient={false}
      />
    </div>
  )
}
