"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Dev" },
  { id: "dsa", label: "DSA" },
  { id: "open-source", label: "Open Source" },
]

const projects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A full-stack e-commerce dashboard with admin controls, analytics, and inventory management.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "web",
  },
  {
    id: 2,
    title: "Algorithm Visualizer",
    description:
      "Interactive tool to visualize various sorting and pathfinding algorithms with step-by-step explanation.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["JavaScript", "Data Structures", "Algorithms"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "dsa",
  },
  {
    id: 3,
    title: "Open Source Library",
    description: "A utility library for React components with 500+ stars on GitHub and 10+ contributors.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "TypeScript", "Open Source"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "open-source",
  },
  {
    id: 4,
    title: "Social Media App",
    description: "A full-stack social media application with real-time chat, notifications, and content sharing.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "web",
  },
  {
    id: 5,
    title: "LeetCode Solutions",
    description:
      "A collection of 200+ LeetCode problems solved with detailed explanations and time complexity analysis.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["C++", "Java", "Algorithms", "Data Structures"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "dsa",
  },
  {
    id: 6,
    title: "Hacktoberfest Contributions",
    description:
      "Multiple contributions to open source projects during Hacktoberfest, including bug fixes and feature additions.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Open Source", "JavaScript", "Python"],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    category: "open-source",
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, personal projects, and contributions
          </p>
        </motion.div>

        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full max-w-5xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {projectCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative h-[400px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <Card className="h-full glass-card overflow-hidden border-0">
          <div className="h-48 overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary/50">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="bg-secondary/50">
                +{project.tags.length - 3}
              </Badge>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6 }}
        style={{ backfaceVisibility: "hidden", rotateY: -180 }}
      >
        <Card className="h-full glass-card border-0 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Demo
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Code
              </a>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

