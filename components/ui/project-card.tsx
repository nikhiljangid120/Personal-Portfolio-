"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoLink: string
  codeLink: string
  index?: number
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  demoLink,
  codeLink,
  index = 0,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine gradient class based on index
  const gradientClasses = [
    "neon-glow-pink",
    "neon-glow-blue",
    "neon-glow-purple",
    "neon-glow-green",
    "neon-glow-yellow",
  ]

  const gradientClass = gradientClasses[index % gradientClasses.length]

  return (
    <motion.div
      className="modern-card h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-4">
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-3 rounded-full bg-black/50 backdrop-blur-md transition-transform hover:scale-110",
                isHovered ? gradientClass : "",
              )}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-3 rounded-full bg-black/50 backdrop-blur-md transition-transform hover:scale-110",
                isHovered ? gradientClass : "",
              )}
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span key={idx} className="skill-tag text-xs">
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium"
          whileHover={{ x: 5 }}
        >
          View Project <ArrowRight className="ml-1 h-4 w-4" />
        </motion.a>
      </div>
    </motion.div>
  )
}

