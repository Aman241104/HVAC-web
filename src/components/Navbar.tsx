'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Fan } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled State (Glassmorphism)
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // 2. Reading Progress Bar
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = `${totalScroll / windowHeight}`
      setScrollProgress(Number(scrolled))

      // 3. Scroll Spy Logic
      const sections = ['hero', 'services', 'projects', 'about', 'contact']
      
      // Default to nothing active at very top
      if (window.scrollY < 100) {
        setActiveSection('')
        return
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If top of section is within the top third of viewport, or bottom is still visible
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const elem = document.getElementById(targetId)
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80, // Offset for navbar
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="text-blue-600 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]">
                <Fan className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div className="flex items-center gap-2 select-none">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  VAER
                </span>
                <span className="text-slate-300 font-light text-2xl">|</span>
                <span className="text-2xl font-light text-slate-500">
                  HVAC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative text-sm font-medium transition-colors flex flex-col items-center gap-1 ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900' // Darker default on transparent
                    }`}
                  >
                    {link.name}
                    {/* Active Dot */}
                    <span className={`w-1.5 h-1.5 rounded-full bg-blue-600 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                  </a>
                )
              })}
            </div>

            {/* Right Side: CTA & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Book Site Visit
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-100 ease-out z-50" 
             style={{ width: `${scrollProgress * 100}%` }} 
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', paddingTop: '100px' }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 p-8 h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-3xl font-bold transition-colors ${
                 activeSection === link.id ? 'text-blue-600' : 'text-slate-900 hover:text-blue-600'
              }`}
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold text-center transition-all shadow-lg flex items-center justify-center gap-2 mt-8"
          >
             <Phone className="w-5 h-5" />
             Book Site Visit
          </a>
        </div>
      </div>
    </>
  )
}
