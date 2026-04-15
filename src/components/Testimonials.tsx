'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    name: "Maulin Zaveri",
    image: "https://lh3.googleusercontent.com/a-/ALV-EMisI1r-xI18rQfWvfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv=s120-c-rp-mo-br100",
    feedback: "All type Air conditioning solution at one place with good service",
    rating: 5
  },
  {
    name: "Mayur Dabhi",
    image: "https://lh3.googleusercontent.com/a-/ALV-EMisI1r-xI18rQfWvfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv=s120-c-rp-mo-br100",
    feedback: "Dearler of mitsubishi, Hitachi and Samsung. Done numbers of projects to showcase their exceptional work in the field of hvac",
    rating: 5
  },
  {
    name: "Bhumika Naidu",
    image: "https://lh3.googleusercontent.com/a-/ALV-EMisI1r-xI18rQfWvfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv=s120-c-rp-mo-br100",
    feedback: "Highly recommended with efficient team 👍👍",
    rating: 5
  },
  {
    name: "Viren Soni",
    image: "https://lh3.googleusercontent.com/a-/ALV-EMisI1r-xI18rQfWvfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv=s120-c-rp-mo-br100",
    feedback: "Best service & good staff behavior",
    rating: 5
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean)

    // Main entrance animation
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    })

    // Spotlight effect
    cards.forEach((card) => {
        if (!card) return
        
        const spotlight = card.querySelector('.card-spotlight') as HTMLElement
        
        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            gsap.to(spotlight, {
                opacity: 1,
                x,
                y,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseLeave = () => {
            gsap.to(spotlight, {
                opacity: 0,
                duration: 0.5
            })
        }

        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-24 bg-[#020617] relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.15),transparent_50%)] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            What people say <br className="hidden md:block" />
            <span className="text-blue-500">about our services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We cater to a wide spectrum of clients, delivering exceptional service and solutions tailored to their unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-colors duration-500 flex flex-col items-center text-center shadow-2xl overflow-hidden"
            >
              {/* Card Spotlight */}
              <div className="card-spotlight absolute pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full z-0"></div>

              {/* Quote Icon */}
              <div className="absolute top-6 left-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                <Quote size={40} fill="currentColor" />
              </div>

              {/* Profile Image */}
              <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden mb-8 ring-4 ring-white/5 group-hover:ring-blue-500/30 transition-all duration-500 shadow-xl">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                />
              </div>

              {/* Stars */}
              <div className="relative z-10 flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                ))}
              </div>

              {/* Name */}
              <h3 className="relative z-10 text-xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                {review.name}
              </h3>

              {/* Feedback */}
              <p className="relative z-10 text-slate-300 text-sm leading-relaxed italic mb-4">
                &quot;{review.feedback}&quot;
              </p>

              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-24 flex justify-center">
          <div className="group bg-white/5 border border-white/10 px-8 py-4 rounded-full flex items-center gap-4 backdrop-blur-md hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-default">
            <div className="bg-white p-1 rounded-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <span className="text-white text-sm font-bold">4.9/5 Average Rating</span>
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
