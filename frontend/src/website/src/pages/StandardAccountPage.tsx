import { CheckCircle2, HelpCircle } from 'lucide-react';
import Footer from '../sections/Footer';

export default function StandardAccountPage() {
  const specs = [
    { label: 'Minimum Deposit', value: '$100' },
    { label: 'Base Currency', value: 'USD' },
    { label: 'Leverage', value: 'Up to 1:500' },
    { label: 'Spread', value: 'From 1.2 pips' },
    { label: 'Commission', value: 'None' },
    { label: 'Execution', value: 'Market Execution' },
    { label: 'Swap', value: 'Yes' },
  ];

  const benefits = [
    'Beginner-friendly environment',
    'No commission fees',
    'Stable spreads',
    'Easy order execution',
    'Ideal for learning & practice',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img
          src="/image/forexbanner1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bluestone-deep/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bluestone-accent/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Forex Accounts</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Standard Trading Account
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-light mb-6">
            Simple. Reliable. Beginner-Friendly.
          </p>
          <p className="text-white/70 max-w-2xl mb-10">
            Trade confidently with a user-friendly account designed for new traders and investors who prefer stable conditions and zero commission trading.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary px-8 py-3">Open Standard Account</button>
            <button className="px-8 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors">
              Compare Accounts
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-bluestone-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-6">About This Account</h2>
          <p className="text-white/70 max-w-3xl text-lg leading-relaxed">
            The Standard Account is the perfect starting point for traders entering the forex market. It provides straightforward pricing, moderate spreads, and no commission fees, making it ideal for learning and growing without complex costs.
          </p>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-bluestone-deep">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-10">Account Specifications</h2>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            {specs.map((spec, idx) => (
              <div
                key={spec.label}
                className={`grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-4 px-6 py-4 ${
                  idx % 2 === 0 ? 'bg-white/5' : ''
                } ${idx !== specs.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <span className="text-sm font-semibold text-white/80">{spec.label}</span>
                <span className="text-sm text-white">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-bluestone-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-10">Why Choose Standard Account</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 bg-white/5 rounded-xl p-5 border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bluestone-accent/20 to-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
            Start your trading journey today
          </h2>
          <p className="text-white/70 mb-8">with a simple and reliable account.</p>
          <button className="btn-primary px-10 py-4 text-lg">Open Account</button>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="py-16 bg-bluestone-deep border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-10 h-10 text-gold" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
            Need Help Choosing an Account?
          </h3>
          <p className="text-white/70 mb-6">
            Our experts will help you select the best account type based on your trading style.
          </p>
          <button className="px-8 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 transition-colors">
            Contact Support
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
