import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '../website/src/sections/Navigation';
import Hero from '../website/src/sections/Hero';
import MarketTicker from '../website/src/sections/MarketTicker';
import About from '../website/src/sections/About';
import Forex from '../website/src/sections/Forex';
import Funding from '../website/src/sections/Funding';
import IBProgram from '../website/src/sections/IBProgram';
import CopyTrading from '../website/src/sections/CopyTrading';
import Security from '../website/src/sections/Security';
import WhyChoose from '../website/src/sections/WhyChoose';
import ClientJourney from '../website/src/sections/ClientJourney';
import Contact from '../website/src/sections/Contact';
import Footer from '../website/src/sections/Footer';

function HomePage() {
  return (
    <>
      <Hero />
      <MarketTicker />
      <About />
      <Forex />
      <Funding />
      <IBProgram />
      <CopyTrading />
      <Security />
      <WhyChoose />
      <ClientJourney />
      <Contact />
      <Footer />
    </>
  );
}

function WebsiteLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      requestAnimationFrame(() => {
        const target = document.querySelector(scrollTarget);
        if (target) {
          const offset = window.innerWidth < 1024 ? 80 : 100;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-bluestone-dark text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <HomePage />
    </div>
  );
}

export default WebsiteLandingPage;
