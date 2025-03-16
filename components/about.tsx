"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Database, Globe } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate MERN stack developer and problem solver from Jaipur, Rajasthan
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-accent/20 blur-xl opacity-50"></div>
            <div className="glass-card overflow-hidden relative aspect-square">
              <img
                src="/nikhil1.jpg?height=600&width=600"
                alt="Nikhil Jangid"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">3rd Year B.Tech CSE Student</h3>
            <p className="text-muted-foreground">
              I'm Nikhil Jangid, a passionate MERN Stack Developer and problem solver from Jaipur, Rajasthan. Currently
              pursuing my B.Tech in Computer Science Engineering, I specialize in building scalable web applications and
              solving algorithmic challenges.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-accent">📌</span>
                <span>Jaipur, Rajasthan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">🎓</span>
                <span>B.Tech CSE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">🚀</span>
                <span>MERN Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">🎯</span>
                <span>DSA Enthusiast</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-4 flex flex-col items-center text-center"
              >
                <Globe className="h-8 w-8 text-accent mb-2" />
                <h4 className="font-medium">Web Dev</h4>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-4 flex flex-col items-center text-center"
              >
                <Code className="h-8 w-8 text-accent mb-2" />
                <h4 className="font-medium">DSA</h4>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-4 flex flex-col items-center text-center"
              >
                <Database className="h-8 w-8 text-accent mb-2" />
                <h4 className="font-medium">Databases</h4>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-4 flex flex-col items-center text-center"
              >
                <Cpu className="h-8 w-8 text-accent mb-2" />
                <h4 className="font-medium">Problem Solving</h4>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

