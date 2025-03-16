"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export const Analytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()

    // Here you would typically integrate with a real analytics provider like Google Analytics, Plausible, etc.
    // For this example, we'll just log the page view to the console.
    console.log("PageView", url)
  }, [pathname, searchParams])

  return null
}

