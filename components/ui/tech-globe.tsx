"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#68A063" },
  { name: "MongoDB", color: "#4DB33D" },
  { name: "Express", color: "#000000" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Next.js", color: "#000000" },
  { name: "Tailwind", color: "#38B2AC" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "Git", color: "#F05032" },
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
]

export default function TechGlobe() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = (canvas.width = 400)
    const height = (canvas.height = 400)
    const centerX = width / 2
    const centerY = height / 2
    const radius = 150

    // Create nodes
    const nodes = technologies.map((tech, i) => {
      const angle = (i / technologies.length) * Math.PI * 2
      const depth = Math.random() * 0.5 + 0.5

      return {
        name: tech.name,
        color: tech.color,
        x: 0,
        y: 0,
        z: 0,
        angle: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: angle,
        },
        depth,
      }
    })

    let animationId
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      ctx.beginPath()
      ctx.strokeStyle = isCyberpunk ? "rgba(0, 255, 255, 0.1)" : "rgba(139, 92, 246, 0.1)"

      // Reduce connection lines for better performance
      for (let i = 0; i < nodes.length; i += 2) {
        for (let j = i + 2; j < nodes.length; j += 2) {
          const node1 = nodes[i]
          const node2 = nodes[j]

          if (node1.z > 0 && node2.z > 0) {
            ctx.moveTo(node1.x + centerX, node1.y + centerY)
            ctx.lineTo(node2.x + centerX, node2.y + centerY)
          }
        }
      }

      ctx.stroke()

      // Update and draw nodes
      rotation += 0.003 // Reduced from 0.005

      nodes.forEach((node) => {
        // Calculate 3D position
        const theta = node.angle.z + rotation
        const phi = node.angle.y + rotation / 2

        node.x = radius * Math.sin(phi) * Math.cos(theta) * node.depth
        node.y = radius * Math.sin(phi) * Math.sin(theta) * node.depth
        node.z = radius * Math.cos(phi) * node.depth

        // Only draw if in front
        if (node.z > 0) {
          const size = (node.z / radius) * 15 + 5 // Reduced from 20+5

          // Draw node
          ctx.beginPath()
          ctx.fillStyle = isCyberpunk
            ? ["#ff0080", "#00ffff", "#ffff00", "#9900ff", "#00ff66"][Math.floor(Math.random() * 5)]
            : node.color
          ctx.arc(node.x + centerX, node.y + centerY, size, 0, Math.PI * 2)
          ctx.fill()

          // Draw label
          ctx.fillStyle = isCyberpunk ? "#00ffff" : "#ffffff"
          ctx.font = `${Math.floor(size)}px Arial`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(node.name, node.x + centerX, node.y + centerY + size + 10)
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isCyberpunk])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <canvas ref={canvasRef} width={400} height={400} className="mx-auto" />

        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-20 blur-3xl -z-10",
            isCyberpunk
              ? "bg-gradient-to-br from-[#ff0080] to-[#00ffff]"
              : "bg-gradient-to-br from-purple-600 to-accent",
          )}
        ></div>
      </motion.div>
    </div>
  )
}

