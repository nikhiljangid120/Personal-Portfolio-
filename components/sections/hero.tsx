"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import TypewriterComponent from "typewriter-effect"

export default function Hero() {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Force scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Parallax effect for hero elements
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    // Calculate mouse position relative to container center
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);

    // Apply parallax effect to elements
    const elements = containerRef.current.querySelectorAll(".parallax");
    elements.forEach((el) => {
      const speed = el.dataset.speed || 1;
      const xOffset = x * speed * 10;
      const yOffset = y * speed * 10;
      el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  };

  // Video hover effects
  const handleVideoHover = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Speed up the video on hover
    }
  };

  const handleVideoLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // Return to normal speed
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-vibrant-purple/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-vibrant-blue/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-vibrant-pink/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              className="inline-block mb-2 px-4 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="text-vibrant-blue">Hello World! 👋</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 parallax"
              data-speed="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I'm <span className="gradient-text-1 animate-gradient">Nikhil Jangid</span>
            </motion.h1>

            <motion.div
              className="h-12 mb-6 parallax"
              data-speed="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TypewriterComponent
                options={{
                  strings: ["MERN Stack Developer", "Problem Solver", "DSA Enthusiast", "Full Stack Developer"],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-xl md:text-2xl font-medium text-gray-300",
                  cursorClassName: "text-vibrant-blue",
                }}
              />
            </motion.div>

            <motion.p
              className="text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8 parallax"
              data-speed="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Passionate about creating elegant solutions to complex problems. Specializing in modern web technologies
              and full-stack development.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start parallax"
              data-speed="1.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a href="https://www.github.com/nikhiljangid120" target="_blank" className="modern-button">
                View My Work <ArrowDown className="ml-2 h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/nikhil-jangid-b84360264/" target="_blank" className="modern-button-2">
                Hire Me <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Enhanced Hero video with gooey and cinematic effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div 
              className="relative w-72 h-72 md:w-96 md:h-96"
              onMouseEnter={handleVideoHover}
              onMouseLeave={handleVideoLeave}
            >
              {/* Animated background elements with gooey effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-vibrant-pink to-vibrant-blue opacity-20 blur-3xl animate-pulse"></div>
              
              {/* Gooey blobs that move with mouse */}
              <motion.div 
                className="absolute w-32 h-32 rounded-full bg-vibrant-blue/30 blur-xl"
                animate={{
                  x: isHovered ? [0, 30, -30, 0] : 0,
                  y: isHovered ? [0, -30, 30, 0] : 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute w-24 h-24 rounded-full bg-vibrant-pink/30 blur-xl"
                animate={{
                  x: isHovered ? [0, -20, 20, 0] : 0,
                  y: isHovered ? [0, 20, -20, 0] : 0,
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>

              {/* Animated rings that appear on hover */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-vibrant-blue/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? [1, 1.1, 1] : 1, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  repeatType: "reverse",
                }}
              ></motion.div>

              {/* Video container with glass and gooey effect */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden glass animate-float"
                animate={{
                  filter: isHovered ? "contrast(120%) brightness(110%)" : "contrast(100%) brightness(100%)",
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  boxShadow: isHovered ? 
                    "0 0 40px 5px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)" : 
                    "0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 mix-blend-screen"></div>
                
                {/* Cinematic vignette effect that intensifies on hover */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500"
                  style={{ opacity: isHovered ? 0.7 : 0.3 }}
                ></div>

                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{ 
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    filter: isHovered ? "saturate(1.2)" : "saturate(1)",
                  }}
                >
                  <source src="/video.mp4" type="video/mp4" />
                  {/* Fallback to image if video doesn't load */}
                  <img
                    src="/nikhil1.jpg?height=400&width=400"
                    alt="Nikhil Jangid"
                    className="w-full h-full object-cover"
                  />
                </video>

                {/* Cinematic scan lines effect */}
                <div 
                  className="absolute inset-0 bg-scanlines opacity-20"
                  style={{ 
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)",
                    opacity: isHovered ? 0.3 : 0.1,
                  }}
                ></div>

                {/* Color grading overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-vibrant-pink/10 to-vibrant-blue/10 mix-blend-overlay"></div>
              </motion.div>

              {/* Enhanced floating badges with gooey effects */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full glass neon-glow-pink"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  x: isHovered ? [0, 5, 0] : 0,
                }}
                transition={{ 
                  duration: isHovered ? 2 : 0.4, 
                  delay: 0.8,
                  repeat: isHovered ? Infinity : 0
                }}
              >
                <span className="text-sm font-medium">React</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full glass neon-glow-blue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  x: isHovered ? [0, -5, 0] : 0,
                }}
                transition={{ 
                  duration: isHovered ? 2 : 0.4, 
                  delay: 1,
                  repeat: isHovered ? Infinity : 0
                }}
              >
                <span className="text-sm font-medium">Node.js</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 px-4 py-2 rounded-full glass neon-glow-purple"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: isHovered ? [0, 5, 0] : 0,
                }}
                transition={{ 
                  duration: isHovered ? 2 : 0.4, 
                  delay: 1.2,
                  repeat: isHovered ? Infinity : 0
                }}
              >
                <span className="text-sm font-medium">MongoDB</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <ArrowDown className="h-6 w-6 text-vibrant-blue" />
      </motion.div>
    </section>
  )
}