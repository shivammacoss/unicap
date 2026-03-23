import { useState } from 'react';
import { Target, TrendingDown, BarChart3, Clock, Calendar, RotateCcw, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToFundingCart } from '../../../lib/fundingCart';

type ChallengeType = '2-step' | '1-step';

interface AccountPlan {
  planName: string;
  accountSize: number;
  phase1Target: number;
  phase2Target: number;
  maxDailyLoss: number;
  maxLoss: number;
  minTradingDays: number;
  tradingPeriod: string;
  refund: boolean;
  rewards: string;
  price: number;
  originalPrice?: number;
  isBestValue?: boolean;
}

/** Prices aligned with product sheet: 1-Step / 2-Step per account size */
const accountPlans: Record<ChallengeType, AccountPlan[]> = {
  '2-step': [
    { planName: 'Prime Funded', accountSize: 100000, phase1Target: 10000, phase2Target: 5000, maxDailyLoss: 5000, maxLoss: 10000, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 599, isBestValue: true },
    { planName: 'Elite Fund', accountSize: 50000, phase1Target: 5000, phase2Target: 2500, maxDailyLoss: 2500, maxLoss: 5000, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 400 },
    { planName: 'Pro Fund', accountSize: 25000, phase1Target: 2500, phase2Target: 1250, maxDailyLoss: 1250, maxLoss: 2500, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 225 },
    { planName: 'Growth Fund 10K', accountSize: 10000, phase1Target: 1000, phase2Target: 500, maxDailyLoss: 500, maxLoss: 1000, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 90 },
    { planName: 'Starter Pro 5K', accountSize: 5000, phase1Target: 500, phase2Target: 250, maxDailyLoss: 250, maxLoss: 500, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 55 },
  ],
  '1-step': [
    { planName: 'Prime Funded', accountSize: 100000, phase1Target: 5000, phase2Target: 0, maxDailyLoss: 3000, maxLoss: 6000, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 499, isBestValue: true },
    { planName: 'Elite Fund', accountSize: 50000, phase1Target: 2500, phase2Target: 0, maxDailyLoss: 1500, maxLoss: 3000, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 340 },
    { planName: 'Pro Fund', accountSize: 25000, phase1Target: 1250, phase2Target: 0, maxDailyLoss: 750, maxLoss: 1500, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 199 },
    { planName: 'Growth Fund 10K', accountSize: 10000, phase1Target: 500, phase2Target: 0, maxDailyLoss: 300, maxLoss: 600, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 72 },
    { planName: 'Starter Pro 5K', accountSize: 5000, phase1Target: 250, phase2Target: 0, maxDailyLoss: 150, maxLoss: 300, minTradingDays: 4, tradingPeriod: 'Unlimited', refund: true, rewards: 'up to 90%', price: 39 },
  ],
};

const specLabels = [
  { key: 'profitTarget', label: 'Profit Target', icon: Target },
  { key: 'maxDailyLoss', label: 'Max. Daily Loss', icon: TrendingDown },
  { key: 'maxLoss', label: 'Max. Loss', icon: BarChart3 },
  { key: 'minTradingDays', label: 'Min. trading days', icon: Clock },
  { key: 'tradingPeriod', label: 'Trading Period', icon: Calendar },
  { key: 'refund', label: 'Refund', icon: RotateCcw },
  { key: 'rewards', label: 'Rewards', icon: Award },
];

export default function FundingTable() {
  const [challengeType, setChallengeType] = useState<ChallengeType>('2-step');

  const plans = accountPlans[challengeType];
  const priceSymbol = '$';

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const handleAddToCart = (plan: AccountPlan) => {
    const stepLabel = challengeType === '1-step' ? '1-Step' : '2-Step';
    addToFundingCart({
      challengeType,
      accountSize: plan.accountSize,
      price: plan.price,
      label: `${plan.planName} · $${formatNumber(plan.accountSize)} · ${stepLabel}`
    });
    toast.success('Added to cart', { duration: 2500 });
  };

  return (
    <section className="py-16 bg-bluestone-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Funding Challenge</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Complete our Trading Objectives to become eligible to gain your funded account.
          </p>
        </div>

        {/* Challenge Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-bluestone-deep/80 rounded-full p-1.5 border border-white/10">
            <button
              onClick={() => setChallengeType('2-step')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                challengeType === '2-step'
                  ? 'bg-white text-bluestone-dark shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="text-lg">⚡</span>
              <div className="text-left">
                <div className="font-semibold">2-Step</div>
                <div className="text-xs opacity-70">Standard 2-phase</div>
              </div>
            </button>
            <button
              onClick={() => setChallengeType('1-step')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                challengeType === '1-step'
                  ? 'bg-white text-bluestone-dark shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="text-lg">🚀</span>
              <div className="text-left">
                <div className="font-semibold flex items-center gap-2">
                  1-Step
                  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
                </div>
                <div className="text-xs opacity-70">Single step to Account</div>
              </div>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Specs Column */}
          <div className="hidden lg:block pt-24">
            <div className="space-y-0">
              {specLabels.map((spec) => (
                <div key={spec.key} className="flex items-center gap-3 py-4 border-b border-white/5">
                  <spec.icon className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 text-sm">{spec.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-white/40 text-xs">
              All prices are one-time<br />payments
            </div>
          </div>

          {/* Plan Cards */}
          {plans.map((plan) => (
            <div
              key={plan.accountSize}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                plan.isBestValue
                  ? 'bg-gradient-to-b from-blue-600/30 to-blue-900/30 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Best Value Badge */}
              {plan.isBestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Best value
                  </span>
                  {plan.originalPrice && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{Math.round((1 - plan.price / plan.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              )}

              {/* Account Size Header */}
              <div className="text-center mb-6 pt-2">
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Account</div>
                <div className="text-sm font-medium text-cyan-300/90 mb-1">{plan.planName}</div>
                <div className="text-3xl font-bold text-white">${formatNumber(plan.accountSize)}</div>
              </div>

              {/* Specs */}
              <div className="space-y-0">
                {/* Profit Target */}
                <div className="py-3 border-b border-white/5 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Profit Target</div>
                  {challengeType === '2-step' ? (
                    <div className="text-sm">
                      <span className="text-white/50">PHASE 1</span>{' '}
                      <span className="text-white">${formatNumber(plan.phase1Target)}</span>
                      <br />
                      <span className="text-white/50">PHASE 2</span>{' '}
                      <span className="text-white">${formatNumber(plan.phase2Target)}</span>
                    </div>
                  ) : (
                    <div className="text-white">${formatNumber(plan.phase1Target)}</div>
                  )}
                </div>

                {/* Max Daily Loss */}
                <div className="py-3 border-b border-white/5 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Max. Daily Loss</div>
                  <div className="text-white">${formatNumber(plan.maxDailyLoss)}</div>
                </div>

                {/* Max Loss */}
                <div className="py-3 border-b border-white/5 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Max. Loss</div>
                  <div className="text-white">${formatNumber(plan.maxLoss)}</div>
                </div>

                {/* Min Trading Days */}
                <div className="py-3 border-b border-white/5 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Min. trading days</div>
                  <div className="text-white">{plan.minTradingDays} days</div>
                </div>

                {/* Trading Period */}
                <div className="py-3 border-b border-white/5 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Trading Period</div>
                  <div className="text-white">{plan.tradingPeriod}</div>
                </div>

                {/* Refund */}
                <div className="py-3 border-b border-white/5 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Refund</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-white">Yes</span>
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded">100%</span>
                  </div>
                </div>

                {/* Rewards */}
                <div className="py-3 text-center">
                  <div className="lg:hidden text-white/40 text-xs mb-1">Rewards</div>
                  <div className="text-white">{plan.rewards}</div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {plan.originalPrice && (
                    <span className="text-white/40 line-through text-sm">
                      {priceSymbol}{plan.originalPrice}
                    </span>
                  )}
                  <span className={`text-2xl font-bold ${plan.isBestValue ? 'text-amber-400' : 'text-white'}`}>
                    {priceSymbol}{plan.price}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(plan)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.isBestValue
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
