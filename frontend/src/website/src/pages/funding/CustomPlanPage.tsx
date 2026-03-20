import { DollarSign, TrendingUp, Shield, AlertTriangle, Calendar, Gauge, CheckCircle2, Zap, BarChart3, Target, Clock } from 'lucide-react';
import Footer from '../../sections/Footer';

export default function CustomPlanPage() {
  const planDetails = [
    { label: 'Funding Amount', value: 'Custom', icon: DollarSign },
    { label: 'Profit Split', value: 'Up to 90%', icon: TrendingUp },
    { label: 'Max Drawdown', value: '10%', icon: Shield },
    { label: 'Daily Loss Limit', value: '5%', icon: AlertTriangle },
    { label: 'Min Trading Days', value: '4 days', icon: Calendar },
    { label: 'Leverage', value: 'Flexible', icon: Gauge },
  ];

  const tradingRules = [
    'No over-risking',
    'Follow drawdown limits',
    'No account sharing',
    'Consistent trading required',
  ];

  const benefits = [
    { text: 'Fast evaluation', icon: Zap },
    { text: 'Transparent rules', icon: CheckCircle2 },
    { text: 'Scalable capital', icon: BarChart3 },
    { text: 'Professional dashboard', icon: Target },
    { text: 'Real-time tracking', icon: Clock },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-bluestone-deep via-bluestone-dark to-bluestone-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bluestone-accent/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-bluestone-accent/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-bluestone-accent/20 text-bluestone-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
            CUSTOM PLAN
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Custom Funding Plan
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-light mb-6 max-w-2xl">
            Trade with funded capital and scale your performance with professional trading conditions.
          </p>
          <p className="text-white/60 mb-8">This exclusive funding program is designed for traders seeking flexible rules and customized capital allocation.</p>
          <button className="btn-primary px-8 py-4 text-lg bg-gradient-to-r from-bluestone-accent to-bluestone-royal">
            Apply Now
          </button>
        </div>
      </section>

      {/* Plan Details Card */}
      <section className="py-16 bg-bluestone-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-8">Plan Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {planDetails.map((detail) => (
              <div key={detail.label} className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-xl bg-bluestone-accent/20 flex items-center justify-center mx-auto mb-3">
                  <detail.icon className="w-6 h-6 text-bluestone-accent" />
                </div>
                <p className="text-white/60 text-xs mb-1">{detail.label}</p>
                <p className="text-white font-bold text-lg">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Rules & Benefits */}
      <section className="py-16 bg-bluestone-deep">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Trading Rules */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <Shield className="w-7 h-7 text-gold" />
                Trading Rules
              </h2>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <ul className="space-y-4">
                  {tradingRules.map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <Zap className="w-7 h-7 text-gold" />
                Benefits
              </h2>
              <div className="grid gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-bluestone-accent/20 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-bluestone-accent" />
                    </div>
                    <span className="text-white/90">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bluestone-accent/20 to-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
            Start your funded journey today.
          </h2>
          <p className="text-white/70 mb-8">Get access to customized trading capital with flexible conditions.</p>
          <button className="btn-primary px-10 py-4 text-lg bg-gradient-to-r from-bluestone-accent to-bluestone-royal">
            Get Funded
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
