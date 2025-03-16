"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const loadingTexts = ["Loading Nikhil's Portfolio...", "Preparing Visual Experience...", "Initializing Interface..."]

export default function Loader() {
  const [loadingText, setLoadingText] = useState(loadingTexts[0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const index = loadingTexts.indexOf(prev)
        const nextIndex = (index + 1) % loadingTexts.length
        return loadingTexts[nextIndex]
      })
    }, 1000)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2 // Faster progress
      })
    }, 40)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative z-10 max-w-md w-full px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <motion.div
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 30, 0, -30, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-full h-full"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold gradient-text-1">NJ</div>
              </div>
              <div className="absolute inset-0 border-4 border-transparent border-t-vibrant-pink border-b-vibrant-blue rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 border-4 border-transparent border-l-vibrant-purple border-r-vibrant-green rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "3s" }}
              ></div>
            </motion.div>
          </div>

          <div className="h-8 mb-4">
            <div className="text-lg font-medium gradient-text-1">{loadingText}</div>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-vibrant-pink to-vibrant-blue"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            ></motion.div>
          </div>

          <div className="mt-2 text-sm text-gray-400">{progress}%</div>
        </motion.div>
      </div>
    </div>
  )
}

