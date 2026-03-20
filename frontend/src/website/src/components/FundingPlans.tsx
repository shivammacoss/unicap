import { useState } from 'react';
import { DollarSign, TrendingUp, Shield, AlertTriangle, FileText, Sparkles, ArrowRight } from 'lucide-react';

interface FundingPlan {
  id: string;
  name: string;
  amount: string;
  tagline: string;
  profitSplit: string;
  maxDrawdown: string;
  dailyLossLimit: string;
  features: string[];
  ctaText: string;
  color: string;
  isImage?: boolean;
  imageUrl?: string;
}

const fundingPlans: FundingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Fund',
    amount: '$5,000',
    tagline: 'Perfect For Beginners Starting Their Funded Journey',
    profitSplit: 'Up to 80%',
    maxDrawdown: '10%',
    dailyLossLimit: '5%',
    features: [
      'Beginner-friendly rules',
      'Low risk environment',
      'Fast approval process',
      'Simple evaluation',
    ],
    ctaText: 'Start Challenge',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'growth',
    name: 'Growth Fund',
    amount: '$10,000',
    tagline: 'Scale Your Strategy With Higher Capital',
    profitSplit: 'Up to 85%',
    maxDrawdown: '10%',
    dailyLossLimit: '5%',
    features: [
      'Better profit share',
      'Flexible trading conditions',
      'Faster scaling opportunity',
      'Performance tracking dashboard',
    ],
    ctaText: 'Apply Now',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'pro',
    name: 'Pro Fund',
    amount: '$25,000',
    tagline: 'For Skilled Traders Ready To Scale',
    profitSplit: 'Up to 90%',
    maxDrawdown: '12%',
    dailyLossLimit: '6%',
    features: [
      'Professional level capital',
      'Higher reward structure',
      'Priority support',
      'Advanced analytics',
    ],
    ctaText: 'Get Funded',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'elite',
    name: 'Elite Fund',
    amount: '$50,000',
    tagline: 'Serious Capital For Serious Traders',
    profitSplit: 'Up to 90%',
    maxDrawdown: '12%',
    dailyLossLimit: '6%',
    features: [
      'Institutional-grade capital',
      'Premium execution environment',
      'Dedicated manager support',
      'Scaling plan access',
    ],
    ctaText: 'Join Elite',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'prime',
    name: 'Prime Fund',
    amount: '$100,000',
    tagline: 'Maximum Capital. Maximum Potential.',
    profitSplit: 'Up to 95%',
    maxDrawdown: '15%',
    dailyLossLimit: '7%',
    features: [
      'Highest profit split',
      'Priority withdrawals',
      'VIP support desk',
      'Professional trader status',
    ],
    ctaText: 'Apply For Prime',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'image-plan-1',
    name: '2-Step Challenge',
    amount: 'Custom',
    tagline: 'This funding program is designed for traders seeking flexible rules and scalable capital.',
    profitSplit: 'Up to 90%',
    maxDrawdown: '10%',
    dailyLossLimit: '5%',
    features: [
      'Standard 2-phase evaluation',
      'Flexible trading conditions',
      'Multiple account sizes',
      'Refundable fee on success',
    ],
    ctaText: 'Start Now',
    color: 'from-bluestone-accent to-bluestone-royal',
    isImage: true,
    imageUrl: '/funding-2step.png',
  },
  {
    id: 'image-plan-2',
    name: '1-Step Challenge',
    amount: 'Custom',
    tagline: 'This funding program is designed for traders seeking flexible rules and scalable capital.',
    profitSplit: 'Up to 90%',
    maxDrawdown: '10%',
    dailyLossLimit: '5%',
    features: [
      'Single step to funded account',
      'Faster evaluation process',
      'Multiple account sizes',
      'Refundable fee on success',
    ],
    ctaText: 'Start Now',
    color: 'from-gold to-gold-dark',
    isImage: true,
    imageUrl: '/funding-1step.png',
  },
];

export default function FundingPlans() {
  const [activeTab, setActiveTab] = useState(0);
  const activePlan = fundingPlans[activeTab];

  return (
    <section id="funding-plans" className="py-20 bg-bluestone-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Funding Programs</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose Your Funding Plan
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Select the perfect funding option that matches your trading style and experience level.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center pb-2">
            {fundingPlans.map((plan, index) => (
              <button
                key={plan.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r ' + plan.color + ' text-white shadow-lg shadow-current/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                style={{
                  boxShadow: activeTab === index ? `0 0 20px rgba(212, 175, 55, 0.3)` : 'none',
                }}
              >
                {plan.isImage ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs">
                      {index === 5 ? '2S' : '1S'}
                    </div>
                    <span className="hidden sm:inline">{plan.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center sm:flex-row sm:gap-2">
                    <span>{plan.name.split(' ')[0]}</span>
                    <span className="text-xs opacity-80">{plan.amount.replace('$', '')}</span>
                  </div>
                )}
                {activeTab === index && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/50" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div
          key={activePlan.id}
          className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {/* Plan Header */}
          <div className={`bg-gradient-to-r ${activePlan.color} p-6 sm:p-8`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activePlan.name}
                </h3>
                <p className="text-white/90 text-lg">{activePlan.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm">Funding Amount</p>
                <p className="font-display text-3xl sm:text-4xl font-bold text-white">{activePlan.amount}</p>
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-6 sm:p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/60 text-sm">Profit Split</span>
                </div>
                <p className="text-2xl font-bold text-white">{activePlan.profitSplit}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-white/60 text-sm">Max Drawdown</span>
                </div>
                <p className="text-2xl font-bold text-white">{activePlan.maxDrawdown}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-white/60 text-sm">Daily Loss Limit</span>
                </div>
                <p className="text-2xl font-bold text-white">{activePlan.dailyLossLimit}</p>
              </div>
            </div>

            {/* Trading Rules & Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Trading Rules */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gold" />
                  <h4 className="text-lg font-semibold text-white">Trading Rules</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>No time limit on evaluation</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>Trade any forex pairs, indices, commodities</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>Hold trades over weekends</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>News trading allowed</span>
                  </li>
                </ul>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h4 className="text-lg font-semibold text-white">Features</h4>
                </div>
                <ul className="space-y-3">
                  {activePlan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/60">
                <DollarSign className="w-5 h-5" />
                <span>One-time fee • Refundable on success</span>
              </div>
              <button className={`btn-primary px-8 py-4 text-lg flex items-center gap-2 bg-gradient-to-r ${activePlan.color}`}>
                {activePlan.ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
