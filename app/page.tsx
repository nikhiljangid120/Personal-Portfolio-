import dynamic from "next/dynamic"
import Loader from "@/components/loader"

// Dynamically import components with loading fallbacks
const IntroAnimation = dynamic(() => import("@/components/intro-animation"), {
  loading: () => <Loader />,
})

const MainContent = dynamic(() => import("@/components/main-content"), {
  loading: () => <Loader />,
})

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <IntroAnimation />
      <MainContent />
    </main>
  )
}

