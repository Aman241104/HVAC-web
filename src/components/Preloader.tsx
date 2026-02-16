'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [displayedText, setDisplayedText] = useState("Initializing Core Systems...")

  useGSAP(() => {
    const tl = gsap.timeline({
        onComplete: () => {
             // Fade out and zoom to exit
             gsap.to(containerRef.current, {
                 opacity: 0,
                 scale: 1.1,
                 duration: 0.8,
                 ease: "power2.inOut",
                 onComplete: () => {
                     // Standard cleanup if needed, though component might unmount or stay hidden
                     if (containerRef.current) {
                        containerRef.current.style.display = 'none';
                     }
                 }
             })
        }
    })

    // 1. Counter Animation (0 to 100)
    const counterObj = { value: 0 };
    tl.to(counterObj, {
        value: 100,
        duration: 1.5, // Faster load time
        ease: "power1.inOut",
        onUpdate: () => {
            if (counterRef.current) {
                counterRef.current.textContent = `${Math.round(counterObj.value)}%`;
            }
        }
    })

    // 2. Text Cycling (Parallel with counter)
    tl.to({}, { 
        duration: 0.5, 
        onStart: () => setDisplayedText("Calibrating Sensors...") 
    }, 0.5) 

    tl.to({}, { 
        duration: 0.5, 
        onStart: () => setDisplayedText("System Active.") 
    }, 1.0)

  }, { scope: containerRef })

  return (
    <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center text-blue-500 font-mono"
    >
        {/* Counter */}
        <div ref={counterRef} className="text-8xl md:text-9xl font-bold tracking-tighter mb-4 tabular-nums">
            0%
        </div>

        {/* Status Text */}
        <div ref={textRef} className="text-sm md:text-base uppercase tracking-widest text-blue-400/80 animate-pulse">
            {displayedText}
        </div>

        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ 
                 backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', 
                 backgroundSize: '40px 40px',
                 maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
             }}>
        </div>
    </div>
  )
}
