'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null) // The Aura
  const coreRef = useRef<HTMLDivElement>(null)   // The Core Dot
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useGSAP(() => {
    // 1. Setup QuickSetters for performance
    const xToAura = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" })
    const yToAura = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" })
    
    const xToCore = gsap.quickTo(coreRef.current, "x", { duration: 0, ease: "none" }) // Instant
    const yToCore = gsap.quickTo(coreRef.current, "y", { duration: 0, ease: "none" }) // Instant

    // 2. Movement Listener
    const moveCursor = (e: MouseEvent) => {
      xToAura(e.clientX)
      yToAura(e.clientY)
      
      xToCore(e.clientX)
      yToCore(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, { scope: cursorRef })

  useEffect(() => {
    // 3. Hover Listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block overflow-hidden">
      
      {/* The Aura (Lagging, Blurred) */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 ease-out 
          ${isHovering ? 'w-[80px] h-[80px] bg-blue-400/20 blur-xl' : 'w-8 h-8 bg-blue-400/40 blur-md'}
          ${isClicking ? 'scale-75' : 'scale-100'}
        `}
      />

      {/* The Core (Instant, Precise) */}
      <div 
        ref={coreRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full pointer-events-none transition-all duration-300
           ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `}
      />
    </div>
  )
}
