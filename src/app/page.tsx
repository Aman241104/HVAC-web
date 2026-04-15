import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import About from '@/components/About'
import CTASection from '@/components/CTASection'
import Services from '@/components/Services'
import ProjectTypeSection from '@/components/ProjectTypeSection'
import Projects from '@/components/Projects'
import Clientele from '@/components/Clientele'
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
      <CTASection />
      <Services />
      <ProjectTypeSection />
      <Projects />
      <Clientele />
      <Testimonials />
      <Contact />

    </main>
  )
}
