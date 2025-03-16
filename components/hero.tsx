"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import TypewriterComponent from "typewriter-effect"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-2">
            <h2 className="text-accent text-lg font-medium">Hello World! 👋</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              I&apos;m <span className="gradient-text">Nikhil Jangid</span>
            </h1>
            <div className="h-12 flex items-center">
              <TypewriterComponent
                options={{
                  strings: ["MERN Stack Developer", "Problem Solver", "DSA Enthusiast", "Full Stack Developer"],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-xl md:text-2xl font-medium text-muted-foreground",
                  cursorClassName: "text-accent",
                }}
              />
            </div>
          </div>

          <div className="glass p-4 rounded-lg max-w-md">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-muted-foreground">{currentTime}</div>
            </div>
            <div className="font-mono text-sm">
              <span className="text-green-500">nikhil@dev</span>:<span className="text-blue-500">~$</span>{" "}
              <span className="typing-animation">now coding... </span>
              <span className="animate-pulse">▌</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="neon-glow">
              View My Work <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Hire Me <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a
              href="https://github.com/nikhiljangid120"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            {/* Add more social icons here */}
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-accent opacity-20 blur-3xl",
                "animate-pulse",
              )}
            ></div>
            <div className="relative w-full h-full rounded-full overflow-hidden glass animate-float">
              <img
                src="/nikhil1.jpg?height=400&width=400"
                alt="Nikhil Jangid"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}

