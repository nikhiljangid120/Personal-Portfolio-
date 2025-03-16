"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function MagneticButton({ children }) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const x = clientX - centerX
    const y = clientY - centerY

    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = Math.max(width, height) / 2

    if (distance < maxDistance * 1.5) {
      // Scale down the movement based on distance
      const scaleFactor = 0.2
      setPosition({ x: x * scaleFactor, y: y * scaleFactor })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={buttonRef}
      className="magnetic-button"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

