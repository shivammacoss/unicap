import { useEffect, useRef, useState } from 'react';
import { Globe, Gem, BarChart3, Bitcoin, Building2, ArrowRight } from 'lucide-react';

const instruments = [
  {
    icon: Globe,
    title: 'Forex',
    description: 'Trade 80+ currency pairs including majors, minors, and exotics with spreads starting from 0.0 pips.',
    pairs: 'EUR/USD, GBP/USD, USD/JPY...',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Gem,
    title: 'Commodities',
    description: 'Diversify your portfolio with precious metals, energy, and agricultural commodities.',
    pairs: 'Gold, Silver, Oil, Natural Gas',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: BarChart3,
    title: 'Indices',
    description: 'Trade global stock indices with competitive leverage and no requotes.',
    pairs: 'US30, NAS100, GER40, UK100',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Bitcoin,
    title: 'Cryptocurrencies',
    description: 'Access the volatile crypto market 24/7 with tight spreads and deep liquidity.',
    pairs: 'BTC, ETH, LTC, XRP',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Building2,
    title: 'Stocks',
    description: 'Invest in leading companies from US, EU, and Asian markets with zero commission.',
    pairs: 'Apple, Tesla, Amazon, Google',
    color: 'from-cyan-500 to-blue-500',
  },
];

function InstrumentCard({
  instrument,
  index,
  isVisible,
}: {
  instrument: typeof instruments[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`group relative transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${300 + index * 100}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="relative glass rounded-3xl p-8 h-full card-hover-lift overflow-hidden">
        {/* Glow Effect */}
        <div
          className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${instrument.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-shimmer" />
        </div>

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${instrument.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400`}
        >
          <instrument.icon className="w-8 h-8 text-white icon-rotate" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-semibold text-white font-display mb-3">
          {instrument.title}
        </h3>
        <p className="text-white/70 mb-4 leading-relaxed">
          {instrument.description}
        </p>

        {/* Pairs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {instrument.pairs.split(', ').map((pair) => (
            <span
              key={pair}
              className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors duration-400"
            >
              {pair}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button className="flex items-center gap-2 text-blue-400 font-medium group/btn hover:text-blue-300 transition-colors duration-400">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-400" />
        </button>
      </div>
    </div>
  );
}

export default function TradingInstruments() {
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
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="instruments"
      ref={sectionRef}
      className="relative section-padding bg-bluestone-dark overflow-hidden"
    >
      {/* Background Pattern with Animated Orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-orb-1" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Markets
          </span>
          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '100ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Trade the World's Most Popular Instruments
          </h2>
          <p
            className={`text-lg text-white/70 max-w-3xl mx-auto transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Access 10,000+ trading instruments across multiple asset classes with competitive spreads and lightning-fast execution.
          </p>
        </div>

        {/* Instruments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instruments.map((instrument, index) => (
            <InstrumentCard
              key={instrument.title}
              instrument={instrument}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
