"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const timelineItems = [
  {
    title: "B.Tech CSE Student",
    description: "Currently pursuing Computer Science Engineering in Jaipur, Rajasthan",
    year: "2021-Present",
  },
  {
    title: "Full-Stack MERN Developer",
    description: "Building scalable web applications with modern technologies",
    year: "2022-Present",
  },
  {
    title: "Problem Solver",
    description: "Solving complex algorithmic challenges using C++, Java, and DSA",
    year: "2021-Present",
  },
  {
    title: "Open-Source Contributor",
    description: "Contributing to various open-source projects and communities",
    year: "2022-Present",
  },
]

export default function AboutTimeline() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">3rd Year B.Tech CSE Student</h3>
      <p className="text-muted-foreground">
        I'm Nikhil Jangid, a passionate MERN Stack Developer and problem solver from Jaipur, Rajasthan. Currently
        pursuing my B.Tech in Computer Science Engineering, I specialize in building scalable web applications and
        solving algorithmic challenges.
      </p>

      <div className="space-y-4">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={cn("w-4 h-4 rounded-full", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
              {index < timelineItems.length - 1 && (
                <div className={cn("w-0.5 h-full", isCyberpunk ? "bg-cyber-primary/50" : "bg-primary/50")}></div>
              )}
            </div>
            <div className={cn("flex-1 p-4 rounded-lg mb-4", isCyberpunk ? "cyberpunk-card" : "glass")}>
              <div className="flex justify-between items-start">
                <h4 className="font-bold">{item.title}</h4>
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    isCyberpunk ? "bg-cyber-secondary text-cyber-background" : "bg-primary/20 text-primary",
                  )}
                >
                  {item.year}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

