import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

import Preloader from '@/components/Preloader'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Preloader />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />

    </main>
  )
}
