// Price Service - Real-time market data via Binance + Exchange Rate APIs
// Reliable free APIs for Forex, Crypto, and Metals
import dotenv from 'dotenv'

dotenv.config()

// Price cache
const priceCache = new Map()

// Callbacks
let onPriceUpdate = null

// Binance symbol mapping (our symbol -> Binance symbol)
const BINANCE_MAP = {
  'BTCUSD': 'BTCUSDT', 'ETHUSD': 'ETHUSDT', 'BNBUSD': 'BNBUSDT', 'SOLUSD': 'SOLUSDT',
  'XRPUSD': 'XRPUSDT', 'ADAUSD': 'ADAUSDT', 'DOGEUSD': 'DOGEUSDT', 'DOTUSD': 'DOTUSDT',
  'MATICUSD': 'MATICUSDT', 'LTCUSD': 'LTCUSDT', 'SHIBUSD': 'SHIBUSDT', 'AVAXUSD': 'AVAXUSDT',
  'LINKUSD': 'LINKUSDT', 'UNIUSD': 'UNIUSDT', 'ATOMUSD': 'ATOMUSDT', 'XLMUSD': 'XLMUSDT',
  'TRXUSD': 'TRXUSDT', 'ETCUSD': 'ETCUSDT', 'FILUSD': 'FILUSDT', 'ICPUSD': 'ICPUSDT',
  'BCHUSD': 'BCHUSDT'
}

class PriceService {
  constructor() {
    this.isConnected = false
    this.fetchInterval = null
  }

  setOnPriceUpdate(callback) {
    onPriceUpdate = callback
  }

  getPriceCache() {
    return priceCache
  }

  getPrice(symbol) {
    return priceCache.get(symbol)
  }

  async connect() {
    console.log('[Prices] Initializing price service...')
    
    await this.fetchAllPrices()
    
    // Fetch every 2 seconds
    this.fetchInterval = setInterval(() => this.fetchAllPrices(), 2000)
    
    this.isConnected = true
    console.log('[Prices] Service connected, cache size:', priceCache.size)
  }

  disconnect() {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval)
      this.fetchInterval = null
    }
    this.isConnected = false
    console.log('[Prices] Disconnected')
  }

  async fetchAllPrices() {
    try {
      await Promise.all([
        this.fetchBinancePrices(),
        this.fetchForexPrices()
      ])
      
      // Emit all prices
      if (onPriceUpdate && priceCache.size > 0) {
        for (const [symbol, price] of priceCache.entries()) {
          onPriceUpdate(symbol, price)
        }
      }
    } catch (e) {
      console.error('[Prices] Fetch error:', e.message)
    }
  }

  // Fetch crypto from Binance
  async fetchBinancePrices() {
    try {
      const res = await fetch('https://api.binance.com/api/v3/ticker/bookTicker')
      if (!res.ok) return
      
      const tickers = await res.json()
      const tickerMap = new Map(tickers.map(t => [t.symbol, t]))
      
      for (const [ourSymbol, binSymbol] of Object.entries(BINANCE_MAP)) {
        const ticker = tickerMap.get(binSymbol)
        if (ticker) {
          const bid = parseFloat(ticker.bidPrice)
          const ask = parseFloat(ticker.askPrice)
          if (bid > 0 && ask > 0) {
            priceCache.set(ourSymbol, { bid, ask, mid: (bid + ask) / 2, time: Date.now() })
          }
        }
      }
    } catch (e) {
      console.error('[Binance] Error:', e.message)
    }
  }

  // Fetch forex and metals from exchange rate API
  async fetchForexPrices() {
    try {
      const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
      if (!res.ok) return
      
      const data = await res.json()
      if (!data.usd) return
      
      const rates = data.usd
      
      // Currency code mapping
      const codeMap = {
        'EUR': 'eur', 'GBP': 'gbp', 'JPY': 'jpy', 'CHF': 'chf',
        'AUD': 'aud', 'NZD': 'nzd', 'CAD': 'cad', 'SGD': 'sgd',
        'HKD': 'hkd', 'ZAR': 'zar', 'TRY': 'try', 'MXN': 'mxn',
        'PLN': 'pln', 'SEK': 'sek', 'NOK': 'nok', 'DKK': 'dkk',
        'CNH': 'cny'
      }
      
      // Forex pairs
      const forexPairs = [
        'EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'NZDUSD', 'USDCAD',
        'EURGBP', 'EURJPY', 'GBPJPY', 'EURCHF', 'EURAUD', 'EURCAD', 'AUDCAD',
        'AUDJPY', 'CADJPY', 'CHFJPY', 'NZDJPY', 'AUDNZD', 'GBPCHF', 'GBPAUD',
        'GBPCAD', 'GBPNZD', 'EURNZD', 'NZDCAD', 'AUDCHF', 'CADCHF', 'NZDCHF'
      ]
      
      for (const symbol of forexPairs) {
        const base = symbol.substring(0, 3)
        const quote = symbol.substring(3, 6)
        const baseCode = codeMap[base]
        const quoteCode = codeMap[quote]
        
        let mid = null
        if (base === 'USD' && quoteCode && rates[quoteCode]) {
          mid = rates[quoteCode]
        } else if (quote === 'USD' && baseCode && rates[baseCode]) {
          mid = 1 / rates[baseCode]
        } else if (baseCode && quoteCode && rates[baseCode] && rates[quoteCode]) {
          mid = rates[quoteCode] / rates[baseCode]
        }
        
        if (mid && mid > 0) {
          let spread = symbol.includes('JPY') ? 0.01 : 0.0001
          priceCache.set(symbol, { bid: mid - spread/2, ask: mid + spread/2, mid, time: Date.now() })
        }
      }
      
      // Metals - Gold and Silver
      if (rates.xau && rates.xau > 0) {
        const gold = 1 / rates.xau
        const spread = gold * 0.0003
        priceCache.set('XAUUSD', { bid: gold - spread, ask: gold + spread, mid: gold, time: Date.now() })
        
        // Cross rates for gold
        if (rates.eur) priceCache.set('XAUEUR', { bid: gold * rates.eur - spread, ask: gold * rates.eur + spread, mid: gold * rates.eur, time: Date.now() })
        if (rates.aud) priceCache.set('XAUAUD', { bid: gold * rates.aud - spread, ask: gold * rates.aud + spread, mid: gold * rates.aud, time: Date.now() })
        if (rates.gbp) priceCache.set('XAUGBP', { bid: gold * rates.gbp - spread, ask: gold * rates.gbp + spread, mid: gold * rates.gbp, time: Date.now() })
        if (rates.chf) priceCache.set('XAUCHF', { bid: gold * rates.chf - spread, ask: gold * rates.chf + spread, mid: gold * rates.chf, time: Date.now() })
        if (rates.jpy) priceCache.set('XAUJPY', { bid: gold * rates.jpy - spread*100, ask: gold * rates.jpy + spread*100, mid: gold * rates.jpy, time: Date.now() })
      }
      
      if (rates.xag && rates.xag > 0) {
        const silver = 1 / rates.xag
        const spread = silver * 0.0005
        priceCache.set('XAGUSD', { bid: silver - spread, ask: silver + spread, mid: silver, time: Date.now() })
        if (rates.eur) priceCache.set('XAGEUR', { bid: silver * rates.eur - spread, ask: silver * rates.eur + spread, mid: silver * rates.eur, time: Date.now() })
      }
      
      // Platinum and Palladium (approximate)
      if (rates.xpt && rates.xpt > 0) {
        const platinum = 1 / rates.xpt
        const spread = platinum * 0.001
        priceCache.set('XPTUSD', { bid: platinum - spread, ask: platinum + spread, mid: platinum, time: Date.now() })
      }
      if (rates.xpd && rates.xpd > 0) {
        const palladium = 1 / rates.xpd
        const spread = palladium * 0.001
        priceCache.set('XPDUSD', { bid: palladium - spread, ask: palladium + spread, mid: palladium, time: Date.now() })
      }
      
    } catch (e) {
      console.error('[Forex] Error:', e.message)
    }
  }

  async fetchPrice(symbol) {
    await this.fetchAllPrices()
    return priceCache.get(symbol) || null
  }

  categorizeSymbol(symbol) {
    if (symbol.startsWith('XAU') || symbol.startsWith('XAG') || symbol.startsWith('XPT') || symbol.startsWith('XPD')) return 'Metals'
    if (['USOIL', 'UKOIL', 'NGAS', 'BRENT', 'WTI'].includes(symbol)) return 'Energy'
    if (['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'LTC', 'SHIB', 'AVAX', 'LINK', 'DOT', 'MATIC', 'TRX', 'UNI', 'ATOM', 'XLM', 'ETC', 'FIL', 'ICP', 'BCH'].some(c => symbol.startsWith(c))) return 'Crypto'
    if (symbol.length <= 5 && !symbol.includes('USD')) return 'Stocks'
    return 'Forex'
  }
}

export default new PriceService()
