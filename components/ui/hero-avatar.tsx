"use client"

import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function HeroAvatar() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const avatarRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return

      const { left, top, width, height } = avatarRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      // Calculate normalized position between -1 and 1
      const x = (e.clientX - centerX) / (width / 2)
      const y = (e.clientY - centerY) / (height / 2)

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <div className={isCyberpunk ? "cyberpunk-grid" : "circuit-lines"}></div>

      <motion.div
        ref={avatarRef}
        className="relative w-72 h-72 md:w-96 md:h-96 mx-auto"
        animate={{
          rotateY: mousePosition.x * 10,
          rotateX: -mousePosition.y * 10,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br opacity-20 blur-3xl -z-10 ${
            isCyberpunk ? "from-[#ff0080] to-[#00ffff]" : "from-purple-600 to-accent"
          }`}
        ></div>

        <motion.div
          className={`relative w-full h-full rounded-full overflow-hidden ${
            isCyberpunk ? "cyberpunk-card" : "glass"
          } animate-float`}
          initial={{ scale: 0, rotateY: 0 }}
          animate={{ scale: 1, rotateY: 360 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <img src="/nikhil1.jpg?height=400&width=400" alt="Nikhil Jangid" className="w-full h-full object-cover" />

          {/* Holographic overlay */}
          <div className="absolute inset-0 holographic"></div>

          {/* Scanlines */}
          <div className="absolute inset-0 scanlines opacity-20"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}

