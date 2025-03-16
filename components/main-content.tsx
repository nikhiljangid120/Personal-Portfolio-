"use client"

import { useEffect, useState } from "react"
import Header from "./ui/header"
import Hero from "./sections/hero"
import About from "./sections/about"
import Skills from "./sections/skills"
import Projects from "./sections/projects"
import Achievements from "./sections/achievements"
import Resume from "./sections/resume"
import Testimonials from "./sections/testimonials"
import Contact from "./sections/contact"
import Footer from "./ui/footer"
import ThemeSwitcher from "./ui/theme-switcher"
import ParticleBackground from "./ui/particle-background"

export default function MainContent() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Intersection Observer for scroll animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view")
              // Unobserve after animation is triggered
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )

      // Observe elements with animation classes
      document.querySelectorAll(".stagger-item").forEach((el) => {
        observer.observe(el)
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mounted])

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      // Move cursor elements
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`

      cursorOutline.style.left = `${clientX}px`
      cursorOutline.style.top = `${clientY}px`
    }

    const handleMouseDown = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(0.8)"
    }

    const handleMouseUp = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = "1"
      cursorOutline.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = "0"
      cursorOutline.style.opacity = "0"
    }

    // Handle hover effects on interactive elements
    const handleLinkHover = () => {
      cursor.style.width = "0.75rem"
      cursor.style.height = "0.75rem"
      cursor.style.backgroundColor = "var(--vibrant-blue)"

      cursorOutline.style.width = "3rem"
      cursorOutline.style.height = "3rem"
      cursorOutline.style.borderColor = "var(--vibrant-blue)"
    }

    const handleLinkLeave = () => {
      cursor.style.width = "0.5rem"
      cursor.style.height = "0.5rem"
      cursor.style.backgroundColor = "var(--vibrant-pink)"

      cursorOutline.style.width = "2rem"
      cursorOutline.style.height = "2rem"
      cursorOutline.style.borderColor = "var(--vibrant-blue)"
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Add hover effects to interactive elements
    document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      {/* Custom cursor */}
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      {/* Background effects */}
      <ParticleBackground />

      {/* Theme switcher */}
      <ThemeSwitcher />

      {/* Progress indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-vibrant-pink via-vibrant-blue to-vibrant-purple z-50"
        style={{
          width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`,
          transition: "width 0.1s ease-out",
        }}
      ></div>

      {/* Main content */}
      <Header />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Resume />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

