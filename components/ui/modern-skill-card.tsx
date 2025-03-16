"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillCardProps {
  name: string
  level: number
  description: string
  icon: React.ReactNode
  colorClass?: string
  index?: number
}

export default function ModernSkillCard({
  name,
  level,
  description,
  icon,
  colorClass = "neon-glow-pink",
  index = 0,
}: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="modern-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-lg", isHovered ? colorClass : "bg-gray-800/50")}>{icon}</div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-400 mb-3">{description}</p>

          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">Proficiency</span>
            <span className="text-xs font-medium">{level}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

