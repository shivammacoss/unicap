import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
  { symbol: 'EUR/USD', price: '1.0845', change: '+0.12%', up: true },
  { symbol: 'GBP/USD', price: '1.2634', change: '-0.05%', up: false },
  { symbol: 'USD/JPY', price: '149.82', change: '+0.23%', up: true },
  { symbol: 'XAU/USD', price: '2,045.60', change: '+0.45%', up: true },
  { symbol: 'BTC/USD', price: '43,250.00', change: '-1.20%', up: false },
  { symbol: 'ETH/USD', price: '2,580.00', change: '+0.80%', up: true },
  { symbol: 'US30', price: '37,850.00', change: '+0.15%', up: true },
  { symbol: 'NAS100', price: '16,920.00', change: '-0.30%', up: false },
  { symbol: 'GER40', price: '16,780.00', change: '+0.22%', up: true },
  { symbol: 'UK100', price: '7,650.00', change: '-0.08%', up: false },
  { symbol: 'USD/CHF', price: '0.8845', change: '+0.05%', up: true },
  { symbol: 'AUD/USD', price: '0.6543', change: '-0.12%', up: false },
];

function TickerItem({ symbol, price, change, up }: {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 glass rounded-xl mx-2 min-w-[200px] hover:bg-white/10 transition-all duration-400 cursor-pointer group card-hover-lift">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white font-display">{symbol}</span>
        <span className="text-lg font-bold text-white">{price}</span>
      </div>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${up ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
        {up ? (
          <TrendingUp className="w-4 h-4 text-green-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
        <span className={`text-xs font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function MarketTicker() {
  // Duplicate data for seamless loop
  const duplicatedData = [...marketData, ...marketData];

  return (
    <section className="relative py-4 bg-bluestone-dark/80 backdrop-blur-sm border-y border-white/5 overflow-hidden">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bluestone-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bluestone-dark to-transparent z-10 pointer-events-none" />

      {/* Scrolling Ticker */}
      <div className="flex animate-ticker">
        {duplicatedData.map((item, index) => (
          <TickerItem
            key={`${item.symbol}-${index}`}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
            up={item.up}
          />
        ))}
      </div>
    </section>
  );
}
