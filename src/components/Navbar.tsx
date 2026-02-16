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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3'
          : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {/* Logo Container - Made much bigger as requested */}
              <div className="relative w-24 h-10 md:w-40 md:h-16 transition-transform duration-500 hover:scale-105">
                <img src="/company_logo.png" alt="VAER HVAC Logo" className="w-full h-full object-contain text-left" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                      ? 'text-blue-700 bg-blue-50 font-bold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-white/50'
                      }`}
                  >
                    {link.name}
                    {/* Active Dot - Floating below text */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                    )}
                  </a>
                )
              })}
            </div>

            {/* Right Side: CTA & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919824653242"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors border border-green-100"
                aria-label="Chat on WhatsApp"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Book Visit
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
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
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '0', paddingTop: '100px' }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 p-8 h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-3xl font-bold transition-colors ${activeSection === link.id ? 'text-blue-600' : 'text-slate-900 hover:text-blue-600'
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
