import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Copy, Shield, BarChart3, Users } from 'lucide-react';

const features = [
  { icon: Copy, text: 'Automatic trade replication' },
  { icon: Shield, text: 'Risk management controls' },
  { icon: BarChart3, text: 'Performance transparency' },
  { icon: Users, text: 'Beginner-friendly system' },
];

export default function CopyTrading() {
  const navigate = useNavigate();
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
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="copy-trading"
      ref={sectionRef}
      className="relative section-padding bg-white overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-bluestone-accent/5 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Visual */}
          <div
            className={`relative order-2 lg:order-1 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{
              transitionDelay: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="rounded-3xl p-8 relative overflow-hidden bg-bluestone-dark/95 shadow-2xl">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-display">Top Traders</h3>
                {/* Trader Cards */}
                {[
                  { name: 'Alex Morgan', roi: '+42.8%', followers: '2,341', winRate: '78%', risk: 'Low' },
                  { name: 'Sarah Chen', roi: '+38.2%', followers: '1,892', winRate: '82%', risk: 'Medium' },
                  { name: 'David Kim', roi: '+55.1%', followers: '3,105', winRate: '71%', risk: 'Low' },
                ].map((trader, index) => (
                  <div
                    key={trader.name}
                    className={`bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bluestone-accent to-gold flex items-center justify-center text-sm font-bold text-white">
                          {trader.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{trader.name}</div>
                          <div className="text-white/50 text-xs">{trader.followers} followers</div>
                        </div>
                      </div>
                      <div className="text-green-400 font-bold font-display">{trader.roi}</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-white/50">Win Rate: <span className="text-white/80">{trader.winRate}</span></span>
                      <span className="text-white/50">Risk: <span className="text-white/80">{trader.risk}</span></span>
                      <button className="ml-auto text-xs bg-bluestone-accent/20 text-bluestone-light px-3 py-1 rounded-full hover:bg-bluestone-accent/30 transition-colors duration-400">
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <span
              className={`inline-block text-sm font-semibold text-bluestone-accent uppercase tracking-wider mb-4 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Copy Trading
            </span>
            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-bluestone-dark mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Copy Top Traders Automatically
            </h2>
            <p
              className={`text-lg text-gray-600 mb-8 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Don't have time to trade? Copy strategies of experienced traders in real-time.
              Let professionals trade while you grow.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature.text}
                  className={`flex items-center gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{
                    transitionDelay: `${300 + index * 100}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-bluestone-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-bluestone-accent" />
                  </div>
                  <span className="text-gray-700 text-lg">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/user/login')}
              className={`btn-primary flex items-center gap-2 group animate-pulse-glow transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '700ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Start Copy Trading
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
