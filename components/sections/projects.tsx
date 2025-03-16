"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import ProjectCard from "../ui/project-card"

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Dev" },
  { id: "dsa", label: "DSA" },
  { id: "open-source", label: "Open Source" },
]

const projects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A full-stack e-commerce dashboard with admin controls, analytics, and inventory management.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "web",
  },
  {
    id: 2,
    title: "Algorithm Visualizer",
    description:
      "Interactive tool to visualize various sorting and pathfinding algorithms with step-by-step explanation.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["JavaScript", "Data Structures", "Algorithms"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "dsa",
  },
  {
    id: 3,
    title: "Open Source Library",
    description: "A utility library for React components with 500+ stars on GitHub and 10+ contributors.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "TypeScript", "Open Source"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "open-source",
  },
  {
    id: 4,
    title: "Social Media App",
    description: "A full-stack social media application with real-time chat, notifications, and content sharing.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "web",
  },
  {
    id: 5,
    title: "LeetCode Solutions",
    description:
      "A collection of 200+ LeetCode problems solved with detailed explanations and time complexity analysis.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["C++", "Java", "Algorithms", "Data Structures"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "dsa",
  },
  {
    id: 6,
    title: "Hacktoberfest Contributions",
    description:
      "Multiple contributions to open source projects during Hacktoberfest, including bug fixes and feature additions.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Open Source", "JavaScript", "Python"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "open-source",
  },
]

export default function Projects() {
  const { theme } = useTheme()
  const [activeCategory, setActiveCategory] = useState("all")
  const containerRef = useRef(null)

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" ref={containerRef} className="py-20 relative min-h-screen flex items-center">
      <div className="grid-pattern"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            My <span className="gradient-text-2">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, personal projects, and contributions
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectCategories.map((category, index) => (
            <motion.button
              key={category.id}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-gray-800 shadow-lg neon-glow-blue"
                  : "bg-gray-800/50 hover:bg-gray-800",
              )}
              onClick={() => setActiveCategory(category.id)}
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
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

