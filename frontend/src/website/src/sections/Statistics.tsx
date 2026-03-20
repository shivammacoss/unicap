import { useEffect, useRef, useState } from 'react';
import { Users, TrendingUp, Clock, Headphones } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: 'K+',
    label: 'Active Traders Worldwide',
  },
  {
    icon: TrendingUp,
    value: 50,
    suffix: 'B+',
    prefix: '$',
    label: 'Monthly Trading Volume',
  },
  {
    icon: Clock,
    value: 50,
    suffix: 'ms',
    prefix: '<',
    label: 'Average Execution Speed',
  },
  {
    icon: Headphones,
    value: 24,
    suffix: '/7',
    label: 'Customer Support',
  },
];

// Count-up animation hook with easing
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!start) return;
    
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOut * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, start]);

  return count;
}

function StatItem({
  stat,
  index,
  isVisible,
}: {
  stat: typeof stats[0];
  index: number;
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, 2500, isVisible);

  return (
    <div
      className={`text-center transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ 
        transitionDelay: `${200 + index * 150}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 hover:bg-blue-500/30 hover:scale-110 transition-all duration-400 group">
        <stat.icon className="w-8 h-8 text-blue-400 icon-rotate" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-white font-display mb-2 animate-number-glow">
        {stat.prefix || ''}
        {stat.prefix === '<' ? stat.prefix : ''}
        {count}
        {stat.suffix}
      </div>
      <div className="text-white/60">{stat.label}</div>
    </div>
  );
}

export default function Statistics() {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-bluestone-dark overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
