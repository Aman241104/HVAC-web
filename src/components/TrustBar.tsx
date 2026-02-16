'use client'

import React from 'react'

const brands = [
  { name: 'Daikin', color: '#0097e0' },
  { name: 'Carrier', color: '#004e8e' },
  { name: 'Mitsubishi', color: '#e60012' },
  { name: 'Voltas', color: '#005eb8' },
  { name: 'Blue Star', color: '#0054a6' },
  { name: 'LG', color: '#a50034' },
  { name: 'Hitachi', color: '#e60012' },
  { name: 'O General', color: '#da291c' },
  { name: 'Samsung', color: '#1428a0' },
  { name: 'Panasonic', color: '#004593' },
]

export default function TrustBar() {
  return (
    <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">


      <div className="relative w-full flex overflow-hidden mask-linear-fade">
        {/* Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First Set */}
          {brands.map((brand, index) => (
            <div key={index} className="mx-8 md:mx-12 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default group">
              <span
                className="text-2xl md:text-3xl font-bold text-slate-400 group-hover:text-slate-900 transition-colors tracking-tight"
              >
                {brand.name}
              </span>
            </div>
          ))}
          {/* Duplicate Set for Seamless Loop */}
          {brands.map((brand, index) => (
            <div key={`duplicate-${index}`} className="mx-8 md:mx-12 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default group">
              <span
                className="text-2xl md:text-3xl font-bold text-slate-400 group-hover:text-slate-900 transition-colors tracking-tight"
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  )
}
