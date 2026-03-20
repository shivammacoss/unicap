import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, DollarSign, PieChart, FileText, TrendingUp } from 'lucide-react';
import FundingTable from '../components/FundingTable';
import { API_URL, getPublicUploadUrl } from '../lib/api';

type ActiveBanner = {
  _id: string;
  title?: string;
  imageUrl: string;
  link?: string;
};

const features = [
  { icon: DollarSign, text: 'Trade without risking your own capital' },
  { icon: PieChart, text: 'Profit-sharing model' },
  { icon: FileText, text: 'Transparent rules' },
  { icon: TrendingUp, text: 'Scalable account growth' },
];

export default function Funding() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [fundingBanner, setFundingBanner] = useState<ActiveBanner | null>(null);
  const [fundingBannerLoading, setFundingBannerLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/banners/active?type=funding`);
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.banners) && data.banners[0]) {
          setFundingBanner(data.banners[0]);
        }
      } catch {
        /* fallback to static card */
      } finally {
        if (!cancelled) setFundingBannerLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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
    <>
    <section
      id="funding"
      ref={sectionRef}
      className="relative section-padding bg-white overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-bluestone-accent/5 rounded-full blur-3xl animate-orb-2" />
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
            {fundingBannerLoading ? (
              <div className="rounded-3xl p-8 bg-bluestone-dark/95 shadow-2xl min-h-[320px] flex items-center justify-center">
                <div className="w-full h-64 rounded-2xl bg-white/5 animate-pulse" aria-hidden />
              </div>
            ) : fundingBanner ? (
              <div className="rounded-3xl overflow-hidden bg-bluestone-dark/95 shadow-2xl border border-white/10">
                {fundingBanner.link ? (
                  <a
                    href={fundingBanner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:ring-2 hover:ring-gold/40 rounded-3xl transition-all"
                  >
                    <img
                      src={getPublicUploadUrl(fundingBanner.imageUrl)}
                      alt={fundingBanner.title || 'Funding program'}
                      className="w-full h-auto object-cover max-h-[400px] block"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : (
                  <img
                    src={getPublicUploadUrl(fundingBanner.imageUrl)}
                    alt={fundingBanner.title || 'Funding program'}
                    className="w-full h-auto object-cover max-h-[400px] block"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {fundingBanner.title ? (
                  <p className="text-center text-white/70 text-sm py-3 px-4">{fundingBanner.title}</p>
                ) : null}
              </div>
            ) : (
              <div className="rounded-3xl p-8 relative overflow-hidden bg-bluestone-dark/95 shadow-2xl">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-display">Funding Program</h3>
                  {[
                    { step: '1', title: 'Evaluation Phase', desc: 'Prove your trading skills', progress: 100 },
                    { step: '2', title: 'Verification', desc: 'Consistent performance check', progress: 75 },
                    { step: '3', title: 'Funded Account', desc: 'Trade with company capital', progress: 50 },
                    { step: '4', title: 'Scale Up', desc: 'Grow your funded account', progress: 25 },
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center flex-shrink-0 text-sm font-bold text-bluestone-dark">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-white/50 text-sm mb-2">{item.desc}</div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gold to-bluestone-accent rounded-full transition-all duration-1000"
                            style={{ width: isVisible ? `${item.progress}%` : '0%', transitionDelay: `${600 + index * 200}ms` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <span
              className={`inline-block text-sm font-semibold text-bluestone-accent uppercase tracking-wider mb-4 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Capital Funding
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
              Get Funded. Trade With Company Capital.
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
              We support skilled traders with capital funding programs designed for performance-based growth.
              If you have strategy and discipline, we provide the funding.
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
              Apply For Funding
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
    <FundingTable />
    </>
  );
}
