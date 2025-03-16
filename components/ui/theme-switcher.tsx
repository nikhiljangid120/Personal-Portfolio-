"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          theme === "dark" ? "glass" : theme === "light" ? "bg-white shadow-md" : "cyberpunk-card",
        )}
      >
        {theme === "dark" && <Moon className="h-5 w-5" />}
        {theme === "light" && <Sun className="h-5 w-5" />}
        {theme === "cyberpunk" && <Zap className="h-5 w-5 text-cyber-accent" />}
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            "absolute bottom-16 right-0 p-2 rounded-lg",
            theme === "cyberpunk" ? "cyberpunk-card" : "glass",
          )}
        >
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTheme("light")}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                theme === "light" ? "bg-primary text-white" : "bg-white/10",
              )}
            >
              <Sun className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTheme("dark")}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                theme === "dark" ? "bg-primary text-white" : "bg-black/10",
              )}
            >
              <Moon className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTheme("cyberpunk")}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                theme === "cyberpunk" ? "bg-cyber-primary text-white" : "bg-purple-500/10",
              )}
            >
              <Zap className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

