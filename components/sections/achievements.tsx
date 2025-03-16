"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Code, Star } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const achievements = [
  {
    id: 1,
    title: "LeetCode",
    description: "Solved 200+ problems with rankings in the top 5% globally",
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
    description: "Winner of 1 state-level hackathon with innovative projects",
    icon: <Trophy className="h-10 w-10 text-yellow-500" />,
    badges: ["Web Development", "Innovation", "Teamwork"],
    stats: [
      { label: "Hackathons Won", value: "1" },
      { label: "Projects Built", value: "2" },
      { label: "Team Collaborations", value: "2" },
    ],
  },
  {
    id: 3,
    title: "Open Source",
    description: "Active contributor to multiple open-source projects with 5+ PRs merged",
    icon: <Star className="h-10 w-10 text-yellow-500" />,
    badges: ["GitHub", "Hacktoberfest", "Community"],
    stats: [
      { label: "PRs Merged", value: "5+" },
      { label: "Projects Contributed", value: "3" },
      { label: "Stars Received", value: "6+" },
    ],
  },
  {
    id: 4,
    title: "Certifications",
    description: "Completed advanced certifications in web development and programming languages",
    icon: <Award className="h-10 w-10 text-yellow-500" />,
    badges: ["Web Development", "Cloud", "Professional"],
    stats: [
      { label: "Certifications", value: "5" },
      { label: "Courses Completed", value: "5" },
      { label: "Skills Verified", value: "10+" },
    ],
  },
]

export default function Achievements() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="scroll-snap-section py-20 relative min-h-screen flex items-center"
    >
      <motion.div style={{ opacity }} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            My <span className={isCyberpunk ? "cyberpunk-text" : "gradient-text"}>Achievements</span>
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
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={cn("h-full border-0", isCyberpunk ? "cyberpunk-card" : "glass-card")}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div
                    className={cn(
                      "rounded-full p-2",
                      isCyberpunk ? "bg-cyber-background border border-cyber-primary" : "glass",
                    )}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {achievement.badges.map((badge, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className={cn(
                          isCyberpunk
                            ? "bg-cyber-background border border-cyber-secondary text-cyber-secondary"
                            : "bg-secondary/50",
                        )}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {achievement.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "text-center p-2 rounded-lg",
                          isCyberpunk ? "bg-cyber-background border border-cyber-primary/50" : "glass",
                        )}
                      >
                        <p className={cn("text-lg font-bold", isCyberpunk ? "cyberpunk-text" : "gradient-text")}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

