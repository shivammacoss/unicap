import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

// Animated Globe Component
function AnimatedGlobe() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Globe SVG */}
      <div className="relative w-[800px] h-[800px] animate-globe opacity-20">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Outer sphere */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" opacity="0.25" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" opacity="0.2" />
          
          {/* Latitude lines */}
          {[...Array(9)].map((_, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="200"
              cy="200"
              rx={180 * Math.cos((i - 4) * 0.35)}
              ry={40}
              fill="none"
              stroke="url(#globeGradient)"
              strokeWidth="0.3"
              opacity={0.15}
            />
          ))}
          
          {/* Longitude lines */}
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={`long-${i}`}
              cx="200"
              cy="200"
              rx="180"
              ry="180"
              fill="none"
              stroke="url(#globeGradient)"
              strokeWidth="0.3"
              opacity={0.15}
              transform={`rotate(${i * 15} 200 200)`}
            />
          ))}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5FAED6" />
              <stop offset="50%" stopColor="#3E90C2" />
              <stop offset="100%" stopColor="#2F7FB5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// Trading Chart Lines Component
function TradingChartLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Chart Line 1 */}
      <div className="absolute top-1/4 left-0 w-full chart-line chart-line-delay-1">
        <svg className="w-full h-8" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path
            d="M0,20 Q100,15 200,18 T400,12 Q500,8 600,15 T800,10 Q900,5 1000,12 T1200,8"
            fill="none"
            stroke="url(#chartGradient1)"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="chartGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#3E90C2" />
              <stop offset="80%" stopColor="#3E90C2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Chart Line 2 */}
      <div className="absolute top-1/2 left-0 w-full chart-line chart-line-delay-2">
        <svg className="w-full h-8" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path
            d="M0,15 Q150,20 300,12 T500,18 Q650,10 800,15 T1000,8 Q1100,12 1200,10"
            fill="none"
            stroke="url(#chartGradient2)"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#5FAED6" />
              <stop offset="80%" stopColor="#5FAED6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Chart Line 3 */}
      <div className="absolute top-3/4 left-0 w-full chart-line chart-line-delay-3">
        <svg className="w-full h-8" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path
            d="M0,10 Q200,18 400,8 T700,15 Q900,5 1000,12 T1200,8"
            fill="none"
            stroke="url(#chartGradient3)"
            strokeWidth="1.5"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="chartGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#CFAF63" />
              <stop offset="80%" stopColor="#CFAF63" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bluestone-dark" />
      </div>

      {/* Animated Globe */}
      <AnimatedGlobe />

      {/* Trading Chart Lines */}
      <TradingChartLines />


      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-20 text-center">
        {/* Headline */}
        <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          <span
            className={`block opacity-0 ${isLoaded ? 'animate-fade-up' : ''}`}
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            Trade Smarter. Fund Faster.
          </span>
          <span
            className={`block text-gradient opacity-0 ${isLoaded ? 'animate-fade-up' : ''}`}
            style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}
          >
            Grow Globally.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 opacity-0 ${
            isLoaded ? 'animate-fade-up' : ''
          }`}
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          A complete trading ecosystem offering Forex access, capital funding, IB partnership, and advanced copy trading — all under one trusted platform.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 ${
            isLoaded ? 'animate-fade-up' : ''
          }`}
          style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
        >
          <button
            onClick={() => navigate('/user/login')}
            className="btn-primary flex items-center gap-2 group animate-pulse-glow"
          >
            Start Trading
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
          </button>
          <button
            onClick={() => scrollToSection('#funding')}
            className="btn-secondary flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-400">
              <Play className="w-4 h-4 fill-white" />
            </div>
            Apply For Funding
          </button>
        </div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bluestone-dark to-transparent z-20" />
    </section>
  );
}
