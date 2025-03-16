"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    company: "TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    text: "Nikhil is an exceptional developer who consistently delivers high-quality code. His problem-solving skills and attention to detail make him stand out from others. I would highly recommend him for any web development project.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "CTO",
    company: "StartupX",
    image: "/placeholder.svg?height=100&width=100",
    text: "Working with Nikhil was a pleasure. He quickly understood our requirements and delivered a solution that exceeded our expectations. His technical knowledge and communication skills are top-notch.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Lead Developer",
    company: "InnovateTech",
    image: "/placeholder.svg?height=100&width=100",
    text: "Nikhil's contributions to our open-source project were invaluable. He not only fixed critical bugs but also implemented new features that improved the overall user experience. A truly talented developer!",
  },
]

export default function Testimonials() {
  const { theme } = useTheme()
  const isCyberpunk = theme === "cyberpunk"
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section ref={containerRef} className="scroll-snap-section py-20 relative min-h-screen flex items-center">
      <motion.div style={{ opacity }} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            Client <span className={isCyberpunk ? "cyberpunk-text" : "gradient-text"}>Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">What people say about working with me</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className={cn("border-0", isCyberpunk ? "cyberpunk-card" : "glass-card")}>
                    <CardContent className="p-6 md:p-8">
                      <Quote
                        className={cn("h-10 w-10 mb-4", isCyberpunk ? "text-cyber-secondary/50" : "text-accent/50")}
                      />
                      <p className="text-lg mb-6 italic">{testimonial.text}</p>
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full overflow-hidden mr-4",
                            isCyberpunk && "border border-cyber-primary",
                          )}
                        >
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === current ? (isCyberpunk ? "bg-cyber-primary" : "bg-accent") : "bg-muted",
                )}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full rounded-full",
              isCyberpunk ? "cyberpunk-card" : "glass",
            )}
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full rounded-full",
              isCyberpunk ? "cyberpunk-card" : "glass",
            )}
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

