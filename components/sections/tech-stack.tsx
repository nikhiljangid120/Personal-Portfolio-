"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Database, FileCode, Globe, Server } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import TechGlobe from "../ui/tech-globe"

const technologies = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    experience: 90,
    icon: <Globe className="h-8 w-8" />,
    description: "Building interactive UIs with React and its ecosystem",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    experience: 85,
    icon: <Globe className="h-8 w-8" />,
    description: "Creating server-rendered React applications",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    experience: 95,
    icon: <FileCode className="h-8 w-8" />,
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    experience: 85,
    icon: <Server className="h-8 w-8" />,
    description: "JavaScript runtime for building server-side applications",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    experience: 90,
    icon: <Server className="h-8 w-8" />,
    description: "Web application framework for Node.js",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    experience: 80,
    icon: <Database className="h-8 w-8" />,
    description: "NoSQL database for modern applications",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "database",
    experience: 75,
    icon: <Database className="h-8 w-8" />,
    description: "Platform for building web and mobile applications",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "language",
    experience: 80,
    icon: <FileCode className="h-8 w-8" />,
    description: "Typed superset of JavaScript",
  },
]

export default function TechStack() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const [hoveredTech, setHoveredTech] = useState(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section className="scroll-snap-section py-20 relative min-h-screen flex items-center" ref={containerRef}>
      <motion.div style={{ opacity }} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            Tech <span className={isCyberpunk ? "cyberpunk-text" : "gradient-text"}>Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual representation of my technical expertise and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="h-[400px] perspective-container">
            <TechGlobe />
          </div>

          <TooltipProvider>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <Tooltip key={tech.id}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onMouseEnter={() => setHoveredTech(tech.id)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <Card
                        className={cn(
                          "h-full border-0",
                          isCyberpunk ? "cyberpunk-card" : "glass-card",
                          hoveredTech === tech.id && (isCyberpunk ? "cyberpunk-glow" : "neon-glow"),
                        )}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <div className={cn("mb-4", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
                            {tech.icon}
                          </div>
                          <h3 className="font-medium mb-1">{tech.name}</h3>
                          <div className="w-full bg-secondary/50 h-2 rounded-full mt-2">
                            <div
                              className={cn("h-2 rounded-full", isCyberpunk ? "bg-cyber-primary" : "bg-accent")}
                              style={{ width: `${tech.experience}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.description}</p>
                    <p className="font-medium mt-1">Experience: {tech.experience}%</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </motion.div>
    </section>
  )
}

