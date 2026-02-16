'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WhatsAppFloat() {
  const floatRef = useRef<HTMLAnchorElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Pulse animation
    if (pulseRef.current) {
        gsap.to(pulseRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power1.out"
        })
    }

    // Hover effect
    if (floatRef.current) {
        const float = floatRef.current
        
        float.addEventListener('mouseenter', () => {
            gsap.to(float, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" })
        })
        
        float.addEventListener('mouseleave', () => {
            gsap.to(float, { scale: 1, duration: 0.3, ease: "power2.out" })
        })
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Pulse Circle */}
      <div 
        ref={pulseRef}
        className="absolute inset-0 bg-green-500 rounded-full opacity-50 z-[-1]"
      ></div>

      {/* Button */}
      <a
        ref={floatRef}
        href="https://wa.me/919824653242?text=Hello%20VAER%20Team%2C%20I%20am%20interested%20in%20your%20premium%20HVAC%20engineering%20services.%20Can%20we%20schedule%20a%20site%20inspection%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.4)] flex items-center justify-center transition-colors duration-300 relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white/20" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            <span className="font-bold text-sm block">Chat with Engineers</span>
            <span className="text-xs text-slate-500">Typical reply: &lt; 5 mins</span>
             {/* Arrow */}
             <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white rotate-45 -translate-y-1/2"></div>
        </div>
      </a>
    </div>
  )
}
