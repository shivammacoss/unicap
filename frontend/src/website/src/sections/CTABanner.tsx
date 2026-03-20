import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-purple-600/20 animate-gradient-mesh" />
      <div className="absolute inset-0 bg-gradient-to-b from-bluestone-dark via-transparent to-bluestone-dark" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2
          className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          Ready to Start{' '}
          <span className="text-gradient">Trading?</span>
        </h2>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Join 500,000+ traders who have chosen Bluestone as their trusted broker. 
          Open your account in minutes and start trading today.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <button
            onClick={() => scrollToSection('#accounts')}
            className="btn-primary flex items-center gap-2 group animate-pulse-glow"
          >
            Open Live Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
          </button>
          <button className="btn-secondary flex items-center gap-2 group">
            <MessageCircle className="w-5 h-5" />
            Contact Sales Team
          </button>
        </div>

        {/* Trust Badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flex items-center gap-2 text-white/50">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm">Instant Account Opening</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="text-sm">No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
