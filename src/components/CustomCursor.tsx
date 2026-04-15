'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null) // The Aura/Glow
  const coreRef = useRef<HTMLDivElement>(null)   // The Core Dot
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cursorRef.current || !coreRef.current) return

    // 1. Setup QuickSetters for high-performance movement
    // The Aura has a slight duration for that "smooth follow" effect
    const xToAura = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3.out" })
    const yToAura = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3.out" })
    
    // The Core is instant for precision
    const xToCore = gsap.quickTo(coreRef.current, "x", { duration: 0.05, ease: "none" })
    const yToCore = gsap.quickTo(coreRef.current, "y", { duration: 0.05, ease: "none" })

    // 2. Movement Listener
    const moveCursor = (e: MouseEvent) => {
      xToAura(e.clientX)
      yToAura(e.clientY)
      
      xToCore(e.clientX)
      yToCore(e.clientY)
    }

    // 3. Hover & Click Animations using GSAP instead of CSS/State
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest('a') || target.closest('button') || target.classList.contains('cursor-hover')
      
      if (isLink) {
        gsap.to(cursorRef.current, {
          width: 100,
          height: 100,
          backgroundColor: 'rgba(59, 130, 246, 0.15)', // blue-500/15
          filter: 'blur(24px)',
          duration: 0.4,
          ease: "power2.out"
        })
        gsap.to(coreRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3
        })
      } else {
        gsap.to(cursorRef.current, {
          width: 32,
          height: 32,
          backgroundColor: 'rgba(59, 130, 246, 0.4)', // blue-500/40
          filter: 'blur(12px)',
          duration: 0.4,
          ease: "power2.out"
        })
        gsap.to(coreRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3
        })
      }
    }

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 0.8, duration: 0.2 })
    }
    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[10000] hidden md:block overflow-hidden">
      
      {/* The Aura (Smooth follow glow) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-8 h-8 bg-blue-500/40 blur-md"
        style={{ willChange: 'transform, width, height' }}
      />

      {/* The Core (Precise point) */}
      <div 
        ref={coreRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full pointer-events-none"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
