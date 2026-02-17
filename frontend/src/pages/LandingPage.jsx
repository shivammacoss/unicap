import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Download, BarChart3, Zap, TrendingUp, TrendingDown, Coins, ArrowRight, Shield, Lock, Eye, Smartphone, Wallet, Database, Sliders, Target, Award, Check, HelpCircle, MessageCircle, Headphones, MessageSquare, ArrowRight as ArrowRightIcon, BookOpen, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react'

// ==================== HEADER ====================
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { title: 'Home', href: '#' },
    { title: 'Markets', href: '#markets' },
    { title: 'Trade Solutions', href: '#products' },
    { title: 'Funding Program', href: '#funding' },
    { title: 'Company', href: '#about' },
    { title: 'Support', href: '#support' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="/image/unicap logo light.png" 
                alt="UNICAP MARKETS" 
                className="h-10 md:h-12 w-auto"
              />
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a href="/unicap.apk" download className="flex items-center space-x-1 text-gray-300 hover:text-emerald-400 transition-colors text-sm">
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </a>
            <button onClick={() => navigate('/user/login')} className="text-gray-300 hover:text-white transition-colors font-medium text-sm px-3 py-2">
              Login
            </button>
            <button onClick={() => navigate('/user/signup')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-emerald-500/25">
              Sign Up
            </button>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-3 text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-800 mt-4 space-y-3">
              <a href="/unicap.apk" download className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 py-2">
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </a>
              <button onClick={() => navigate('/user/login')} className="block text-gray-300 hover:text-white py-2 w-full text-left">Login</button>
              <button onClick={() => navigate('/user/signup')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white block text-center py-3 rounded-lg font-semibold w-full">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// ==================== HERO ====================
const Hero = () => {
  const [tickerOffset, setTickerOffset] = useState(0)
  
  const tickerData = [
    { symbol: 'BTC/USDT', price: '67,234.50', change: '+2.34%', up: true },
    { symbol: 'ETH/USDT', price: '3,456.78', change: '+1.89%', up: true },
    { symbol: 'SOL/USDT', price: '178.45', change: '-0.56%', up: false },
    { symbol: 'XRP/USDT', price: '0.6234', change: '+3.21%', up: true },
    { symbol: 'AAPL', price: '189.34', change: '+0.78%', up: true },
    { symbol: 'TSLA', price: '245.67', change: '-1.23%', up: false },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(prev => (prev - 1) % (tickerData.length * 200))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/unicap_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-44">
        <div className="max-w-3xl">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Trade Smarter. Grow Faster.
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mt-2">With UNICAP MARKET</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl">
              A next-generation trading ecosystem built for speed, security, and precision — giving you full control of your digital trading journey.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-3 overflow-hidden">
        <div 
          className="flex space-x-8 whitespace-nowrap"
          style={{ transform: `translateX(${tickerOffset}px)` }}
        >
          {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 px-4">
              <span className="text-white font-medium">{item.symbol}</span>
              <span className="text-gray-300">${item.price}</span>
              <span className={item.up ? 'text-emerald-400' : 'text-red-400'}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== PRODUCTS ====================
const Products = () => {
  const products = [
    {
      icon: BarChart3,
      title: 'Digital Stock Assets',
      description: 'Trade tokenized assets linked to global equities with fractional ownership and 24/7 market access.',
      cta: 'Explore',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Crypto Spot Trading',
      description: 'Instant execution with deep liquidity and ultra-low spreads across hundreds of trading pairs.',
      cta: 'Trade Now',
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Perpetual Futures',
      description: 'Advanced derivatives trading with flexible leverage up to 100x and professional risk management tools.',
      cta: 'Start Futures',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Coins,
      title: 'Earn & Staking',
      description: 'Put your assets to work and generate passive income with competitive APY rates and flexible terms.',
      cta: 'Start Earning',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Trade Solutions</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Everything You Need to Trade Like a Pro
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            UNICAP MARKET offers a powerful suite of trading products designed for beginners, professionals, and institutional traders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-10`}></div>
                <div className={`absolute inset-[1px] bg-white rounded-2xl`}></div>
              </div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <product.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{product.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{product.description}</p>
                
                <a href="#" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link">
                  {product.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== MARKETS ====================
const Markets = () => {
  const [activeTab, setActiveTab] = useState('trending')
  const [prices, setPrices] = useState({})

  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'all', label: 'All Assets' },
    { id: 'gainers', label: 'Gainers' },
    { id: 'losers', label: 'Losers' }
  ]

  const marketData = [
    { asset: 'BTC', name: 'Bitcoin', price: 67234.50, change: 2.34, volume: '24.5B', marketCap: '1.32T', trending: true, icon: '\u20BF' },
    { asset: 'ETH', name: 'Ethereum', price: 3456.78, change: 1.89, volume: '12.3B', marketCap: '415B', trending: true, icon: '\u039E' },
    { asset: 'SOL', name: 'Solana', price: 178.45, change: -0.56, volume: '3.2B', marketCap: '78B', trending: true, icon: '\u25CE' },
    { asset: 'XRP', name: 'Ripple', price: 0.6234, change: 3.21, volume: '2.1B', marketCap: '34B', trending: false, icon: '\u2715' },
    { asset: 'BNB', name: 'BNB', price: 598.23, change: 0.78, volume: '1.8B', marketCap: '89B', trending: true, icon: '\u25C6' },
    { asset: 'ADA', name: 'Cardano', price: 0.4521, change: -1.23, volume: '890M', marketCap: '16B', trending: false, icon: '\u20B3' },
    { asset: 'DOGE', name: 'Dogecoin', price: 0.1234, change: 5.67, volume: '1.2B', marketCap: '18B', trending: true, icon: '\u00D0' },
    { asset: 'AVAX', name: 'Avalanche', price: 35.67, change: -2.34, volume: '456M', marketCap: '14B', trending: false, icon: '\u25B2' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrices = {}
      marketData.forEach(item => {
        const fluctuation = (Math.random() - 0.5) * 0.002
        newPrices[item.asset] = item.price * (1 + fluctuation)
      })
      setPrices(newPrices)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getFilteredData = () => {
    switch (activeTab) {
      case 'trending':
        return marketData.filter(item => item.trending)
      case 'gainers':
        return marketData.filter(item => item.change > 0).sort((a, b) => b.change - a.change)
      case 'losers':
        return marketData.filter(item => item.change < 0).sort((a, b) => a.change - b.change)
      default:
        return marketData
    }
  }

  const formatPrice = (asset, basePrice) => {
    const price = prices[asset] || basePrice
    return price >= 1 ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                      : price.toFixed(4)
  }

  return (
    <section id="markets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Markets</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
             Market Overview
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track global market movements in real time with powerful analytics.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Asset</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm">Price</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm">24h Change</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm hidden md:table-cell">Volume</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm hidden lg:table-cell">Market Cap</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredData().map((item, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{item.asset}</div>
                          <div className="text-sm text-gray-500">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-semibold text-gray-900 tabular-nums">
                        ${formatPrice(item.asset, item.price)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg ${
                        item.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-medium tabular-nums">{item.change >= 0 ? '+' : ''}{item.change}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right hidden md:table-cell">
                      <span className="text-gray-600">${item.volume}</span>
                    </td>
                    <td className="py-4 px-6 text-right hidden lg:table-cell">
                      <span className="text-gray-600">${item.marketCap}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== FUTURES ====================
const Futures = () => {
  const [leverageValue, setLeverageValue] = useState(25)
  const [chartProgress, setChartProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setChartProgress(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: TrendingUp, title: 'Go Long', description: 'Profit from rising markets', color: 'text-emerald-500 bg-emerald-500/10' },
    { icon: TrendingDown, title: 'Go Short', description: 'Profit from falling markets', color: 'text-red-500 bg-red-500/10' },
    { icon: Sliders, title: 'High Leverage', description: 'Scale positions with precision', color: 'text-blue-500 bg-blue-500/10' },
    { icon: Shield, title: 'Risk Controls', description: 'Stop-loss & take-profit tools', color: 'text-purple-500 bg-purple-500/10' }
  ]

  return (
    <section id="futures" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Futures Trading</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              Advanced Futures Trading Engine
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Leverage</span>
                <span className="text-2xl font-bold text-white">{leverageValue}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={leverageValue}
                onChange={(e) => setLeverageValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>1x</span><span>25x</span><span>50x</span><span>75x</span><span>100x</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-xl">BTC/USDT</span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded">Perpetual</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Leverage: Up to 100x</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">$67,234.50</div>
                  <div className="text-emerald-400 text-sm">+2.34%</div>
                </div>
              </div>

              <div className="h-40 relative mb-6 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                    <linearGradient id="lineGradientFutures" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 120 Q 50 100, 100 80 T 200 60 T 300 40 T 400 20"
                    fill="none"
                    stroke="url(#lineGradientFutures)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    strokeDashoffset={1000 - chartProgress * 10}
                  />
                  <path
                    d="M 0 120 Q 50 100, 100 80 T 200 60 T 300 40 T 400 20 L 400 160 L 0 160 Z"
                    fill="url(#chartGradient)"
                    opacity="0.5"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-gray-400 text-xs mb-1">Funding</div>
                  <div className="text-white font-semibold">0.01%</div>
                  <div className="text-emerald-400 text-xs">in 4h 23m</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-gray-400 text-xs mb-1">Open Interest</div>
                  <div className="text-white font-semibold">$12.4B</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-gray-400 text-xs mb-1">24h Volume</div>
                  <div className="text-white font-semibold">$45.2B</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">
                  Long / Buy
                </button>
                <button className="py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors">
                  Short / Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== FUNDING ====================
const Funding = () => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const fundingOptions = [
    { icon: Zap, title: 'Instant Funding', description: 'No evaluation required', highlight: 'Get funded immediately', color: 'from-yellow-500 to-orange-500' },
    { icon: Target, title: 'One-Step Challenge', description: 'Pass once and qualify', highlight: 'Single evaluation phase', color: 'from-emerald-500 to-cyan-500' },
    { icon: Award, title: 'Two-Step Challenge', description: 'Higher profit splits', highlight: 'Up to 85% profit share', color: 'from-purple-500 to-pink-500' }
  ]

  const steps = [
    { number: '01', title: 'Choose Plan', description: 'Select your funding option' },
    { number: '02', title: 'Pass Challenge', description: 'Prove your trading skills' },
    { number: '03', title: 'Receive Capital', description: 'Start trading with our funds' }
  ]

  return (
    <section id="funding" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Funding Program</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Get Funded. Trade Bigger.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prove your skills and unlock trading capital from UNICAP MARKET. Trade with our money and keep up to 85% of the profits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {fundingOptions.map((option, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color}`}></div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-6`}>
                <option.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <div className="flex items-center text-emerald-600 font-medium">
                <Check className="w-5 h-5 mr-2" />
                {option.highlight}
              </div>
              <a href="#" className="mt-6 inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h3>
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 hidden md:block">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${(activeStep / 2) * 100}%` }}
              ></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-emerald-50 rounded-full">
              <span className="text-emerald-600 font-semibold">Up to 85% profit share</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== SECURITY ====================
const Security = () => {
  const [assembleProgress, setAssembleProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAssembleProgress(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: Lock, title: 'AES-256 Encryption', description: 'Military-grade encrypted data transmission' },
    { icon: Database, title: 'Enterprise Infrastructure', description: 'Enterprise-grade cloud infrastructure' },
    { icon: Eye, title: '24/7 Monitoring', description: 'Round-the-clock security monitoring systems' },
    { icon: Smartphone, title: 'Multi-Factor Auth', description: 'Advanced multi-factor authentication' },
    { icon: Wallet, title: 'Cold Storage', description: 'Majority of assets in cold wallet storage' },
    { icon: Shield, title: 'Asset Protection', description: 'Comprehensive asset protection reserves' }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-72">
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-500/20"
                style={{
                  background: `conic-gradient(from 0deg, rgba(16, 185, 129, 0.3) ${assembleProgress}%, transparent ${assembleProgress}%)`
                }}
              ></div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform rotate-45">
                  <Shield className="w-16 h-16 text-white transform -rotate-45" />
                </div>
              </div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                  style={{
                    top: `${50 + 40 * Math.sin((i * Math.PI) / 4 + assembleProgress / 20)}%`,
                    left: `${50 + 40 * Math.cos((i * Math.PI) / 4 + assembleProgress / 20)}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.5 + 0.5 * Math.sin(assembleProgress / 10 + i)
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Security</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Built for Maximum Protection
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== ABOUT ====================
const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-3xl">U</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">UNICAP MARKET</h3>
                  <p className="text-emerald-400">Precision Trading. Global Access.</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-500">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
              About UNICAP MARKET
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              UNICAP MARKET is a global digital trading platform focused on innovation, transparency, and performance. Our mission is to empower traders worldwide with institutional-grade tools, lightning-fast execution, and uncompromised security.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We believe that everyone deserves access to professional trading infrastructure. That's why we've built a platform that combines cutting-edge technology with user-friendly design, making sophisticated trading accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all inline-flex items-center justify-center">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#" className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all inline-flex items-center justify-center">
                <BookOpen className="mr-2 w-5 h-5" />
                Read Insights
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== SUPPORT ====================
const Support = () => {
  const supportOptions = [
    { icon: HelpCircle, title: 'Help Center', description: 'Guides & tutorials to help you get started and master the platform.', cta: 'Browse Articles', color: 'from-blue-500 to-indigo-500' },
    { icon: MessageCircle, title: 'FAQ', description: 'Quick answers to the most commonly asked questions.', cta: 'View FAQ', color: 'from-emerald-500 to-cyan-500' },
    { icon: Headphones, title: 'Contact Team', description: '24/7 assistance from our dedicated support team.', cta: 'Get Support', color: 'from-purple-500 to-pink-500' }
  ]

  return (
    <section id="support" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Support</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            We're Here to Help
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get the assistance you need, whenever you need it. Our support team is available around the clock.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <div key={index} className="group text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
              <p className="text-gray-600 mb-6">{option.description}</p>
              <a href="#" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link">
                {option.cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== CTA ====================
const CTA = () => {
  const [waveOffset, setWaveOffset] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-cyan-600 to-emerald-700"
        style={{ backgroundSize: '400% 400%', animation: 'gradientWave 15s ease infinite' }}
      ></div>
      
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="rgba(255,255,255,0.1)" 
            d={`M0,${160 + 20 * Math.sin(waveOffset * Math.PI / 180)}L48,${170 + 15 * Math.sin((waveOffset + 30) * Math.PI / 180)}C96,${180 + 10 * Math.sin((waveOffset + 60) * Math.PI / 180)},192,${200 + 20 * Math.sin((waveOffset + 90) * Math.PI / 180)},288,${192 + 15 * Math.sin((waveOffset + 120) * Math.PI / 180)}C384,${184 + 10 * Math.sin((waveOffset + 150) * Math.PI / 180)},480,${160 + 20 * Math.sin((waveOffset + 180) * Math.PI / 180)},576,${165 + 15 * Math.sin((waveOffset + 210) * Math.PI / 180)}C672,${170 + 10 * Math.sin((waveOffset + 240) * Math.PI / 180)},768,${200 + 20 * Math.sin((waveOffset + 270) * Math.PI / 180)},864,${192 + 15 * Math.sin((waveOffset + 300) * Math.PI / 180)}C960,${184 + 10 * Math.sin((waveOffset + 330) * Math.PI / 180)},1056,${144 + 20 * Math.sin(waveOffset * Math.PI / 180)},1152,${144 + 15 * Math.sin((waveOffset + 30) * Math.PI / 180)}C1248,${144 + 10 * Math.sin((waveOffset + 60) * Math.PI / 180)},1344,${184 + 20 * Math.sin((waveOffset + 90) * Math.PI / 180)},1392,${192 + 15 * Math.sin((waveOffset + 120) * Math.PI / 180)}L1440,${200 + 10 * Math.sin((waveOffset + 150) * Math.PI / 180)}L1440,320L0,320Z`}
          />
        </svg>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="rgba(255,255,255,0.05)" 
            d={`M0,${224 + 15 * Math.sin((waveOffset + 45) * Math.PI / 180)}L48,${213 + 10 * Math.sin((waveOffset + 75) * Math.PI / 180)}C96,${202 + 15 * Math.sin((waveOffset + 105) * Math.PI / 180)},192,${181 + 10 * Math.sin((waveOffset + 135) * Math.PI / 180)},288,${181 + 15 * Math.sin((waveOffset + 165) * Math.PI / 180)}C384,${181 + 10 * Math.sin((waveOffset + 195) * Math.PI / 180)},480,${202 + 15 * Math.sin((waveOffset + 225) * Math.PI / 180)},576,${213 + 10 * Math.sin((waveOffset + 255) * Math.PI / 180)}C672,${224 + 15 * Math.sin((waveOffset + 285) * Math.PI / 180)},768,${224 + 10 * Math.sin((waveOffset + 315) * Math.PI / 180)},864,${213 + 15 * Math.sin((waveOffset + 345) * Math.PI / 180)}C960,${202 + 10 * Math.sin(waveOffset * Math.PI / 180)},1056,${181 + 15 * Math.sin((waveOffset + 30) * Math.PI / 180)},1152,${181 + 10 * Math.sin((waveOffset + 60) * Math.PI / 180)}C1248,${181 + 15 * Math.sin((waveOffset + 90) * Math.PI / 180)},1344,${202 + 10 * Math.sin((waveOffset + 120) * Math.PI / 180)},1392,${213 + 15 * Math.sin((waveOffset + 150) * Math.PI / 180)}L1440,${224 + 10 * Math.sin((waveOffset + 180) * Math.PI / 180)}L1440,320L0,320Z`}
          />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Your Trading Edge Starts Here
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join thousands of traders worldwide using UNICAP MARKET to trade smarter every day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/user/signup')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
          >
            Create Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <a 
            href="#support" 
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center"
          >
            <MessageSquare className="mr-2 w-5 h-5" />
            Contact Sales
          </a>
        </div>
      </div>

      <style>{`
        @keyframes gradientWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}

// ==================== FOOTER ====================
const LandingFooter = () => {
  const footerLinks = {
    Products: ['Markets', 'Futures', 'Earn'],
    Company: ['About', 'Blog', 'Partners', 'Careers'],
    Legal: ['Terms', 'Privacy', 'Risk Disclosure', 'Compliance']
  }

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Youtube, href: '#' },
    { icon: Instagram, href: '#' }
  ]

  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center mb-4">
              <img 
                src="/image/unicap logo light.png" 
                alt="UNICAP MARKETS" 
                className="h-10 w-auto"
              />
            </a>
            <p className="text-gray-400 text-sm mb-4">
              Precision Trading. Global Access.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; 2026 UNICAP MARKET. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Risk Disclosure</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN LANDING PAGE ====================
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Products />
        <Markets />
        <Futures />
        <Funding />
        <Security />
        <About />
        <Support />
        <CTA />
      </main>
      <LandingFooter />
    </div>
  )
}

export default LandingPage
