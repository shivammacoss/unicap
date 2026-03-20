import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is the minimum deposit to open an account?',
    answer: 'The minimum deposit varies by account type. Our Standard account requires just $100 to get started, while Pro accounts start at $1,000. VIP and Institutional accounts have higher minimums to access premium features and pricing.',
  },
  {
    question: 'What trading platforms do you offer?',
    answer: 'We offer the industry-leading MetaTrader 4 and MetaTrader 5 platforms, available on Web, Desktop (Windows/Mac), and Mobile (iOS/Android). We also provide our proprietary WebTrader for browser-based trading without downloads.',
  },
  {
    question: 'Are my funds safe with Bluestone?',
    answer: 'Absolutely. Client funds are held in segregated accounts with tier-1 banks, completely separate from our operational funds. We also participate in investor compensation schemes and maintain comprehensive insurance coverage.',
  },
  {
    question: 'What are your spreads and commissions?',
    answer: 'Our spreads start from 0.0 pips on RAW accounts, with commissions as low as $2.5 per lot for VIP accounts. Standard accounts offer commission-free trading with spreads from 1.2 pips. View our Account Types section for detailed pricing.',
  },
  {
    question: 'Do you offer demo accounts?',
    answer: 'Yes! We offer free demo accounts with $100,000 in virtual funds. Practice your strategies risk-free with real market conditions. Demo accounts are available on all platforms and never expire.',
  },
  {
    question: 'How can I deposit and withdraw funds?',
    answer: 'We support multiple payment methods including bank wire, credit/debit cards, and popular e-wallets like Skrill, Neteller, and PayPal. Most deposits are instant, and withdrawals are processed within 24 hours during business days.',
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  isVisible,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
}) {
  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${150 + index * 70}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className={`glass rounded-2xl overflow-hidden transition-all duration-400 ${
          isOpen ? 'bg-white/10' : 'hover:bg-white/5'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left group"
        >
          <span className="text-lg font-medium text-white pr-4 group-hover:text-blue-300 transition-colors duration-400">
            {faq.question}
          </span>
          <div
            className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
              isOpen ? 'bg-blue-500 rotate-180' : 'group-hover:bg-white/20'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </button>
        <div
          className={`overflow-hidden transition-all duration-400 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="px-6 pb-6">
            <p className="text-white/70 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative section-padding bg-bluestone-dark overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-1" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            FAQ
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
            Frequently Asked Questions
          </h2>
          <p
            className={`text-lg text-white/70 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Find answers to common questions about trading with Bluestone.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`text-center transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="text-white/60 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-400">
            <MessageCircle className="w-5 h-5" />
            Contact Our Support Team
          </button>
        </div>
      </div>
    </section>
  );
}
