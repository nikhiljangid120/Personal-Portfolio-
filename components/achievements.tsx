"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Code, Star } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "LeetCode",
    description: "Solved 300+ problems with rankings in the top 5% globally",
    icon: <Code className="h-10 w-10 text-yellow-500" />,
    badges: ["Data Structures", "Algorithms", "Problem Solving"],
    stats: [
      { label: "Problems Solved", value: "300+" },
      { label: "Contest Rating", value: "1850" },
      { label: "Global Rank", value: "Top 5%" },
    ],
  },
  {
    id: 2,
    title: "Hackathons",
    description: "Winner of 3 national-level hackathons with innovative projects",
    icon: <Trophy className="h-10 w-10 text-yellow-500" />,
    badges: ["Web Development", "Innovation", "Teamwork"],
    stats: [
      { label: "Hackathons Won", value: "3" },
      { label: "Projects Built", value: "7" },
      { label: "Team Collaborations", value: "12" },
    ],
  },
  {
    id: 3,
    title: "Open Source",
    description: "Active contributor to multiple open-source projects with 50+ PRs merged",
    icon: <Star className="h-10 w-10 text-yellow-500" />,
    badges: ["GitHub", "Hacktoberfest", "Community"],
    stats: [
      { label: "PRs Merged", value: "50+" },
      { label: "Projects Contributed", value: "8" },
      { label: "Stars Received", value: "200+" },
    ],
  },
  {
    id: 4,
    title: "Certifications",
    description: "Completed advanced certifications in web development and cloud technologies",
    icon: <Award className="h-10 w-10 text-yellow-500" />,
    badges: ["Web Development", "Cloud", "Professional"],
    stats: [
      { label: "Certifications", value: "6" },
      { label: "Courses Completed", value: "15" },
      { label: "Skills Verified", value: "20+" },
    ],
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            My <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognitions, certifications, and milestones throughout my journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full border-0">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="glass rounded-full p-2">{achievement.icon}</div>
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {achievement.badges.map((badge, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-secondary/50">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {achievement.stats.map((stat, idx) => (
                      <div key={idx} className="text-center glass p-2 rounded-lg">
                        <p className="text-lg font-bold gradient-text">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

