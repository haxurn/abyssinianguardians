"use client"
import { motion } from "framer-motion"
import { Users, UserPlus, Mail, MapPin, Calendar, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Senior Security Analyst",
    avatar: "/placeholder.svg?height=60&width=60",
    email: "alice@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2022-03-15",
    level: 15,
    xp: 2850,
    totalReports: 28,
    criticalFinds: 8,
    status: "online",
    specialties: ["Web Security", "Penetration Testing", "OWASP"],
    achievements: ["Top 1%", "Critical Hunter", "Team Lead"],
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Security Researcher",
    avatar: "/placeholder.svg?height=60&width=60",
    email: "bob@company.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    joinDate: "2022-07-20",
    level: 13,
    xp: 2340,
    totalReports: 22,
    criticalFinds: 6,
    status: "online",
    specialties: ["Mobile Security", "API Testing", "Cloud Security"],
    achievements: ["Critical Hunter", "Speed Demon"],
  },
  {
    id: "3",
    name: "Carol Davis",
    role: "Junior Security Analyst",
    avatar: "/placeholder.svg?height=60&width=60",
    email: "carol@company.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    joinDate: "2023-01-10",
    level: 11,
    xp: 1980,
    totalReports: 35,
    criticalFinds: 4,
    status: "away",
    specialties: ["Network Security", "Vulnerability Assessment"],
    achievements: ["Report Master", "Team Player"],
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Security Consultant",
    avatar: "/placeholder.svg?height=60&width=60",
    email: "david@company.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    joinDate: "2023-05-15",
    level: 10,
    xp: 1720,
    totalReports: 19,
    criticalFinds: 3,
    status: "offline",
    specialties: ["Compliance", "Risk Assessment", "Security Auditing"],
    achievements: ["Compliance Expert"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "away":
      return "bg-yellow-500"
    case "offline":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

export function TeamView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Team Members
          </h2>
          <p className="text-muted-foreground">Manage your cybersecurity team</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </motion.div>

      {/* Team Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <div className={`w-3 h-3 rounded-full bg-green-500`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.filter((m) => m.status === "online").length}</div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Award className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.reduce((sum, m) => sum + m.totalReports, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <TrendingUp className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.reduce((sum, m) => sum + m.criticalFinds, 0)}</div>
                <div className="text-sm text-muted-foreground">Critical Finds</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Members Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 ring-2 ring-muted">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Level {member.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{member.role}</p>

                    <div className="flex flex-wrap gap-1">
                      {member.achievements.slice(0, 2).map((achievement) => (
                        <Badge
                          key={achievement}
                          className="text-xs bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 border-blue-500/20"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-500">{member.totalReports}</div>
                    <div className="text-xs text-muted-foreground">Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-500">{member.criticalFinds}</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-500">{member.xp}</div>
                    <div className="text-xs text-muted-foreground">XP</div>
                  </div>
                </div>

                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level Progress</span>
                    <span>{member.xp % 1000}/1000 XP</span>
                  </div>
                  <Progress value={(member.xp % 1000) / 10} className="h-2" />
                </div>

                {/* Specialties */}
                <div>
                  <div className="text-sm font-medium mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
