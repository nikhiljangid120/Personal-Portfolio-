"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"

export default function Resume() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card p-8 text-center"
        >
          <div className="mb-6">
            <FileText className="h-16 w-16 mx-auto text-accent mb-4" />
            <h2 className="text-3xl font-bold mb-2">
              My <span className="gradient-text">Resume</span>
            </h2>
            <p className="text-muted-foreground">
              Download my resume to get a comprehensive overview of my skills, experience, and qualifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="glass border-0">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold gradient-text">3+</p>
                <p className="text-sm text-muted-foreground">Years of Experience</p>
              </CardContent>
            </Card>
            <Card className="glass border-0">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold gradient-text">20+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            <Card className="glass border-0">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold gradient-text">10+</p>
                <p className="text-sm text-muted-foreground">Technologies Mastered</p>
              </CardContent>
            </Card>
          </div>

          <Button size="lg" className="neon-glow">
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </Button>

          <div className="mt-6 text-sm text-muted-foreground">
            <p>Last updated: March 2025</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

