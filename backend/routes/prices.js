import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import metaApiService from '../services/metaApiService.js'

// Binance symbol mapping for fallback pricing
const BINANCE_MAP = {
  'BTCUSD': 'BTCUSDT', 'ETHUSD': 'ETHUSDT', 'BNBUSD': 'BNBUSDT', 'SOLUSD': 'SOLUSDT',
  'XRPUSD': 'XRPUSDT', 'ADAUSD': 'ADAUSDT', 'DOGEUSD': 'DOGEUSDT', 'DOTUSD': 'DOTUSDT',
  'MATICUSD': 'MATICUSDT', 'LTCUSD': 'LTCUSDT', 'SHIBUSD': 'SHIBUSDT', 'AVAXUSD': 'AVAXUSDT',
  'LINKUSD': 'LINKUSDT', 'UNIUSD': 'UNIUSDT', 'ATOMUSD': 'ATOMUSDT', 'XLMUSD': 'XLMUSDT',
  'NEARUSD': 'NEARUSDT', 'FTMUSD': 'FTMUSDT', 'ALGOUSD': 'ALGOUSDT', 'VETUSD': 'VETUSDT',
  'ICPUSD': 'ICPUSDT', 'FILUSD': 'FILUSDT', 'TRXUSD': 'TRXUSDT', 'ETCUSD': 'ETCUSDT',
  'AAVEUSD': 'AAVEUSDT', 'MKRUSD': 'MKRUSDT', 'SANDUSD': 'SANDUSDT', 'MANAUSD': 'MANAUSDT',
  'AXSUSD': 'AXSUSDT', 'THETAUSD': 'THETAUSDT', 'FLOWUSD': 'FLOWUSDT', 'SNXUSD': 'SNXUSDT',
  'EOSUSD': 'EOSUSDT', 'CHZUSD': 'CHZUSDT', 'ENJUSD': 'ENJUSDT', 'PEPEUSD': 'PEPEUSDT',
  'ARBUSD': 'ARBUSDT', 'OPUSD': 'OPUSDT', 'SUIUSD': 'SUIUSDT', 'APTUSD': 'APTUSDT',
  'INJUSD': 'INJUSDT', 'TONUSD': 'TONUSDT', 'HBARUSD': 'HBARUSDT', 'BCHUSD': 'BCHUSDT',
  'XMRUSD': 'XMRUSDT', 'NEOUSD': 'NEOUSDT',
  // Forex pairs on Binance (some available)
  'EURUSD': null, 'GBPUSD': null, 'USDJPY': null, 'USDCHF': null,
  // Metals - PAXG as gold proxy
  'XAUUSD': null, 'XAGUSD': null
}

// Binance fallback price cache (refreshed periodically)
let binancePriceCache = new Map()
let lastBinanceFetch = 0
const BINANCE_CACHE_TTL = 3000 // 3 seconds

async function fetchBinancePrices() {
  const now = Date.now()
  if (now - lastBinanceFetch < BINANCE_CACHE_TTL && binancePriceCache.size > 0) {
    return binancePriceCache
  }
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/bookTicker')
    if (!res.ok) return binancePriceCache
    const tickers = await res.json()
    const tickerMap = new Map(tickers.map(t => [t.symbol, t]))
    
    // Map our symbols to Binance tickers
    for (const [ourSymbol, binSymbol] of Object.entries(BINANCE_MAP)) {
      if (!binSymbol) continue
      const ticker = tickerMap.get(binSymbol)
      if (ticker) {
        const bid = parseFloat(ticker.bidPrice)
        const ask = parseFloat(ticker.askPrice)
        if (bid > 0 && ask > 0) {
          binancePriceCache.set(ourSymbol, { bid, ask })
        }
      }
    }
    lastBinanceFetch = now
  } catch (e) {
    console.error('[Binance] Fallback price fetch error:', e.message)
  }
  return binancePriceCache
}

// Forex/Metals fallback using multiple free sources
let forexPriceCache = new Map()
let lastForexFetch = 0
const FOREX_CACHE_TTL = 5000 // 5 seconds

const FOREX_PAIRS = {
  'EURUSD': { base: 'EUR', quote: 'USD' },
  'GBPUSD': { base: 'GBP', quote: 'USD' },
  'USDJPY': { base: 'USD', quote: 'JPY' },
  'USDCHF': { base: 'USD', quote: 'CHF' },
  'AUDUSD': { base: 'AUD', quote: 'USD' },
  'NZDUSD': { base: 'NZD', quote: 'USD' },
  'USDCAD': { base: 'USD', quote: 'CAD' },
  'EURGBP': { base: 'EUR', quote: 'GBP' },
  'EURJPY': { base: 'EUR', quote: 'JPY' },
  'GBPJPY': { base: 'GBP', quote: 'JPY' },
  'EURCHF': { base: 'EUR', quote: 'CHF' },
  'EURAUD': { base: 'EUR', quote: 'AUD' },
  'AUDCAD': { base: 'AUD', quote: 'CAD' },
  'AUDJPY': { base: 'AUD', quote: 'JPY' },
  'CADJPY': { base: 'CAD', quote: 'JPY' },
  'XAUUSD': { base: 'XAU', quote: 'USD' },
  'XAGUSD': { base: 'XAG', quote: 'USD' },
}

async function fetchForexPrices() {
  const now = Date.now()
  if (now - lastForexFetch < FOREX_CACHE_TTL && forexPriceCache.size > 0) {
    return forexPriceCache
  }
  try {
    // Try cdn.jsdelivr.net open-source rates (no API key needed)
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
    if (!res.ok) return forexPriceCache
    const data = await res.json()
    if (!data.usd) return forexPriceCache
    
    const rates = data.usd // rates relative to 1 USD
    
    // Currency code mapping (lowercase in API)
    const codeMap = {
      'EUR': 'eur', 'GBP': 'gbp', 'JPY': 'jpy', 'CHF': 'chf',
      'AUD': 'aud', 'NZD': 'nzd', 'CAD': 'cad', 'SGD': 'sgd',
      'HKD': 'hkd', 'ZAR': 'zar', 'TRY': 'try', 'MXN': 'mxn',
      'PLN': 'pln', 'SEK': 'sek', 'NOK': 'nok', 'DKK': 'dkk',
      'CNH': 'cny', 'XAU': 'xau', 'XAG': 'xag'
    }
    
    for (const [symbol, pair] of Object.entries(FOREX_PAIRS)) {
      let mid = null
      const baseCode = codeMap[pair.base]
      const quoteCode = codeMap[pair.quote]
      
      if (pair.base === 'USD' && quoteCode && rates[quoteCode]) {
        // USDXXX = rate directly
        mid = rates[quoteCode]
      } else if (pair.quote === 'USD' && baseCode && rates[baseCode]) {
        // XXXUSD = 1 / rate
        mid = 1 / rates[baseCode]
      } else if (baseCode && quoteCode && rates[baseCode] && rates[quoteCode]) {
        // Cross pair: XXXYYY = (1/baseRate) * quoteRate
        mid = rates[quoteCode] / rates[baseCode]
      }
      
      if (mid && mid > 0) {
        // Add realistic spread based on instrument type
        let spreadPips = 0.00010 // 1 pip for major forex
        if (symbol.includes('JPY')) spreadPips = 0.010
        if (symbol.startsWith('XAU')) spreadPips = mid * 0.0003 // ~0.03% for gold
        if (symbol.startsWith('XAG')) spreadPips = mid * 0.0005 // ~0.05% for silver
        
        const halfSpread = spreadPips / 2
        forexPriceCache.set(symbol, { bid: mid - halfSpread, ask: mid + halfSpread })
      }
    }
    lastForexFetch = now
    if (forexPriceCache.size > 0) {
      console.log(`[Forex] Fallback: ${forexPriceCache.size} forex/metals prices loaded`)
    }
  } catch (e) {
    console.error('[Forex] Fallback price fetch error:', e.message)
  }
  return forexPriceCache
}

const router = express.Router()

// Popular instruments per category (shown by default - 15 max)
const POPULAR_INSTRUMENTS = {
  Forex: ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'NZDUSD', 'USDCAD', 'EURGBP', 'EURJPY', 'GBPJPY', 'EURCHF', 'EURAUD', 'AUDCAD', 'AUDJPY', 'CADJPY'],
  Metals: ['XAUUSD', 'XAGUSD', 'XPTUSD', 'XPDUSD', 'XAUEUR', 'XAUAUD', 'XAUGBP', 'XAUCHF', 'XAUJPY', 'XAGEUR'],
  Energy: ['USOIL', 'UKOIL', 'NGAS', 'BRENT', 'WTI', 'GASOLINE', 'HEATING'],
  Crypto: ['BTCUSD', 'ETHUSD', 'BNBUSD', 'SOLUSD', 'XRPUSD', 'ADAUSD', 'DOGEUSD', 'DOTUSD', 'MATICUSD', 'LTCUSD', 'AVAXUSD', 'LINKUSD', 'SHIBUSD', 'UNIUSD', 'ATOMUSD'],
  Stocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'JPM', 'V', 'JNJ', 'WMT', 'PG', 'MA', 'UNH', 'HD']
}

// Use MetaApi service for categorization
function categorizeSymbol(symbol) {
  return metaApiService.categorizeSymbol(symbol)
}

// Default instruments fallback
function getDefaultInstruments() {
  return [
    { symbol: 'EURUSD', name: 'EUR/USD', category: 'Forex', digits: 5 },
    { symbol: 'GBPUSD', name: 'GBP/USD', category: 'Forex', digits: 5 },
    { symbol: 'USDJPY', name: 'USD/JPY', category: 'Forex', digits: 3 },
    { symbol: 'USDCHF', name: 'USD/CHF', category: 'Forex', digits: 5 },
    { symbol: 'AUDUSD', name: 'AUD/USD', category: 'Forex', digits: 5 },
    { symbol: 'NZDUSD', name: 'NZD/USD', category: 'Forex', digits: 5 },
    { symbol: 'USDCAD', name: 'USD/CAD', category: 'Forex', digits: 5 },
    { symbol: 'EURGBP', name: 'EUR/GBP', category: 'Forex', digits: 5 },
    { symbol: 'EURJPY', name: 'EUR/JPY', category: 'Forex', digits: 3 },
    { symbol: 'GBPJPY', name: 'GBP/JPY', category: 'Forex', digits: 3 },
    { symbol: 'XAUUSD', name: 'Gold', category: 'Metals', digits: 2 },
    { symbol: 'XAGUSD', name: 'Silver', category: 'Metals', digits: 3 },
    { symbol: 'BTCUSD', name: 'Bitcoin', category: 'Crypto', digits: 2 },
    { symbol: 'ETHUSD', name: 'Ethereum', category: 'Crypto', digits: 2 },
  ]
}

// GET /api/prices/instruments - Get all available instruments
router.get('/instruments', async (req, res) => {
  try {
    console.log('[MetaApi] Returning supported instruments')
    
    // Get price cache from MetaApi service
    const priceCache = metaApiService.getPriceCache()
    const symbolsWithPrices = Array.from(priceCache.keys())
    
    // If MetaApi has live data, use those symbols
    // Otherwise, fall back to ALL known symbols so the UI isn't empty
    const symbolList = symbolsWithPrices.length > 0
      ? symbolsWithPrices
      : [...new Set([
          ...metaApiService.FOREX_SYMBOLS,
          ...metaApiService.METAL_SYMBOLS,
          ...metaApiService.ENERGY_SYMBOLS,
          ...metaApiService.CRYPTO_SYMBOLS,
          ...metaApiService.STOCK_SYMBOLS
        ])]
    
    const instruments = symbolList.map(symbol => {
      const category = categorizeSymbol(symbol)
      const isPopular = POPULAR_INSTRUMENTS[category]?.includes(symbol) || false
      return {
        symbol,
        name: getInstrumentName(symbol),
        category,
        digits: getDigits(symbol),
        contractSize: getContractSize(symbol),
        minVolume: 0.01,
        maxVolume: 100,
        volumeStep: 0.01,
        popular: isPopular
      }
    })
    
    console.log('[MetaApi] Returning', instruments.length, 'instruments', symbolsWithPrices.length > 0 ? '(live)' : '(fallback)')
    res.json({ success: true, instruments })
  } catch (error) {
    console.error('[MetaApi] Error fetching instruments:', error)
    res.json({ success: true, instruments: getDefaultInstruments() })
  }
})

// Helper to get instrument display name
function getInstrumentName(symbol) {
  const names = {
    // Forex Majors & Crosses
    'EURUSD': 'EUR/USD', 'GBPUSD': 'GBP/USD', 'USDJPY': 'USD/JPY', 'USDCHF': 'USD/CHF',
    'AUDUSD': 'AUD/USD', 'NZDUSD': 'NZD/USD', 'USDCAD': 'USD/CAD', 'EURGBP': 'EUR/GBP',
    'EURJPY': 'EUR/JPY', 'GBPJPY': 'GBP/JPY', 'EURCHF': 'EUR/CHF', 'EURAUD': 'EUR/AUD',
    'EURCAD': 'EUR/CAD', 'GBPAUD': 'GBP/AUD', 'GBPCAD': 'GBP/CAD', 'AUDCAD': 'AUD/CAD',
    'AUDJPY': 'AUD/JPY', 'CADJPY': 'CAD/JPY', 'CHFJPY': 'CHF/JPY', 'NZDJPY': 'NZD/JPY',
    'AUDNZD': 'AUD/NZD', 'CADCHF': 'CAD/CHF', 'GBPCHF': 'GBP/CHF', 'GBPNZD': 'GBP/NZD',
    'EURNZD': 'EUR/NZD', 'NZDCAD': 'NZD/CAD', 'NZDCHF': 'NZD/CHF', 'AUDCHF': 'AUD/CHF',
    // Exotics
    'USDSGD': 'USD/SGD', 'EURSGD': 'EUR/SGD', 'GBPSGD': 'GBP/SGD', 'USDZAR': 'USD/ZAR',
    'USDTRY': 'USD/TRY', 'EURTRY': 'EUR/TRY', 'USDMXN': 'USD/MXN', 'USDPLN': 'USD/PLN',
    'USDSEK': 'USD/SEK', 'USDNOK': 'USD/NOK', 'USDDKK': 'USD/DKK', 'USDCNH': 'USD/CNH',
    // Metals
    'XAUUSD': 'Gold', 'XAGUSD': 'Silver', 'XPTUSD': 'Platinum', 'XPDUSD': 'Palladium',
    // Commodities
    'USOIL': 'US Oil', 'UKOIL': 'UK Oil', 'NGAS': 'Natural Gas', 'COPPER': 'Copper',
    // Crypto
    'BTCUSD': 'Bitcoin', 'ETHUSD': 'Ethereum', 'BNBUSD': 'BNB', 'SOLUSD': 'Solana',
    'XRPUSD': 'XRP', 'ADAUSD': 'Cardano', 'DOGEUSD': 'Dogecoin', 'TRXUSD': 'TRON',
    'LINKUSD': 'Chainlink', 'MATICUSD': 'Polygon', 'DOTUSD': 'Polkadot',
    'SHIBUSD': 'Shiba Inu', 'LTCUSD': 'Litecoin', 'BCHUSD': 'Bitcoin Cash', 'AVAXUSD': 'Avalanche',
    'XLMUSD': 'Stellar', 'UNIUSD': 'Uniswap', 'ATOMUSD': 'Cosmos', 'ETCUSD': 'Ethereum Classic',
    'FILUSD': 'Filecoin', 'ICPUSD': 'Internet Computer', 'VETUSD': 'VeChain',
    'NEARUSD': 'NEAR Protocol', 'GRTUSD': 'The Graph', 'AAVEUSD': 'Aave', 'MKRUSD': 'Maker',
    'ALGOUSD': 'Algorand', 'FTMUSD': 'Fantom', 'SANDUSD': 'The Sandbox', 'MANAUSD': 'Decentraland',
    'AXSUSD': 'Axie Infinity', 'THETAUSD': 'Theta Network', 'XMRUSD': 'Monero', 'FLOWUSD': 'Flow',
    'SNXUSD': 'Synthetix', 'EOSUSD': 'EOS', 'CHZUSD': 'Chiliz', 'ENJUSD': 'Enjin Coin',
    'PEPEUSD': 'Pepe', 'ARBUSD': 'Arbitrum', 'OPUSD': 'Optimism', 'SUIUSD': 'Sui',
    'APTUSD': 'Aptos', 'INJUSD': 'Injective', 'TONUSD': 'Toncoin', 'HBARUSD': 'Hedera',
    // Commodities
    'GASOLINE': 'Gasoline', 'CATTLE': 'Live Cattle', 'COCOA': 'Cocoa', 'COFFEE': 'Coffee', 'CORN': 'Corn', 'COTTON': 'Cotton', 'ALUMINUM': 'Aluminum',
    // Indices
    'AEX': 'AEX Index', 'AUS200': 'Australia 200', 'CAC40': 'CAC 40', 'CAN60': 'Canada 60',
    'CN50': 'China 50', 'DAX': 'DAX German', 'DXY': 'US Dollar Index', 'EU50': 'Euro Stoxx 50',
    'EURX': 'Euro Index', 'GERMID50': 'MDAX 50',
    // Stocks
    'AAPL': 'Apple Inc', 'MSFT': 'Microsoft', 'GOOGL': 'Alphabet', 'AA': 'Alcoa Corp',
    'AAL': 'American Airlines', 'AAP': 'Advance Auto Parts', 'ABBV': 'AbbVie Inc',
    'ADBE': 'Adobe Inc', 'AIG': 'American Intl Group', 'AMD': 'AMD'
  }
  return names[symbol] || symbol
}

// Helper to get digits for symbol
function getDigits(symbol) {
  if (symbol.includes('JPY')) return 3
  if (symbol === 'XAUUSD') return 2
  if (symbol === 'XAGUSD') return 3
  const category = categorizeSymbol(symbol)
  if (category === 'Crypto') return 2
  if (category === 'Stocks') return 2
  return 5
}

// Helper to get contract size
function getContractSize(symbol) {
  const category = categorizeSymbol(symbol)
  if (category === 'Crypto') return 1
  if (category === 'Metals') return 100
  if (category === 'Energy') return 1000
  return 100000 // Forex default
}

// GET /api/prices/:symbol - Get single symbol price
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
    
    // 1. Try MetaApi cache
    let price = metaApiService.getPrice(symbol)
    
    // 2. Try MetaApi terminal state
    if (!price) {
      price = await metaApiService.fetchPriceREST(symbol)
    }
    
    // 3. Fallback to Binance/Forex
    if (!price) {
      const binancePrices = await fetchBinancePrices()
      const bp = binancePrices.get(symbol)
      if (bp) price = bp
    }
    if (!price) {
      const forexPrices = await fetchForexPrices()
      const fp = forexPrices.get(symbol)
      if (fp) price = fp
    }
    
    if (price) {
      res.json({ success: true, price: { bid: price.bid, ask: price.ask } })
    } else {
      res.status(404).json({ success: false, message: 'Price not available' })
    }
  } catch (error) {
    console.error('[Prices] Error fetching price:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/prices/batch - Get multiple symbol prices
router.post('/batch', async (req, res) => {
  try {
    const { symbols } = req.body
    if (!symbols || !Array.isArray(symbols)) {
      return res.status(400).json({ success: false, message: 'symbols array required' })
    }
    
    const prices = {}
    const missingSymbols = []
    
    // 1. Try MetaApi cache first
    for (const symbol of symbols) {
      const cached = metaApiService.getPrice(symbol)
      if (cached) {
        prices[symbol] = { bid: cached.bid, ask: cached.ask }
      } else {
        missingSymbols.push(symbol)
      }
    }
    
    // 2. Try MetaApi terminal state for missing
    if (missingSymbols.length > 0) {
      const batchPrices = await metaApiService.fetchBatchPricesREST(missingSymbols)
      for (const [symbol, price] of Object.entries(batchPrices)) {
        prices[symbol] = { bid: price.bid, ask: price.ask }
        const idx = missingSymbols.indexOf(symbol)
        if (idx > -1) missingSymbols.splice(idx, 1)
      }
    }
    
    // 3. Fallback: Binance for crypto, exchangerate for forex/metals
    if (missingSymbols.length > 0) {
      const [binancePrices, forexPrices] = await Promise.all([
        fetchBinancePrices(),
        fetchForexPrices()
      ])
      
      for (const symbol of missingSymbols) {
        const bp = binancePrices.get(symbol)
        if (bp) {
          prices[symbol] = { bid: bp.bid, ask: bp.ask }
          continue
        }
        const fp = forexPrices.get(symbol)
        if (fp) {
          prices[symbol] = { bid: fp.bid, ask: fp.ask }
        }
      }
    }
    
    res.json({ success: true, prices })
  } catch (error) {
    console.error('[Prices] Error fetching batch prices:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
