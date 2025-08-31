import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "CyberGuard has transformed our security operations. The real-time threat detection and automated response capabilities have reduced our incident response time by 75%. It's like having a team of security experts working 24/7.",
      name: "Sarah Chen",
      designation: "CISO at TechCorp Industries",
      src: "/professional-woman-cybersecurity-executive.png",
    },
    {
      quote:
        "The gamification aspect has completely changed how our team approaches cybersecurity. Our security awareness scores have increased by 60%, and team engagement is at an all-time high. The dashboard makes complex security data actually understandable.",
      name: "Michael Rodriguez",
      designation: "Security Director at Global Finance",
      src: "/professional-man-security-director.png",
    },
    {
      quote:
        "Implementation was seamless, and the ROI was immediate. We've prevented three major security incidents in the first month alone. The predictive analytics feature is a game-changer for proactive threat management.",
      name: "Dr. Emily Watson",
      designation: "CIO at MedTech Solutions",
      src: "/professional-woman-cio-healthcare.png",
    },
    {
      quote:
        "CyberGuard's AI-powered insights have elevated our security posture to enterprise level. The automated compliance reporting alone saves us 20 hours per week. It's the most comprehensive security platform we've ever used.",
      name: "James Thompson",
      designation: "VP of Cybersecurity at DataFlow Corp",
      src: "/professional-man-vp-cybersecurity.png",
    },
    {
      quote:
        "The collaborative features have revolutionized how our distributed security team works together. Real-time threat sharing and coordinated response protocols have made us incredibly efficient. Outstanding platform.",
      name: "Lisa Park",
      designation: "Security Operations Manager at CloudTech",
      src: "/professional-woman-security-operations-manager.png",
    },
  ]
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
}
