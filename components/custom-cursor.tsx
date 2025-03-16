"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true))
        el.addEventListener("mouseout", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()
    setHidden(false)

    return () => {
      removeEventListeners()
    }
  }, [])

  const cursorClasses = `cursor-dot ${hidden ? "opacity-0" : "opacity-100"} ${
    clicked ? "scale-75" : ""
  } ${linkHovered ? "scale-150" : ""}`

  const cursorOutlineClasses = `cursor-outline ${hidden ? "opacity-0" : "opacity-100"} ${
    clicked ? "scale-75" : ""
  } ${linkHovered ? "scale-150" : ""}`

  return (
    <>
      <div className={cursorClasses} style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      <div
        className={cursorOutlineClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition:
            "transform 0.15s ease-out, left 0.1s ease-out, top 0.1s ease-out, width 0.15s ease-out, height 0.15s ease-out",
        }}
      />
    </>
  )
}

