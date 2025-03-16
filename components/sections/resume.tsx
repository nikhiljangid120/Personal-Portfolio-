"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import MagneticButton from "../ui/magnetic-button"

export default function Resume() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="scroll-snap-section py-20 relative min-h-screen flex items-center">
      <motion.div style={{ opacity }} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={cn("max-w-3xl mx-auto p-8 text-center", isCyberpunk ? "cyberpunk-card" : "glass-card")}
        >
          <div className="mb-6">
            <FileText className={cn("h-16 w-16 mx-auto mb-4", isCyberpunk ? "text-cyber-secondary" : "text-accent")} />
            <h2 className="text-3xl font-bold mb-2">
              My <span className={isCyberpunk ? "cyberpunk-text" : "gradient-text"}>Resume</span>
            </h2>
            <p className="text-muted-foreground">
              Download my resume to get a comprehensive overview of my skills, experience, and qualifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className={cn("border-0", isCyberpunk ? "cyberpunk-card" : "glass")}>
              <CardContent className="p-4 text-center">
                <p className={cn("text-2xl font-bold", isCyberpunk ? "cyberpunk-text" : "gradient-text")}>3+</p>
                <p className="text-sm text-muted-foreground">Years of Experience</p>
              </CardContent>
            </Card>
            <Card className={cn("border-0", isCyberpunk ? "cyberpunk-card" : "glass")}>
              <CardContent className="p-4 text-center">
                <p className={cn("text-2xl font-bold", isCyberpunk ? "cyberpunk-text" : "gradient-text")}>20+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            <Card className={cn("border-0", isCyberpunk ? "cyberpunk-card" : "glass")}>
              <CardContent className="p-4 text-center">
                <p className={cn("text-2xl font-bold", isCyberpunk ? "cyberpunk-text" : "gradient-text")}>10+</p>
                <p className="text-sm text-muted-foreground">Technologies Mastered</p>
              </CardContent>
            </Card>
          </div>

          <MagneticButton>
            {isCyberpunk ? (
              <button className="cyberpunk-btn">
                <span>
                  <Download className="mr-2 h-4 w-4 inline" /> Download Resume
                </span>
              </button>
            ) : (
              <Button size="lg" className="neon-glow">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            )}
          </MagneticButton>

          <div className="mt-6 text-sm text-muted-foreground">
            <p>Last updated: March 2025</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

