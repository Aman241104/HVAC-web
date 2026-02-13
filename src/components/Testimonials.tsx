'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Star, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    client: "Ar. Rakesh Gupta",
    site: "Villa 45, Lonavala",
    feedback: "The precision in ducting design was impressive. No noise issues, and the concealed units are invisible."
  },
  {
    client: "Mr. Amit Shah",
    site: "Tech Park Office",
    feedback: "Professional VRF installation. They completed the project 2 days ahead of schedule."
  },
  {
    client: "Mrs. Kapoor",
    site: "Penthouse, Bandra",
    feedback: "Finally an engineering team that understands aesthetics. The linear slot diffusers look perfect."
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean)
    
    gsap.fromTo(cards, 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                Social Proof
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Field Reports
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
                <div 
                    key={index}
                    ref={el => { cardsRef.current[index] = el }}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-default"
                >
                    {/* Header: Technical Look */}
                    <div className="bg-slate-50 p-4 border-b border-slate-100 group-hover:bg-blue-50/30 transition-colors">
                        <div className="font-bold text-slate-900 text-sm">
                            {review.client}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wide">
                            {review.site}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-slate-600 italic leading-relaxed text-sm">
                            &quot;{review.feedback}&quot;
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 pt-0">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-green-600 font-bold bg-green-50 inline-flex px-2 py-1 rounded border border-green-100 uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Install
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  )
}
