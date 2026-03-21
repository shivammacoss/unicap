import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LEGAL_HEADER_NAV } from "../constants/legalHeaderNav";

const NAV_ITEMS = [
  { id: "company",    label: "Company Overview"    },
  { id: "risk",       label: "Risk Warning"         },
  { id: "trading",    label: "Trading Risks"        },
  { id: "legal",      label: "Legal Disclaimer"     },
  { id: "restricted", label: "Restricted Countries" },
  { id: "user",       label: "User Responsibility"  },
];

const SECTIONS = {
  company: {
    title: "Company Overview", icon: "🏢",
    content: [
      "Unicap Markets (previously known as UC Markets / ucmarkets.com) is the trading name of Unicap Markets LLC, registered in Saint Vincent and the Grenadines under registration number 3766 LLC 2024.",
    ],
  },
  risk: {
    title: "Risk Warning", icon: "⚠️",
    content: [
      "Trading in securities involves significant risk. Prices may fluctuate and securities can become entirely valueless. You may incur losses that exceed your potential profits, and in some cases, losses may exceed the amount you have deposited.",
      "Securities, futures, options, and contracts for differences are complex financial instruments and are not suitable for all investors. Engaging in such transactions requires a sound understanding of the associated risks. Please read and ensure you fully understand our Risk Disclosure.",
    ],
  },
  trading: {
    title: "Trading Risks", icon: "📉",
    content: [
      "Our leverage is dynamic and may change at any time. Such changes may affect your positions and margin requirements. You are responsible for monitoring your positions and maintaining sufficient margin at all times.",
    ],
  },
  legal: {
    title: "Legal Disclaimer", icon: "⚖️",
    content: [
      "You must be 18 years old, or of legal age as determined in your country. Upon registering an account with Unicap Markets LLC, you acknowledge that you are registering at your own free will, without solicitation on behalf of Unicap Markets LLC.",
      "Unicap Markets LLC does not direct its website and services to any individual in any country in which the use of its website and services are prohibited by local laws or regulations. When accessing this website from a country in which its use may or may not be prohibited, it is the user's responsibility to ensure that any use of the website or services adheres to local laws or regulations.",
      "Unicap Markets LLC does not affirm that the information on its website is suitable for all jurisdictions.",
    ],
  },
  restricted: {
    title: "Restricted Countries", icon: "🌍",
    content: [
      "Unicap Markets LLC does not provide services for residents of certain countries. If you are a resident of a restricted country listed below, you are prohibited from using our services.",
    ],
    countries: ["United States", "Canada", "New Zealand", "Iran", "North Korea"],
  },
  user: {
    title: "User Responsibility", icon: "👤",
    content: [
      "Our leverage is dynamic and may change at any time. Such changes may affect your positions and margin requirements. You are responsible for monitoring your positions and maintaining sufficient margin at all times.",
      "When accessing this website from a country in which its use may or may not be prohibited, it is the user's responsibility to ensure that any use of the website or services adheres to local laws or regulations.",
      "You must be 18 years old, or of legal age as determined in your country. Upon registering an account with Unicap Markets LLC, you acknowledge that you are registering at your own free will, without solicitation on behalf of Unicap Markets LLC.",
    ],
  },
};

export default function RiskDisclosure() {
  const navigate = useNavigate();
  const [active, setActive] = useState("company");
  const section = SECTIONS[active];

  return (
    <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif", minHeight: "100vh", background: "#f0f2f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* NAV */
        .uc-nav {
          background: #0f1923; height: 64px; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 16px rgba(0,0,0,0.4);
        }
        .uc-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .uc-logo-box {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg,#1a6fff,#00c896);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 800; color: #fff;
        }
        .uc-logo-name { font-size: 13.5px; font-weight: 700; color: #fff; letter-spacing: 0.04em; }
        .uc-logo-tag { font-size: 9px; color: #6a7f90; letter-spacing: 0.13em; text-transform: uppercase; }
        .uc-nav-links { display: flex; gap: 26px; }
        .uc-nav-link { font-size: 13.5px; color: #b0c0d0; text-decoration: none; transition: color .2s; }
        .uc-nav-link:hover { color: #fff; }
        .uc-nav-link.cur { color: #fff; font-weight: 500; }
        .uc-nav-acts { display: flex; align-items: center; gap: 12px; }
        .uc-ghost { background: none; border: none; color: #b0c0d0; font-size: 13px; font-family: inherit; cursor: pointer; padding: 6px 10px; border-radius: 6px; transition: color .2s; }
        .uc-ghost:hover { color: #fff; }
        .uc-signup {
          background: linear-gradient(135deg,#00c896,#00a87a);
          border: none; border-radius: 8px; color: #fff;
          font-size: 13px; font-weight: 600; font-family: inherit;
          padding: 9px 22px; cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,200,150,.35);
          transition: transform .15s, box-shadow .15s;
        }
        .uc-signup:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,200,150,.45); }

        /* BREADCRUMB */
        .uc-bc {
          background: #0f1923; padding: 13px 40px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; gap: 7px;
        }
        .uc-bc a { font-size: 12.5px; color: #00c896; text-decoration: none; }
        .uc-bc a:hover { text-decoration: underline; }
        .uc-bc span { font-size: 12px; color: #3a4a5a; }
        .uc-bc-cur { font-size: 12.5px; color: #6a7f90; }

        /* HERO */
        .uc-hero {
          background: linear-gradient(135deg, #0f1923 0%, #152535 55%, #0c2030 100%);
          padding: 56px 40px;
          position: relative; overflow: hidden;
        }
        .uc-hero::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 75% 50%, rgba(0,200,150,.09), transparent 60%);
          pointer-events: none;
        }
        .uc-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .uc-hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          color: #00c896; margin-bottom: 16px;
        }
        .uc-hero-label::before { content:''; width:24px; height:2px; background:#00c896; border-radius:2px; }
        .uc-hero h1 { font-size: 42px; font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 14px; }
        .uc-hero p { font-size: 15px; color: #7a90a4; max-width: 540px; line-height: 1.75; }

        /* WARNING BANNER */
        .uc-warn-wrap { background: #f0f2f5; padding: 28px 40px 0; }
        .uc-warn {
          max-width: 1100px; margin: 0 auto;
          background: #fffbf0; border: 1px solid #ffc107;
          border-left: 4px solid #ff9800; border-radius: 10px;
          padding: 16px 22px; display: flex; gap: 14px; align-items: flex-start;
        }
        .uc-warn-ico { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .uc-warn-ttl { font-size: 12px; font-weight: 700; color: #7a4500; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; }
        .uc-warn-txt { font-size: 13.5px; color: #6a3d00; line-height: 1.65; }

        /* BODY GRID */
        .uc-body {
          max-width: 1100px; margin: 0 auto;
          padding: 32px 40px 64px;
          display: grid; grid-template-columns: 230px 1fr; gap: 24px;
        }

        /* SIDEBAR */
        .uc-side { position: sticky; top: 100px; height: fit-content; }
        .uc-side-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 18px rgba(0,0,0,.07); overflow: hidden; }
        .uc-side-head {
          background: linear-gradient(135deg,#0f1923,#1a2d40);
          padding: 14px 20px;
          font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #5a7080;
        }
        .uc-side-item {
          display: flex; align-items: center; gap: 11px;
          padding: 13px 20px; cursor: pointer; transition: all .18s;
          border-bottom: 1px solid #f2f4f7; border-left: 3px solid transparent;
          font-size: 13px; color: #4a5a70; font-weight: 400;
        }
        .uc-side-item:last-child { border-bottom: none; }
        .uc-side-item:hover { background: #f5fffb; color: #00a87a; border-left-color: rgba(0,200,150,.35); }
        .uc-side-item.on { background: #f0fdf9; color: #00a87a; font-weight: 600; border-left-color: #00c896; }
        .uc-dot { width: 7px; height: 7px; border-radius: 50%; background: #dde3ea; flex-shrink: 0; transition: background .18s; }
        .uc-side-item.on .uc-dot { background: #00c896; }

        /* CONTENT */
        .uc-content { display: flex; flex-direction: column; gap: 20px; }

        .uc-chips { display: flex; gap: 9px; flex-wrap: wrap; }
        .uc-chip {
          font-size: 12px; font-weight: 500; color: #00806a;
          background: #f0fdf9; border: 1px solid #b0e8d4;
          border-radius: 20px; padding: 5px 13px;
        }

        .uc-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 18px rgba(0,0,0,.07); overflow: hidden; animation: fu .32s ease; }
        @keyframes fu { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        .uc-card-head {
          background: linear-gradient(135deg,#0f1923 0%,#1a2d40 100%);
          padding: 22px 28px; display: flex; align-items: center; gap: 16px;
        }
        .uc-card-ico {
          width: 50px; height: 50px; border-radius: 12px; flex-shrink: 0;
          background: linear-gradient(135deg,rgba(0,200,150,.18),rgba(0,168,122,.08));
          border: 1px solid rgba(0,200,150,.28);
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }
        .uc-card-ttl { font-size: 20px; font-weight: 700; color: #fff; }
        .uc-card-sub { font-size: 12px; color: #6a7f90; margin-top: 3px; }

        .uc-card-body { padding: 30px 28px; }
        .uc-para { font-size: 14.5px; line-height: 1.85; color: #4a5a70; margin-bottom: 16px; }
        .uc-para:last-of-type { margin-bottom: 0; }

        .uc-ctags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
        .uc-ctag {
          display: flex; align-items: center; gap: 7px;
          font-size: 12.5px; font-weight: 500; color: #c62828;
          background: #fff5f5; border: 1px solid #ffcdd2; border-radius: 20px;
          padding: 6px 14px;
        }
        .uc-ctag::before { content: '🚫'; font-size: 13px; }

        /* FOOTER CARD */
        .uc-fcard {
          background: linear-gradient(135deg,#0f1923,#1a2d40);
          border-radius: 14px; padding: 22px 28px;
          display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 2px 18px rgba(0,0,0,.12);
        }
        .uc-ftxt { font-size: 13px; color: #7a90a4; }
        .uc-ftxt strong { color: #00c896; font-weight: 500; }
        .uc-freg { font-size: 11px; color: #3a5060; margin-top: 4px; }
        .uc-back-btn {
          background: linear-gradient(135deg,#00c896,#00a87a);
          border: none; border-radius: 8px; color: #fff;
          font-size: 12.5px; font-weight: 600; font-family: inherit;
          padding: 9px 20px; cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,200,150,.3);
          transition: transform .15s, box-shadow .15s;
        }
        .uc-back-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,200,150,.4); }

        @media (max-width: 820px) {
          .uc-nav { padding: 0 16px; }
          .uc-nav-links { display: none; }
          .uc-bc, .uc-warn-wrap { padding-left: 16px; padding-right: 16px; }
          .uc-hero { padding: 36px 16px; }
          .uc-hero h1 { font-size: 28px; }
          .uc-body { grid-template-columns: 1fr; padding: 20px 16px 48px; }
          .uc-side { position: relative; top: 0; }
          .uc-side-card { display: flex; overflow-x: auto; border-radius: 10px; }
          .uc-side-head { display: none; }
          .uc-side-item { border-bottom: none; border-right: 1px solid #f2f4f7; border-left: none; border-bottom: 3px solid transparent; white-space: nowrap; flex-shrink: 0; }
          .uc-side-item.on { border-left: none; border-bottom-color: #00c896; background: #f0fdf9; }
          .uc-fcard { flex-direction: column; gap: 14px; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className="uc-nav">
        <Link to="/" className="uc-logo">
          <div className="uc-logo-box">U</div>
          <div>
            <div className="uc-logo-name">UNICAP MARKETS</div>
            <div className="uc-logo-tag">Global Trading Platform</div>
          </div>
        </Link>
        <div className="uc-nav-links">
          {LEGAL_HEADER_NAV.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`uc-nav-link${label === "Company" ? " cur" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="uc-nav-acts">
          <a href="/unicap.apk" download className="uc-ghost" style={{ textDecoration: "none" }}>
            ⬇ Download App
          </a>
          <button type="button" className="uc-ghost" onClick={() => navigate("/user/login")}>
            Login
          </button>
          <button type="button" className="uc-signup" onClick={() => navigate("/user/signup")}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="uc-bc">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/about">Company</Link>
        <span>›</span>
        <span className="uc-bc-cur">Risk Disclosure</span>
      </div>

      {/* HERO */}
      <div className="uc-hero">
        <div className="uc-hero-inner">
          <div className="uc-hero-label">Legal Information</div>
          <h1>Risk Disclosure</h1>
          <p>Please read this document carefully before using our services. This disclosure outlines the risks associated with trading on the Unicap Markets platform.</p>
        </div>
      </div>

      {/* WARNING */}
      <div className="uc-warn-wrap">
        <div className="uc-warn">
          <span className="uc-warn-ico">⚠️</span>
          <div>
            <div className="uc-warn-ttl">Important Risk Warning</div>
            <div className="uc-warn-txt">Trading in securities involves significant risk. Prices may fluctuate and securities can become entirely valueless. You may incur losses that exceed your potential profits, and in some cases, losses may exceed the amount you have deposited.</div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="uc-body">
        {/* Sidebar */}
        <aside className="uc-side">
          <div className="uc-side-card">
            <div className="uc-side-head">Contents</div>
            {NAV_ITEMS.map(n => (
              <div key={n.id} className={`uc-side-item${active===n.id?" on":""}`} onClick={() => setActive(n.id)}>
                <div className="uc-dot" />
                {n.label}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="uc-content" key={active}>
          <div className="uc-chips">
            <span className="uc-chip">✓ Reg. 3766 LLC 2024</span>
            <span className="uc-chip">✓ Saint Vincent &amp; the Grenadines</span>
            <span className="uc-chip">✓ 18+ Only</span>
          </div>

          <div className="uc-card">
            <div className="uc-card-head">
              <div className="uc-card-ico">{section.icon}</div>
              <div>
                <div className="uc-card-ttl">{section.title}</div>
                <div className="uc-card-sub">Unicap Markets LLC · Legal Document</div>
              </div>
            </div>
            <div className="uc-card-body">
              {section.content.map((p, i) => <p key={i} className="uc-para">{p}</p>)}
              {section.countries && (
                <div className="uc-ctags">
                  {section.countries.map(c => <span key={c} className="uc-ctag">{c}</span>)}
                </div>
              )}
            </div>
          </div>

          <div className="uc-fcard">
            <div>
              <div className="uc-ftxt">© 2024 <strong>Unicap Markets LLC</strong>. All rights reserved.</div>
              <div className="uc-freg">Registration No. 3766 LLC 2024 · Saint Vincent and the Grenadines</div>
            </div>
            <button className="uc-back-btn" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>↑ Back to Top</button>
          </div>
        </div>
      </div>
    </div>
  );
}