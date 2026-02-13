'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const radarRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Form Panel Slide In (Left)
    gsap.from(formRef.current, {
      x: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    })

    // Info Panel Slide In (Right)
    gsap.from(infoRef.current, {
      x: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    })

    // Radar Animation
    if (radarRef.current) {
        const circles = radarRef.current.querySelectorAll('.radar-circle')
        gsap.to(circles, {
            scale: 2,
            opacity: 0,
            duration: 3,
            stagger: 1,
            repeat: -1,
            ease: 'power1.out'
        })
    }

  }, { scope: containerRef })

  return (
    <section id="contact" ref={containerRef} className="py-24 bg-slate-50 relative overflow-hidden">
      
       {/* Engineering Grid Background */}
       <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{
             backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
           }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 shadow-2xl rounded-3xl overflow-hidden tracking-tight">
          
          {/* Left Side: The Ask (Form) */}
          <div ref={formRef} className="bg-white p-8 md:p-12 lg:p-16 relative z-10">
            <div className="mb-8">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                    Service Command Center
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Ready to Upgrade Your Comfort?
                </h2>
                <p className="text-slate-600">
                Schedule a free site inspection with our engineering team today.
                </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-md ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-md ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Type</label>
                <select 
                  id="service" 
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-md ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all appearance-none text-slate-700"
                >
                  <option value="">Select a Service...</option>
                  <option value="installation">New Installation (VRF/Split)</option>
                  <option value="amc">Annual Maintenance (AMC)</option>
                  <option value="repair">Repair & Service</option>
                  <option value="design">HVAC Design & Consultation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-md ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all resize-none placeholder:text-slate-400"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-900/20 flex items-center justify-center gap-2 group">
                <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                Book Site Visit
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
            </form>
          </div>

          {/* Right Side: The Trust (Info) */}
          <div ref={infoRef} className="bg-slate-950 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
             
             {/* Dynamic Background */}
             <div className="absolute inset-0 opacity-20" 
                  style={{ 
                      backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
                      backgroundSize: '30px 30px' 
                  }}>
             </div>
             
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 border-b border-slate-800 pb-4 inline-block text-slate-200">
                  Contact Information
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 shrink-0 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Call Us (24/7)</p>
                      <a href="tel:+916353070793" className="text-xl font-mono font-semibold hover:text-blue-400 transition-colors">
                        +91 6353070793
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 shrink-0 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Email Us</p>
                      <a href="mailto:contact@vaerhvac.com" className="text-lg font-mono font-semibold hover:text-blue-400 transition-colors">
                        contact@vaerhvac.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 shrink-0 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Headquarters</p>
                      <p className="text-lg font-medium leading-snug text-slate-300">
                        VAER HVAC Solutions,<br/>
                        Navi Mumbai, Maharashtra 400705
                      </p>
                    </div>
                  </div>
                </div>
             </div>

             {/* Radar Map */}
             <div ref={radarRef} className="mt-12 bg-slate-900/50 border border-slate-800 rounded-2xl h-56 w-full flex items-center justify-center relative overflow-hidden group">
                
                {/* Radar Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full radar-circle opacity-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full radar-circle opacity-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full radar-circle opacity-0"></div>

                <div className="text-center z-10 relative">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-3 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
                  <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-1">Service Coverage</p>
                  <p className="text-white font-bold text-sm">Mumbai & Navi Mumbai</p>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-10" 
                    style={{ 
                        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
                        backgroundSize: '20px 20px',
                        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                    }}>
                </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  )
}
