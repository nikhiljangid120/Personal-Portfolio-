"use client"

import React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Code, Database, Globe, Server, Cpu, GitBranch, Layers, Smartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import ModernSkillCard from "../ui/modern-skill-card"

const skillCategories = [
  {
    name: "frontend",
    label: "Frontend",
    skills: [
      {
        name: "React.js",
        level: 90,
        description: "Building interactive UIs with React and its ecosystem",
        icon: <Globe className="h-6 w-6 text-vibrant-blue" />,
      },
      {
        name: "Next.js",
        level: 85,
        description: "Creating server-rendered React applications",
        icon: <Layers className="h-6 w-6 text-vibrant-purple" />,
      },
      {
        name: "Tailwind CSS",
        level: 95,
        description: "Utility-first CSS framework for rapid UI development",
        icon: <Code className="h-6 w-6 text-vibrant-green" />,
      },
      {
        name: "JavaScript",
        level: 90,
        description: "Building dynamic web applications",
        icon: <Code className="h-6 w-6 text-vibrant-yellow" />,
      },
      {
        name: "TypeScript",
        level: 80,
        description: "Type-safe JavaScript for robust applications",
        icon: <Code className="h-6 w-6 text-vibrant-blue" />,
      },
    ],
  },
  {
    name: "backend",
    label: "Backend",
    skills: [
      {
        name: "Node.js",
        level: 85,
        description: "JavaScript runtime for building server-side applications",
        icon: <Server className="h-6 w-6 text-vibrant-green" />,
      },
      {
        name: "Express.js",
        level: 90,
        description: "Web application framework for Node.js",
        icon: <Server className="h-6 w-6 text-vibrant-blue" />,
      },
      {
        name: "MongoDB",
        level: 80,
        description: "NoSQL database for modern applications",
        icon: <Database className="h-6 w-6 text-vibrant-green" />,
      },
      {
        name: "Firebase",
        level: 75,
        description: "Platform for building web and mobile applications",
        icon: <Database className="h-6 w-6 text-vibrant-yellow" />,
      },
      {
        name: "REST API",
        level: 85,
        description: "Building and consuming RESTful services",
        icon: <Globe className="h-6 w-6 text-vibrant-pink" />,
      },
    ],
  },
  {
    name: "mobile",
    label: "Mobile",
    skills: [
      {
        name: "React Native",
        level: 75,
        description: "Cross-platform mobile app development",
        icon: <Smartphone className="h-6 w-6 text-vibrant-blue" />,
      },
      {
        name: "Expo",
        level: 80,
        description: "Framework for universal React applications",
        icon: <Smartphone className="h-6 w-6 text-vibrant-purple" />,
      },
      {
        name: "Native APIs",
        level: 70,
        description: "Integrating with device-specific features",
        icon: <Smartphone className="h-6 w-6 text-vibrant-green" />,
      },
      {
        name: "Mobile UI/UX",
        level: 75,
        description: "Creating intuitive mobile interfaces",
        icon: <Smartphone className="h-6 w-6 text-vibrant-pink" />,
      },
      {
        name: "App Performance",
        level: 80,
        description: "Optimizing mobile app performance",
        icon: <Cpu className="h-6 w-6 text-vibrant-yellow" />,
      },
    ],
  },
  {
    name: "tools",
    label: "Tools & Others",
    skills: [
      {
        name: "Git & GitHub",
        level: 90,
        description: "Version control and collaboration",
        icon: <GitBranch className="h-6 w-6 text-vibrant-orange" />,
      },
      {
        name: "Docker",
        level: 70,
        description: "Containerization for consistent environments",
        icon: <Layers className="h-6 w-6 text-vibrant-blue" />,
      },
      {
        name: "AWS",
        level: 65,
        description: "Cloud hosting and services",
        icon: <Server className="h-6 w-6 text-vibrant-yellow" />,
      },
      {
        name: "Linux",
        level: 75,
        description: "Server management and shell scripting",
        icon: <Cpu className="h-6 w-6 text-vibrant-green" />,
      },
      {
        name: "Problem Solving",
        level: 95,
        description: "Algorithmic thinking and optimization",
        icon: <Cpu className="h-6 w-6 text-vibrant-pink" />,
      },
    ],
  },
]

export default function Skills() {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const [activeCategory, setActiveCategory] = React.useState("frontend")

  const filteredSkills = skillCategories.find((cat) => cat.name === activeCategory)?.skills || []

  return (
    <section id="skills" ref={containerRef} className="py-20 relative min-h-screen flex items-center">
      <div className="dot-pattern"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            My <span className="gradient-text-1">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeCategory === category.name
                  ? "bg-gray-800 shadow-lg neon-glow-pink"
                  : "bg-gray-800/50 hover:bg-gray-800",
              )}
              onClick={() => setActiveCategory(category.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <ModernSkillCard
              key={skill.name}
              name={skill.name}
              level={skill.level}
              description={skill.description}
              icon={skill.icon}
              colorClass={index % 2 === 0 ? "neon-glow-pink" : "neon-glow-blue"}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

