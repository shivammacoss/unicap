import { useEffect, useRef, useState } from 'react';
import { Check, Star, ArrowRight, Building2, Crown, User, Zap } from 'lucide-react';

const accounts = [
  {
    name: 'Standard',
    badge: 'STARTER',
    badgeColor: 'bg-white/10',
    minDeposit: '$100',
    spread: 'From 1.2 pips',
    commission: '$0',
    leverage: 'Up to 1:500',
    icon: User,
    features: [
      'Web & Mobile platforms',
      '24/5 Customer support',
      'Daily market analysis',
      'Basic educational resources',
    ],
    cta: 'Open Standard Account',
    featured: false,
  },
  {
    name: 'Pro',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-blue-500',
    minDeposit: '$1,000',
    spread: 'From 0.6 pips',
    commission: '$3.5 per lot',
    leverage: 'Up to 1:500',
    icon: Zap,
    features: [
      'Everything in Standard',
      'RAW spreads',
      'Priority support',
      'Advanced charts & tools',
      'Personal account manager',
    ],
    cta: 'Open Pro Account',
    featured: true,
  },
  {
    name: 'VIP',
    badge: 'PREMIUM',
    badgeColor: 'bg-purple-500',
    minDeposit: '$10,000',
    spread: 'From 0.0 pips',
    commission: '$2.5 per lot',
    leverage: 'Up to 1:500',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Lowest spreads',
      'Dedicated VIP support',
      'Free VPS hosting',
      'Custom trading solutions',
    ],
    cta: 'Open VIP Account',
    featured: false,
  },
  {
    name: 'Institutional',
    badge: 'ENTERPRISE',
    badgeColor: 'bg-amber-500',
    minDeposit: '$50,000+',
    spread: 'Custom',
    commission: 'Negotiable',
    leverage: 'Custom',
    icon: Building2,
    features: [
      'Everything in VIP',
      'Custom liquidity pools',
      'API trading access',
      'White label solutions',
      'Dedicated relationship manager',
    ],
    cta: 'Contact Us',
    featured: false,
  },
];

function AccountCard({
  account,
  index,
  isVisible,
}: {
  account: typeof accounts[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`group relative transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${account.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
      style={{
        transitionDelay: `${200 + index * 100}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
          account.featured
            ? 'bg-gradient-to-b from-blue-600/20 to-blue-900/20 border-2 border-blue-500/50'
            : 'glass hover:bg-white/10'
        } card-hover-lift`}
      >
        {/* Featured Glow */}
        {account.featured && (
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl animate-pulse-glow" />
        )}

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-shimmer" />
        </div>

        <div className="relative p-6 lg:p-8">
          {/* Badge */}
          <div className="mb-6">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${account.badgeColor} text-white`}
            >
              {account.featured && <Star className="w-3 h-3 fill-white" />}
              {account.badge}
            </span>
          </div>

          {/* Icon & Name */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-xl ${
                account.featured
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : 'bg-white/10'
              } flex items-center justify-center group-hover:scale-110 transition-transform duration-400`}
            >
              <account.icon className="w-6 h-6 text-white icon-rotate" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-display">
                {account.name}
              </h3>
              <p className="text-sm text-white/50">Account</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <div className="text-sm text-white/50 mb-1">Minimum Deposit</div>
            <div className="text-3xl font-bold text-white font-display animate-number-glow">
              {account.minDeposit}
            </div>
          </div>

          {/* Specs */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Spread</span>
              <span className="text-white font-medium">{account.spread}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Commission</span>
              <span className="text-white font-medium">{account.commission}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Leverage</span>
              <span className="text-white font-medium">{account.leverage}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-6 animate-divider" />

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {account.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check
                  className={`w-4 h-4 flex-shrink-0 ${
                    account.featured ? 'text-blue-400' : 'text-green-400'
                  }`}
                />
                <span className="text-white/70">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-400 group/btn ${
              account.featured
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-glow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {account.cta}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountTypes() {
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
      id="accounts"
      ref={sectionRef}
      className="relative section-padding bg-gradient-to-b from-bluestone-deep to-bluestone-dark overflow-hidden"
    >
      {/* Background Pattern with Animated Orbs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 animate-orb-1" />
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
            Account Types
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
            Choose Your Trading Edge
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
            Select the account that matches your trading style and ambitions. Upgrade anytime as you grow.
          </p>
        </div>

        {/* Account Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accounts.map((account, index) => (
            <AccountCard
              key={account.name}
              account={account}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
