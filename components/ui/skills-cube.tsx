"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#68A063" },
  { name: "MongoDB", color: "#4DB33D" },
  { name: "Express", color: "#000000" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
]

export default function SkillsCube() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const cubeRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.3, // Reduced from 0.5
        y: prev.y + 0.3, // Reduced from 0.5
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cubeRef.current) return

      const { left, top, width, height } = cubeRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      // Calculate normalized position between -1 and 1
      const x = (e.clientX - centerX) / (width / 2)
      const y = (e.clientY - centerY) / (height / 2)

      if (Math.abs(x) < 1 && Math.abs(y) < 1) {
        setRotation({ x: y * 30, y: x * 30 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000" ref={cubeRef}>
      <motion.div
        className="relative w-64 h-64 transform-style-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Front face */}
        <motion.div
          className={cn(
            "absolute w-full h-full flex items-center justify-center",
            isCyberpunk ? "cyberpunk-card" : "glass-card",
          )}
          style={{
            transform: "translateZ(8rem)",
            backfaceVisibility: "hidden",
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredSkill(skills[0].name)}
          onHoverEnd={() => setHoveredSkill(null)}
        >
          <div className="text-center">
            <div className={cn("text-4xl mb-2", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
              {skills[0].name}
            </div>
            <div className={cn("w-16 h-1 mx-auto", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
          </div>
        </motion.div>

        {/* Back face */}
        <motion.div
          className={cn(
            "absolute w-full h-full flex items-center justify-center",
            isCyberpunk ? "cyberpunk-card" : "glass-card",
          )}
          style={{
            transform: "rotateY(180deg) translateZ(8rem)",
            backfaceVisibility: "hidden",
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredSkill(skills[1].name)}
          onHoverEnd={() => setHoveredSkill(null)}
        >
          <div className="text-center">
            <div className={cn("text-4xl mb-2", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
              {skills[1].name}
            </div>
            <div className={cn("w-16 h-1 mx-auto", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
          </div>
        </motion.div>

        {/* Right face */}
        <motion.div
          className={cn(
            "absolute w-full h-full flex items-center justify-center",
            isCyberpunk ? "cyberpunk-card" : "glass-card",
          )}
          style={{
            transform: "rotateY(90deg) translateZ(8rem)",
            backfaceVisibility: "hidden",
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredSkill(skills[2].name)}
          onHoverEnd={() => setHoveredSkill(null)}
        >
          <div className="text-center">
            <div className={cn("text-4xl mb-2", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
              {skills[2].name}
            </div>
            <div className={cn("w-16 h-1 mx-auto", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
          </div>
        </motion.div>

        {/* Left face */}
        <motion.div
          className={cn(
            "absolute w-full h-full flex items-center justify-center",
            isCyberpunk ? "cyberpunk-card" : "glass-card",
          )}
          style={{
            transform: "rotateY(-90deg) translateZ(8rem)",
            backfaceVisibility: "hidden",
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredSkill(skills[3].name)}
          onHoverEnd={() => setHoveredSkill(null)}
        >
          <div className="text-center">
            <div className={cn("text-4xl mb-2", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
              {skills[3].name}
            </div>
            <div className={cn("w-16 h-1 mx-auto", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
          </div>
        </motion.div>

        {/* Top face */}
        <motion.div
          className={cn(
            "absolute w-full h-full flex items-center justify-center",
            isCyberpunk ? "cyberpunk-card" : "glass-card",
          )}
          style={{
            transform: "rotateX(90deg) translateZ(8rem)",
            backfaceVisibility: "hidden",
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredSkill(skills[4].name)}
          onHoverEnd={() => setHoveredSkill(null)}
        >
          <div className="text-center">
            <div className={cn("text-4xl mb-2", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
              {skills[4].name}
            </div>
            <div className={cn("w-16 h-1 mx-auto", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
          </div>
        </motion.div>

        {/* Bottom face */}
        <motion.div
          className={cn(
            "absolute w-full h-full flex items-center justify-center",
            isCyberpunk ? "cyberpunk-card" : "glass-card",
          )}
          style={{
            transform: "rotateX(-90deg) translateZ(8rem)",
            backfaceVisibility: "hidden",
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredSkill(skills[5].name)}
          onHoverEnd={() => setHoveredSkill(null)}
        >
          <div className="text-center">
            <div className={cn("text-4xl mb-2", isCyberpunk ? "text-cyber-secondary" : "text-accent")}>
              {skills[5].name}
            </div>
            <div className={cn("w-16 h-1 mx-auto", isCyberpunk ? "bg-cyber-primary" : "bg-primary")}></div>
          </div>
        </motion.div>
      </motion.div>

      {hoveredSkill && (
        <div className="absolute bottom-0 left-0 right-0 text-center py-2">
          <div
            className={cn(
              "inline-block px-4 py-2 rounded-full",
              isCyberpunk ? "bg-cyber-primary text-cyber-background" : "bg-primary text-primary-foreground",
            )}
          >
            {hoveredSkill}
          </div>
        </div>
      )}
    </div>
  )
}

