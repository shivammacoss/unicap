import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import MarketTicker from './sections/MarketTicker';
import About from './sections/About';
import Forex from './sections/Forex';
import Funding from './sections/Funding';
import IBProgram from './sections/IBProgram';
import CopyTrading from './sections/CopyTrading';
import Security from './sections/Security';
import WhyChoose from './sections/WhyChoose';
import ClientJourney from './sections/ClientJourney';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StandardAccountPage from './pages/StandardAccountPage';
import ProAccountPage from './pages/ProAccountPage';
import EcnAccountPage from './pages/EcnAccountPage';
import StarterFundPage from './pages/funding/StarterFundPage';
import GrowthFundPage from './pages/funding/GrowthFundPage';
import ProFundPage from './pages/funding/ProFundPage';
import EliteFundPage from './pages/funding/EliteFundPage';
import PrimeFundPage from './pages/funding/PrimeFundPage';
import CustomPlanPage from './pages/funding/CustomPlanPage';
import ExclusivePlanPage from './pages/funding/ExclusivePlanPage';
import IBProgramPage from './pages/IBProgramPage';
import CopyTradingPage from './pages/CopyTradingPage';
import FundingsPage from './pages/FundingsPage';

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

function App() {
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
    const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts/standard" element={<StandardAccountPage />} />
        <Route path="/accounts/pro" element={<ProAccountPage />} />
        <Route path="/accounts/ecn" element={<EcnAccountPage />} />
        <Route path="/funding/starter" element={<StarterFundPage />} />
        <Route path="/funding/growth" element={<GrowthFundPage />} />
        <Route path="/funding/pro" element={<ProFundPage />} />
        <Route path="/funding/elite" element={<EliteFundPage />} />
        <Route path="/funding/prime" element={<PrimeFundPage />} />
        <Route path="/funding/custom" element={<CustomPlanPage />} />
        <Route path="/funding/exclusive" element={<ExclusivePlanPage />} />
        <Route path="/ib-program" element={<IBProgramPage />} />
        <Route path="/copy-trading" element={<CopyTradingPage />} />
        <Route path="/fundings" element={<FundingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
