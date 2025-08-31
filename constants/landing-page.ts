export const LANDING_PAGE_CONTENT = {
  hero: {
    title: "Advanced Cybersecurity Dashboard",
    subtitle: "Protect your digital assets with AI-powered threat detection and comprehensive security analytics",
    description:
      "Monitor vulnerabilities, track team performance, and stay ahead of cyber threats with our enterprise-grade security platform.",
    ctaText: "Start Free Trial",
    secondaryCtaText: "Watch Demo",
  },
  features: [
    {
      icon: "Shield",
      title: "Real-time Threat Detection",
      description:
        "Advanced AI algorithms detect and classify threats in real-time, providing instant alerts and automated responses.",
    },
    {
      icon: "BarChart3",
      title: "Comprehensive Analytics",
      description:
        "Deep insights into your security posture with customizable dashboards and detailed reporting capabilities.",
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description:
        "Streamline security operations with team management, role-based access, and collaborative incident response.",
    },
    {
      icon: "Zap",
      title: "Automated Workflows",
      description:
        "Reduce manual tasks with intelligent automation for vulnerability assessment and remediation processes.",
    },
    {
      icon: "Globe",
      title: "Global Threat Intelligence",
      description:
        "Stay informed with real-time threat intelligence feeds from global security networks and research teams.",
    },
    {
      icon: "Award",
      title: "Compliance Management",
      description: "Maintain compliance with industry standards including SOC 2, ISO 27001, PCI DSS, and GDPR.",
    },
  ],
  stats: [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "10M+", label: "Threats Blocked" },
    { value: "500+", label: "Enterprise Clients" },
    { value: "24/7", label: "Security Monitoring" },
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      role: "CISO, TechCorp",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "CyberGuard has transformed our security operations. The AI-powered insights have helped us prevent multiple critical incidents.",
    },
    {
      name: "Michael Rodriguez",
      role: "Security Director, FinanceFlow",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "The compliance management features saved us months of preparation for our SOC 2 audit. Highly recommended!",
    },
    {
      name: "Emily Watson",
      role: "IT Manager, HealthTech",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "Outstanding platform with excellent support. The team collaboration features have improved our incident response time by 60%.",
    },
  ],
  pricing: [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small teams getting started with cybersecurity",
      features: [
        "Up to 5 team members",
        "Basic vulnerability scanning",
        "Email support",
        "Standard reporting",
        "30-day data retention",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "Advanced features for growing security teams",
      features: [
        "Up to 25 team members",
        "Advanced threat detection",
        "Priority support",
        "Custom dashboards",
        "90-day data retention",
        "API access",
        "Compliance templates",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Full-featured solution for large organizations",
      features: [
        "Unlimited team members",
        "AI-powered analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "Unlimited data retention",
        "Advanced compliance",
        "On-premise deployment",
      ],
      popular: false,
    },
  ],
}
