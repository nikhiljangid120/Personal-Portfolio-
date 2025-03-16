"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let animationFrameId
    let particles = []

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    // Create particles
    const createParticles = () => {
      particles = []
      // Reduce particle count for better performance
      const particleCount = Math.min(Math.floor(window.innerWidth / 30), 30)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5, // Smaller particles
          color: getParticleColor(i),
          speedX: Math.random() * 0.2 - 0.1, // Slower movement
          speedY: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    // Get vibrant colors for particles
    const getParticleColor = (index) => {
      const colors = [
        "rgba(255, 42, 109, 0.8)", // Pink
        "rgba(0, 247, 255, 0.8)", // Blue
        "rgba(211, 0, 197, 0.8)", // Purple
        "rgba(255, 231, 0, 0.8)", // Yellow
        "rgba(5, 255, 161, 0.8)", // Green
      ]
      return colors[index % colors.length]
    }

    // Animation loop
    const animate = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles with lines (only to nearby particles)
        // Only check every 3rd particle for better performance
        if (i % 3 === 0) {
          for (let j = i + 3; j < particles.length; j += 3) {
            const dx = particle.x - particles[j].x
            const dy = particle.y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Only connect if close enough
            if (distance < 100) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

