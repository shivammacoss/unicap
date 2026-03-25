import { useEffect, useState } from 'react'
import { 
  Hero, 
  Navigation, 
  Services, 
  Instruments, 
  FundingPlans, 
  Testimonials, 
  Contact, 
  Footer 
} from '../components/home'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Instruments />
      <FundingPlans />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

function WebsiteLandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <HomePage />
    </div>
  )
}

export default WebsiteLandingPage
