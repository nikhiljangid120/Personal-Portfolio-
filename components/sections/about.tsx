"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion"
import { Code, Cpu, Database, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import AboutTimeline from "../ui/about-timeline"
import * as THREE from 'three'

export default function About() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  // Enhanced scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smoother animations with springs
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const y1 = useTransform(smoothProgress, [0, 1], [200, -200])
  const y2 = useTransform(smoothProgress, [0, 1], [100, -300])
  const rotate = useTransform(smoothProgress, [0, 1], [0, 10])
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.05, 0.95])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Mouse parallax effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // 3D effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return
      
      const rect = imageRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      x.set((e.clientX - centerX) / 10)
      y.set((e.clientY - centerY) / 10)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  // Cards animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  }

  const cards = [
    { icon: Globe, title: "Web Dev" },
    { icon: Code, title: "DSA" },
    { icon: Database, title: "Databases" },
    { icon: Cpu, title: "Problem Solving" }
  ]

  return (
    <section
      id="about"
      ref={containerRef}
      className="scroll-snap-section py-32 relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background/0 z-0"></div>
      <div className={`absolute inset-0 opacity-10 ${isCyberpunk ? 'cyberpunk-grid' : 'light-grid'}`}></div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About <span className={isCyberpunk ? "cyberpunk-text" : "gradient-text"}>Me</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A passionate MERN stack developer and problem solver from Jaipur, Rajasthan
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            style={{ y: y1, opacity, scale }}
            className="relative"
          >
            {/* Dynamic glow effect */}
            <motion.div
              style={{ rotate }}
              className={cn(
                "absolute -inset-8 rounded-2xl blur-xl opacity-60 transition-all duration-300",
                isCyberpunk
                  ? "bg-gradient-to-r from-[#ff0080]/30 to-[#00ffff]/30"
                  : "bg-gradient-to-r from-purple-500/30 to-accent/30",
              )}
            ></motion.div>
            
            {/* 3D image card */}
            <motion.div
              ref={imageRef}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "overflow-hidden relative aspect-square transform-gpu", 
                isCyberpunk ? "cyberpunk-card" : "glass-card"
              )}
            >
              {/* Image with parallax effect */}
              <motion.img
                src="/nikhil1.jpg?height=800&width=800"
                alt="Nikhil Jangid"
                style={{
                  scale: 1.1,
                  x: useTransform(x, [-100, 100], [-10, 10]),
                  y: useTransform(y, [-100, 100], [-10, 10]),
                }}
                className="w-full h-full object-cover"
              />

              {/* Enhanced holographic overlay */}
              <div className="absolute inset-0 holographic mix-blend-overlay"></div>

              {/* Scanlines with animation */}
              <div className="absolute inset-0 scanlines animate-scan opacity-20"></div>
              
              {/* Subtle border glow */}
              <div className={`absolute inset-0 border-2 rounded-md ${isCyberpunk ? 'border-cyan-400/20' : 'border-accent/20'} 
                transform-gpu pointer-events-none`}></div>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }} 
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AboutTimeline />
            </motion.div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: isCyberpunk 
                      ? "0 0 20px rgba(0, 255, 255, 0.3)" 
                      : "0 10px 25px rgba(120, 60, 200, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={cn(
                    "p-6 flex flex-col items-center text-center transform-gpu",
                    isCyberpunk ? "cyberpunk-card backdrop-blur-md" : "glass-card backdrop-blur-md",
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                  >
                    <card.icon className={cn("h-10 w-10 mb-3", isCyberpunk ? "text-cyber-secondary" : "text-accent")} />
                  </motion.div>
                  <h4 className="font-medium text-lg">{card.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none particles-container"></div>
    </section>
  )
}