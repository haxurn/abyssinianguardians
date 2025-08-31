import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "CyberGuard's AI-powered threat detection has revolutionized our security operations. We've seen a 95% reduction in false positives and our response time has improved dramatically.",
      name: "Sarah Chen",
      designation: "CISO at TechFlow Industries",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The implementation was seamless and the real-time threat intelligence has given us unprecedented visibility into our security posture. Our compliance audits are now effortless.",
      name: "Michael Rodriguez",
      designation: "VP of Cybersecurity at InnovateSphere",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "CyberGuard's gamified approach has transformed how our security team operates. The leaderboards and challenges have increased engagement by 300% while improving our overall security metrics.",
      name: "Emily Watson",
      designation: "Security Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The advanced analytics and predictive capabilities have helped us stay ahead of emerging threats. CyberGuard's platform scales beautifully with our growing enterprise needs.",
      name: "James Kim",
      designation: "Chief Security Officer at DataPro",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. The automated incident response has reduced our mean time to resolution by 80%. It's rare to find a security platform that delivers on all its promises.",
      name: "Lisa Thompson",
      designation: "Head of Information Security at FutureNet",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
}
