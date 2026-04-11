# Unicap

Full-stack trading platform (forex/crypto/commodities, copy trading, prop firm challenges, IB/referral commissions).

## Stack

- **Backend** ([backend/](backend/)): Node.js + Express (ESM), MongoDB via Mongoose, Socket.IO, `ws` for upstream price feed, `node-cron` for scheduled jobs, JWT auth, Nodemailer, Multer uploads.
- **Frontend** ([frontend/](frontend/)): React 18 + Vite, React Router v6, Tailwind CSS, Socket.IO client, Recharts, i18next, GSAP.
- No test suite configured. No TypeScript.

## Run

```bash
# Backend (port 5000, needs .env with MONGODB_URI)
cd backend && npm run dev        # nodemon
cd backend && npm start          # prod

# Frontend (Vite dev server)
cd frontend && npm run dev
cd frontend && npm run build
cd frontend && npm run lint
```

Seed/admin helpers: [backend/scripts/seedCredentials.js](backend/scripts/seedCredentials.js), [backend/createAdmin.js](backend/createAdmin.js).

## Architecture

### Backend layout
- [backend/server.js](backend/server.js) — app entrypoint. Mounts all routes under `/api/*`, initializes Socket.IO, boots the Infoway WebSocket price feed, runs background intervals (stop-out check every 5s, SL/TP check every 1s), schedules cron jobs (daily copy-trade commission at 23:59 UTC, daily swap at 22:00 UTC).
- [backend/routes/](backend/routes/) — Express routers, one file per domain (auth, admin, wallet, trade, ib, prop, copyTrading, kyc, support, etc.).
- [backend/models/](backend/models/) — Mongoose schemas. 50+ models covering users, admins, employees, wallets, trades, challenges, IB commissions, KYC, email templates, etc.
- [backend/services/](backend/services/) — core engines: `tradeEngine`, `propTradingEngine`, `copyTradingEngine`, `ibEngineNew`, `infowayService` (price feed), `emailService`, `oxapayService`. Routes delegate business logic here.
- [backend/services/ibEvents.js](backend/services/ibEvents.js) — internal `EventEmitter` bridge. IB engine emits events (e.g. `IB_COMMISSION_DISTRIBUTED`) that `server.js` forwards to Socket.IO.

### IB routing quirk
`/api/admin/ib/*` is rewritten in [backend/server.js](backend/server.js) to proxy into `/api/ib/admin/*` on the same `ibNew.js` router. Both paths resolve to the same handlers — don't duplicate routes.

### Real-time price flow
`infowayService` opens upstream WS connections → fills shared `priceCache` Map → `server.js` forwards tick updates to any socket in the `prices` room via `priceUpdate` / `priceStream` events. Background intervals read the same `priceCache` to evaluate SL/TP and stop-outs.

### Frontend layout
- [frontend/src/App.jsx](frontend/src/App.jsx) — single Router with all routes; user-facing pages, admin pages (prefixed `Admin*`), and branded white-label pages (`Branded*`) all mounted here.
- [frontend/src/pages/](frontend/src/pages/) — one page component per route. `Admin*.jsx` pages share [frontend/src/components/AdminLayout.jsx](frontend/src/components/AdminLayout.jsx).
- [frontend/src/context/](frontend/src/context/) — `ThemeContext`, `LanguageContext`.
- [frontend/src/services/](frontend/src/services/) — client-side price streaming helpers.
- [frontend/src/i18n/](frontend/src/i18n/) — i18next setup (multi-language).
- API base URL and socket config in [frontend/src/config/](frontend/src/config/).

## Domain notes

- **Trading accounts** are separate from wallet. Users fund a trading account from their wallet; trade engine tracks equity/margin per account.
- **Prop challenges** ([backend/models/Challenge.js](backend/models/Challenge.js), [ChallengeAccount.js](backend/models/ChallengeAccount.js)) run through `propTradingEngine` in parallel with `tradeEngine`.
- **Copy trading** — followers mirror a master; daily commission cron settles earnings.
- **IB (Introducing Broker)** — multi-level referral commission system. Current engine is `ibEngineNew.js` + `ibNew.js` route + `IB*New` models. Legacy `ibEngine.js` / `IBCommission.js` still present but not mounted.
- **KYC** uses Multer uploads stored under `backend/uploads/` (served statically at `/uploads`).
- **Email templates** are DB-backed ([EmailTemplate.js](backend/models/EmailTemplate.js)) and auto-seeded on startup via `seedEmailTemplates()`.

## Conventions

- Backend is ESM (`"type": "module"`); use `import`, not `require`.
- MongoDB ObjectIds throughout — use `mongoose.Types.ObjectId` when comparing.
- Money values are stored as numbers (not Decimal128); be mindful of float precision in new commission/PnL math.
- Routes generally return `{ success, data, message }` or `{ error }`; follow the pattern of neighbors when adding endpoints.
- Windows dev environment — use forward slashes and POSIX-style paths in code; the repo path contains a space (`setupfx codes`), so quote paths in shell commands.
