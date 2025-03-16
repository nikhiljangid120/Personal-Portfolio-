"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "./loader"

export default function IntroAnimation() {
  const [loading, setLoading] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // Shorter loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Reduced from 3000

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading && containerRef.current) {
      // Simplified animation sequence
      setTimeout(() => {
        setAnimationComplete(true)
      }, 1500)
    }
  }, [loading])

  if (animationComplete) {
    return null
  }

  return (
    <AnimatePresence>
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text-1 animate-gradient">WELCOME TO</span>
              <br />
              <span className="gradient-text-2 animate-gradient">NIKHIL'S WORLD</span>
            </motion.h1>

            <motion.div
              className="absolute -z-10 inset-0 blur-3xl opacity-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1.5 }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-vibrant-pink via-vibrant-blue to-vibrant-purple rounded-full animate-pulse"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

