"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    name: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js", level: 90, projects: ["E-commerce Dashboard", "Portfolio Website"] },
      { name: "Next.js", level: 85, projects: ["Blog Platform", "Admin Dashboard"] },
      { name: "Tailwind CSS", level: 95, projects: ["Social Media UI", "Landing Page"] },
      { name: "JavaScript", level: 90, projects: ["Interactive Forms", "Data Visualization"] },
      { name: "TypeScript", level: 80, projects: ["Task Management App", "API Client"] },
    ],
  },
  {
    name: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", level: 85, projects: ["RESTful API", "Authentication System"] },
      { name: "Express.js", level: 90, projects: ["E-commerce Backend", "User Management"] },
      { name: "MongoDB", level: 80, projects: ["Product Database", "User Profiles"] },
      { name: "Firebase", level: 75, projects: ["Real-time Chat", "Notifications"] },
      { name: "REST API", level: 85, projects: ["Payment Integration", "Third-party Services"] },
    ],
  },
  {
    name: "languages",
    label: "Languages",
    skills: [
      { name: "JavaScript", level: 90, projects: ["Web Applications", "Browser Extensions"] },
      { name: "TypeScript", level: 80, projects: ["Enterprise Applications", "Libraries"] },
      { name: "C++", level: 85, projects: ["Data Structures", "Algorithms"] },
      { name: "Java", level: 75, projects: ["Android Apps", "Desktop Applications"] },
      { name: "Python", level: 70, projects: ["Data Analysis", "Automation Scripts"] },
    ],
  },
  {
    name: "tools",
    label: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 90, projects: ["Version Control", "Collaboration"] },
      { name: "Docker", level: 70, projects: ["Containerization", "Deployment"] },
      { name: "AWS", level: 65, projects: ["Cloud Hosting", "S3 Storage"] },
      { name: "Linux", level: 75, projects: ["Server Management", "Shell Scripting"] },
      { name: "Problem Solving", level: 95, projects: ["LeetCode", "CodeChef"] },
    ],
  },
]

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [open, setOpen] = useState(false)

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
    setOpen(true)
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="text-sm">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="space-y-6">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass-card p-4"
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{skill.name}</h4>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </motion.div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="glass sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedSkill?.name}</DialogTitle>
            </DialogHeader>
            {selectedSkill && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Proficiency</h4>
                  <Progress value={selectedSkill.level} className="h-2" />
                  <p className="text-right text-sm text-muted-foreground mt-1">{selectedSkill.level}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Related Projects</h4>
                  <ul className="space-y-2">
                    {selectedSkill.projects.map((project, index) => (
                      <li key={index} className="text-sm glass p-2 rounded-md">
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

