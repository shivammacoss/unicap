// Price Service — Infoway WebSocket tick-by-tick (2 connections: crypto + common) + REST fallback
import dotenv from 'dotenv'
import WebSocket from 'ws'

dotenv.config()

const priceCache = new Map()
let onPriceUpdate = null

/** REST must not overwrite symbols that got a WS tick recently */
const wsLastTick = new Map()
const REST_BACKOFF_MS = 10000

const BINANCE_MAP = {
  'BTCUSD': 'BTCUSDT', 'ETHUSD': 'ETHUSDT', 'BNBUSD': 'BNBUSDT', 'SOLUSD': 'SOLUSDT',
  'XRPUSD': 'XRPUSDT', 'ADAUSD': 'ADAUSDT', 'DOGEUSD': 'DOGEUSDT', 'DOTUSD': 'DOTUSDT',
  'MATICUSD': 'MATICUSDT', 'LTCUSD': 'LTCUSDT', 'SHIBUSD': 'SHIBUSDT', 'AVAXUSD': 'AVAXUSDT',
  'LINKUSD': 'LINKUSDT', 'UNIUSD': 'UNIUSDT', 'ATOMUSD': 'ATOMUSDT', 'XLMUSD': 'XLMUSDT',
  'TRXUSD': 'TRXUSDT', 'ETCUSD': 'ETCUSDT', 'FILUSD': 'FILUSDT', 'ICPUSD': 'ICPUSDT',
  'BCHUSD': 'BCHUSDT'
}

const INFOWAY_CRYPTO_SYMBOLS = Object.values(BINANCE_MAP).join(',')

const COMMON_SYMBOLS = [
  'EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'NZDUSD', 'USDCAD',
  'EURGBP', 'EURJPY', 'GBPJPY', 'EURCHF', 'EURAUD', 'EURCAD', 'AUDCAD',
  'AUDJPY', 'CADJPY', 'CHFJPY', 'NZDJPY', 'AUDNZD', 'GBPCHF', 'GBPAUD',
  'GBPCAD', 'GBPNZD', 'EURNZD', 'NZDCAD', 'AUDCHF', 'CADCHF', 'NZDCHF',
  'XAUUSD', 'XAGUSD', 'XPTUSD', 'XPDUSD',
  'XAUEUR', 'XAUAUD', 'XAUGBP', 'XAUCHF', 'XAUJPY', 'XAGEUR'
]

const INFOWAY_COMMON_SYMBOLS = COMMON_SYMBOLS.join(',')

function normalizeInfowayToOurs(s) {
  if (typeof s !== 'string') return null
  const u = s.toUpperCase()
  if (u.endsWith('USDT')) return u.slice(0, -2) + 'USD'
  return u
}

function emitInfowayTick(symbol, data) {
  if (!symbol || !data) return
  wsLastTick.set(symbol, Date.now())
  const row = { ...data, time: Date.now() }
  priceCache.set(symbol, row)
  if (onPriceUpdate) onPriceUpdate(symbol, row)
}

function applyRestPrice(symbol, data) {
  if (!symbol || !data) return
  const last = wsLastTick.get(symbol)
  if (last && Date.now() - last < REST_BACKOFF_MS) return
  const row = { ...data, time: Date.now() }
  priceCache.set(symbol, row)
  if (onPriceUpdate) onPriceUpdate(symbol, row)
}

function wsMsgCode(msg) {
  const c = msg?.code
  if (c === undefined || c === null) return NaN
  const n = Number(c)
  return Number.isFinite(n) ? n : NaN
}

function handleInfowayMessage(msg, label, debugCounter) {
  const code = wsMsgCode(msg)
  const data = msg?.data
  if (debugCounter.count > 0) {
    debugCounter.count--
    console.log(`[Infoway:${label}]`, JSON.stringify(msg).slice(0, 720))
  }
  if (code === 10005 && data) {
    const s = normalizeInfowayToOurs(data.s)
    const b = data.b?.[0]?.[0]
    const a = data.a?.[0]?.[0]
    if (s && b && a) {
      const bid = parseFloat(b)
      const ask = parseFloat(a)
      if (bid > 0 && ask > 0) {
        emitInfowayTick(s, { bid, ask, mid: (bid + ask) / 2 })
      }
    }
    return
  }
  if (code === 10002 && data) {
    const s = normalizeInfowayToOurs(data.s)
    const p = parseFloat(data.p)
    if (s && p > 0) {
      const spr = s.includes('JPY') ? p * 0.00005 : p * 0.0001
      emitInfowayTick(s, { bid: p - spr, ask: p + spr, mid: p })
    }
  }
}

function createInfowayConnection({ business, codesCsv, label, onAttemptReset }) {
  const apiKey = process.env.INFOWAY_API_KEY?.trim()
  if (!apiKey) return { ws: null, heartbeat: null }

  const url = `wss://data.infoway.io/ws?business=${encodeURIComponent(business)}&apikey=${encodeURIComponent(apiKey)}`
  let ws
  try {
    ws = new WebSocket(url)
  } catch (e) {
    console.error(`[Infoway:${label}] create failed:`, e.message)
    return { ws: null, heartbeat: null }
  }

  const debugCounter = { count: 8 }

  ws.on('open', () => {
    if (onAttemptReset) onAttemptReset()
    console.log(`[Infoway:${label}] open (${business})`)
    const trace = `${label}-${Date.now()}-${Math.random().toString(36).slice(2)}`
    ws.send(JSON.stringify({
      code: 10003,
      trace: `${trace}-depth`,
      data: { codes: codesCsv }
    }))
    setTimeout(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          code: 10000,
          trace: `${trace}-trade`,
          data: { codes: codesCsv }
        }))
      }
    }, 3500)
  })

  ws.on('message', (raw) => {
    try {
      handleInfowayMessage(JSON.parse(raw.toString()), label, debugCounter)
    } catch (_) {}
  })

  ws.on('error', (err) => {
    console.error(`[Infoway:${label}]`, err.message)
  })

  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ code: 10010, trace: `hb-${label}-${Date.now()}` }))
    }
  }, 30000)

  return { ws, heartbeat }
}

class PriceService {
  constructor() {
    this.isConnected = false
    this.fetchInterval = null
    this.useInfoway = false

    this.cryptoWs = null
    this.cryptoHb = null
    this.commonWs = null
    this.commonHb = null

    this.cryptoReconnectTimer = null
    this.commonReconnectTimer = null
    this.cryptoAttempts = 0
    this.commonAttempts = 0
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

  clearInfowayTimers() {
    if (this.cryptoReconnectTimer) {
      clearTimeout(this.cryptoReconnectTimer)
      this.cryptoReconnectTimer = null
    }
    if (this.commonReconnectTimer) {
      clearTimeout(this.commonReconnectTimer)
      this.commonReconnectTimer = null
    }
    if (this.cryptoHb) {
      clearInterval(this.cryptoHb)
      this.cryptoHb = null
    }
    if (this.commonHb) {
      clearInterval(this.commonHb)
      this.commonHb = null
    }
  }

  closeInfowaySockets() {
    this.clearInfowayTimers()
    if (this.cryptoWs) {
      try {
        this.cryptoWs.close()
      } catch (_) {}
      this.cryptoWs = null
    }
    if (this.commonWs) {
      try {
        this.commonWs.close()
      } catch (_) {}
      this.commonWs = null
    }
  }

  wireCloseHandler(ws, label, scheduleReconnect) {
    ws.on('close', () => {
      if (label === 'crypto' && this.cryptoWs === ws) {
        if (this.cryptoHb) {
          clearInterval(this.cryptoHb)
          this.cryptoHb = null
        }
        this.cryptoWs = null
      }
      if (label === 'common' && this.commonWs === ws) {
        if (this.commonHb) {
          clearInterval(this.commonHb)
          this.commonHb = null
        }
        this.commonWs = null
      }
      console.log(`[Infoway:${label}] closed`)
      scheduleReconnect()
    })
  }

  scheduleCryptoReconnect() {
    if (this.cryptoReconnectTimer || !this.useInfoway) return
    const delay = Math.min(4000 * Math.pow(2, this.cryptoAttempts), 60000)
    this.cryptoAttempts++
    console.log(`[Infoway:crypto] reconnect in ${delay}ms (#${this.cryptoAttempts})`)
    this.cryptoReconnectTimer = setTimeout(() => {
      this.cryptoReconnectTimer = null
      this.startCryptoSocket()
    }, delay)
  }

  scheduleCommonReconnect() {
    if (this.commonReconnectTimer || !this.useInfoway) return
    const delay = Math.min(4000 * Math.pow(2, this.commonAttempts), 60000)
    this.commonAttempts++
    console.log(`[Infoway:common] reconnect in ${delay}ms (#${this.commonAttempts})`)
    this.commonReconnectTimer = setTimeout(() => {
      this.commonReconnectTimer = null
      this.startCommonSocket()
    }, delay)
  }

  startCryptoSocket() {
    const { ws, heartbeat } = createInfowayConnection({
      business: 'crypto',
      codesCsv: INFOWAY_CRYPTO_SYMBOLS,
      label: 'crypto',
      onAttemptReset: () => {
        this.cryptoAttempts = 0
      }
    })
    if (!ws) {
      this.scheduleCryptoReconnect()
      return
    }
    this.cryptoWs = ws
    this.cryptoHb = heartbeat
    this.wireCloseHandler(ws, 'crypto', () => this.scheduleCryptoReconnect())
  }

  startCommonSocket() {
    const { ws, heartbeat } = createInfowayConnection({
      business: 'common',
      codesCsv: INFOWAY_COMMON_SYMBOLS,
      label: 'common',
      onAttemptReset: () => {
        this.commonAttempts = 0
      }
    })
    if (!ws) {
      this.scheduleCommonReconnect()
      return
    }
    this.commonWs = ws
    this.commonHb = heartbeat
    this.wireCloseHandler(ws, 'common', () => this.scheduleCommonReconnect())
  }

  connectInfoway() {
    this.closeInfowaySockets()
    this.startCryptoSocket()
    setTimeout(() => this.startCommonSocket(), 400)
  }

  async connect() {
    console.log('[Prices] Initializing price service...')

    await this.fetchAllPrices()

    this.useInfoway = !!process.env.INFOWAY_API_KEY?.trim()
    if (this.useInfoway) {
      this.connectInfoway()
    }

    this.fetchInterval = setInterval(() => this.fetchAllPrices(), 2000)

    this.isConnected = true
    console.log(
      '[Prices] Service connected, cache size:',
      priceCache.size,
      this.useInfoway ? '(Infoway crypto+common WS, tick-first)' : ''
    )
  }

  disconnect() {
    this.useInfoway = false
    this.closeInfowaySockets()
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval)
      this.fetchInterval = null
    }
    this.isConnected = false
    console.log('[Prices] Disconnected')
  }

  async fetchAllPrices() {
    try {
      await Promise.all([this.fetchBinancePrices(), this.fetchForexPrices()])

      if (onPriceUpdate && priceCache.size > 0 && !this.useInfoway) {
        for (const [symbol, price] of priceCache.entries()) {
          onPriceUpdate(symbol, price)
        }
      }
    } catch (e) {
      console.error('[Prices] Fetch error:', e.message)
    }
  }

  async fetchBinancePrices() {
    try {
      const res = await fetch('https://api.binance.com/api/v3/ticker/bookTicker')
      if (!res.ok) return

      const tickers = await res.json()
      const tickerMap = new Map(tickers.map((t) => [t.symbol, t]))

      for (const [ourSymbol, binSymbol] of Object.entries(BINANCE_MAP)) {
        const ticker = tickerMap.get(binSymbol)
        if (ticker) {
          const bid = parseFloat(ticker.bidPrice)
          const ask = parseFloat(ticker.askPrice)
          if (bid > 0 && ask > 0) {
            applyRestPrice(ourSymbol, { bid, ask, mid: (bid + ask) / 2 })
          }
        }
      }
    } catch (e) {
      console.error('[Binance] Error:', e.message)
    }
  }

  async fetchForexPrices() {
    try {
      let data = null
      const urls = [
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
        'https://latest.currency-api.pages.dev/v1/currencies/usd.json'
      ]

      for (const url of urls) {
        try {
          const res = await fetch(url, { timeout: 5000 })
          if (res.ok) {
            data = await res.json()
            if (data.usd) break
          }
        } catch (e) {
          continue
        }
      }

      if (!data || !data.usd) return

      const rates = data.usd
      const codeMap = {
        EUR: 'eur',
        GBP: 'gbp',
        JPY: 'jpy',
        CHF: 'chf',
        AUD: 'aud',
        NZD: 'nzd',
        CAD: 'cad',
        SGD: 'sgd',
        HKD: 'hkd',
        ZAR: 'zar',
        TRY: 'try',
        MXN: 'mxn',
        PLN: 'pln',
        SEK: 'sek',
        NOK: 'nok',
        DKK: 'dkk',
        CNH: 'cny'
      }

      const forexPairs = [
        'EURUSD',
        'GBPUSD',
        'USDJPY',
        'USDCHF',
        'AUDUSD',
        'NZDUSD',
        'USDCAD',
        'EURGBP',
        'EURJPY',
        'GBPJPY',
        'EURCHF',
        'EURAUD',
        'EURCAD',
        'AUDCAD',
        'AUDJPY',
        'CADJPY',
        'CHFJPY',
        'NZDJPY',
        'AUDNZD',
        'GBPCHF',
        'GBPAUD',
        'GBPCAD',
        'GBPNZD',
        'EURNZD',
        'NZDCAD',
        'AUDCHF',
        'CADCHF',
        'NZDCHF'
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
          const spread = symbol.includes('JPY') ? 0.01 : 0.0001
          applyRestPrice(symbol, { bid: mid - spread / 2, ask: mid + spread / 2, mid })
        }
      }

      if (rates.xau && rates.xau > 0) {
        const gold = 1 / rates.xau
        const spread = gold * 0.0003
        applyRestPrice('XAUUSD', { bid: gold - spread, ask: gold + spread, mid: gold })
        if (rates.eur) applyRestPrice('XAUEUR', { bid: gold * rates.eur - spread, ask: gold * rates.eur + spread, mid: gold * rates.eur })
        if (rates.aud) applyRestPrice('XAUAUD', { bid: gold * rates.aud - spread, ask: gold * rates.aud + spread, mid: gold * rates.aud })
        if (rates.gbp) applyRestPrice('XAUGBP', { bid: gold * rates.gbp - spread, ask: gold * rates.gbp + spread, mid: gold * rates.gbp })
        if (rates.chf) applyRestPrice('XAUCHF', { bid: gold * rates.chf - spread, ask: gold * rates.chf + spread, mid: gold * rates.chf })
        if (rates.jpy) {
          applyRestPrice('XAUJPY', {
            bid: gold * rates.jpy - spread * 100,
            ask: gold * rates.jpy + spread * 100,
            mid: gold * rates.jpy
          })
        }
      }

      if (rates.xag && rates.xag > 0) {
        const silver = 1 / rates.xag
        const spread = silver * 0.0005
        applyRestPrice('XAGUSD', { bid: silver - spread, ask: silver + spread, mid: silver })
        if (rates.eur) applyRestPrice('XAGEUR', { bid: silver * rates.eur - spread, ask: silver * rates.eur + spread, mid: silver * rates.eur })
      }

      if (rates.xpt && rates.xpt > 0) {
        const platinum = 1 / rates.xpt
        const spread = platinum * 0.001
        applyRestPrice('XPTUSD', { bid: platinum - spread, ask: platinum + spread, mid: platinum })
      }
      if (rates.xpd && rates.xpd > 0) {
        const palladium = 1 / rates.xpd
        const spread = palladium * 0.001
        applyRestPrice('XPDUSD', { bid: palladium - spread, ask: palladium + spread, mid: palladium })
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
    if (['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'LTC', 'SHIB', 'AVAX', 'LINK', 'DOT', 'MATIC', 'TRX', 'UNI', 'ATOM', 'XLM', 'ETC', 'FIL', 'ICP', 'BCH'].some((c) => symbol.startsWith(c))) return 'Crypto'
    if (symbol.length <= 5 && !symbol.includes('USD')) return 'Stocks'
    return 'Forex'
  }
}

export default new PriceService()
