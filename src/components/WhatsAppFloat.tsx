'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppFloat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useGSAP(() => {
    // 1. Entrance Animation (Slide in from bottom)
    gsap.from(containerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 2, // Wait for user to get oriented
      ease: 'back.out(1.7)'
    })

    // 2. Continuous Pulse Animation
    gsap.to(buttonRef.current, {
      scale: 1.05,
      boxShadow: '0 20px 25px -5px rgba(22, 163, 74, 0.4), 0 8px 10px -6px rgba(22, 163, 74, 0.4)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

  }, { scope: containerRef })

  // Tooltip Animation
  useGSAP(() => {
    if (isHovered) {
        gsap.to(tooltipRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        })
    } else {
        gsap.to(tooltipRef.current, {
            x: 10,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
        })
    }
  }, [isHovered])

  return (
    <div 
        ref={containerRef} 
        className="fixed bottom-8 right-8 z-50 flex items-center gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div 
        ref={tooltipRef}
        className="bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-100 text-sm font-semibold text-slate-700 opacity-0 translate-x-4 pointer-events-none"
      >
        Chat with an Engineer
      </div>

      {/* Button */}
      <a
        ref={buttonRef}
        href="https://wa.me/916353070793?text=Hi, I have a question about your HVAC services."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-xl shadow-green-500/30 transition-transform active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  )
}
