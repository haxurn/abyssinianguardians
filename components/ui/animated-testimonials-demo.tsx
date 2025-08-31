import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "CyberGuard has transformed our security operations. The real-time threat detection and automated response capabilities have reduced our incident response time by 75%. It's like having a team of security experts working 24/7.",
      name: "Sarah Chen",
      designation: "CISO at TechCorp",
      src: "/professional-woman-cybersecurity-executive.png",
    },
    {
      quote:
        "The gamification aspect has completely changed how our team approaches cybersecurity training. Our security awareness scores have improved by 60% since implementing CyberGuard's platform.",
      name: "Michael Rodriguez",
      designation: "Security Director at FinanceFirst",
      src: "/professional-man-security-director.png",
    },
    {
      quote:
        "What impressed me most is the comprehensive analytics and reporting. We can now demonstrate ROI on our security investments and make data-driven decisions. The executive dashboards are particularly valuable.",
      name: "Dr. Emily Watson",
      designation: "Chief Information Officer at HealthTech Solutions",
      src: "/professional-woman-cio-healthcare.png",
    },
    {
      quote:
        "The AI-powered threat intelligence has been a game-changer. We're now proactively identifying and mitigating threats before they impact our operations. The platform's predictive capabilities are outstanding.",
      name: "James Thompson",
      designation: "VP of Cybersecurity at GlobalManufacturing",
      src: "/professional-man-vp-cybersecurity.png",
    },
    {
      quote:
        "CyberGuard's collaborative features have improved our team coordination significantly. The real-time communication and incident management tools have streamlined our security operations.",
      name: "Lisa Park",
      designation: "Security Operations Manager at RetailGiant",
      src: "/professional-woman-security-operations-manager.png",
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
}
