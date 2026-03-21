import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LEGAL_HEADER_NAV } from "../constants/legalHeaderNav";

const NAV_ITEMS = [
  { id: "regulatory",  label: "1. Regulatory Status & No Advice" },
  { id: "kyc",         label: "2. KYC & AML" },
  { id: "sanctions",   label: "3. Sanctions & Restricted Jurisdictions" },
  { id: "conduct",     label: "4. Market Conduct" },
  { id: "tax",         label: "5. Tax & Reporting" },
  { id: "records",     label: "6. Recordkeeping" },
  { id: "complaints",  label: "7. Complaints & Escalations" },
  { id: "related",     label: "8. Related Documents" },
];

const SECTIONS = {
  regulatory: {
    num: "01", title: "Regulatory Status & No Advice",
    content: (
      <>
        <p className="uc-para">Information on this website does not constitute an offer or solicitation where unlawful. We do not affirm that our services or information are suitable for all jurisdictions.</p>
        <p className="uc-para">Nothing herein is personalized investment, legal, or tax advice. You should obtain independent professional advice before making financial decisions. See our Risk Disclosure for full details on associated trading risks.</p>
      </>
    ),
  },
  kyc: {
    num: "02", title: "Know Your Customer (KYC) & Anti-Money Laundering (AML)",
    content: (
      <>
        <p className="uc-para">We apply customer due diligence measures consistent with our policies and applicable law. You must provide accurate information and cooperate with verification requests.</p>
        <p className="uc-para">We may refuse, suspend, or terminate relationships where verification cannot be completed or where risk is unacceptable. Suspicious activity may be reported to competent authorities as required by law.</p>
      </>
    ),
  },
  sanctions: {
    num: "03", title: "Sanctions & Restricted Jurisdictions",
    content: (
      <>
        <p className="uc-para">We do not provide services for residents of certain countries, including where noted in our disclosures, or where distribution or use would violate local law. You must not access or use our services if you are in a restricted jurisdiction or if you are a sanctioned person or entity.</p>
        <div className="uc-restricted-grid">
          {["United States","Canada","New Zealand","Iran","North Korea"].map(c => (
            <div key={c} className="uc-restricted-item">
              <span className="uc-restricted-icon">🚫</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  conduct: {
    num: "04", title: "Market Conduct",
    content: (
      <>
        <p className="uc-para">You must not engage in any prohibited trading practices. Violations may result in account suspension, trade cancellation, and referral to regulators or law enforcement.</p>
        <ul className="uc-list">
          <li>Market manipulation or abusive trading strategies</li>
          <li>Layering, spoofing, or wash trading</li>
          <li>Insider dealing where applicable by law</li>
          <li>Any other conduct prohibited under applicable regulations</li>
        </ul>
      </>
    ),
  },
  tax: {
    num: "05", title: "Tax & Reporting",
    content: (
      <p className="uc-para">You are solely responsible for determining and paying taxes in your jurisdiction and for meeting any reporting obligations relating to your trading or account activity. We may disclose information to tax or regulatory authorities when legally required to do so.</p>
    ),
  },
  records: {
    num: "06", title: "Recordkeeping",
    content: (
      <p className="uc-para">We maintain records as required for operational, audit, and regulatory purposes. Retention periods may be extended where law requires, including for AML/CFT compliance and dispute resolution purposes.</p>
    ),
  },
  complaints: {
    num: "07", title: "Complaints & Escalations",
    content: (
      <>
        <p className="uc-para">If you have a compliance-related concern, contact official support through the channels published on our website. Please provide sufficient detail to allow us to review your case thoroughly.</p>
        <p className="uc-para">We will handle complaints in line with internal procedures and applicable law, aiming to resolve all matters promptly and fairly.</p>
      </>
    ),
  },
  related: {
    num: "08", title: "Related Documents",
    content: (
      <>
        <p className="uc-para">This Compliance overview supplements the following legal documents. Please review all of them before using our services:</p>
        <div className="uc-related-docs">
          {[
            { icon: "⚠️", label: "Risk Disclosure", desc: "Trading risks and financial warnings" },
            { icon: "📜", label: "Terms of Service", desc: "Rules governing use of our platform" },
            { icon: "🔒", label: "Privacy Policy",   desc: "How we collect and protect your data" },
          ].map(d => (
            <div key={d.label} className="uc-related-card">
              <div className="uc-related-ico">{d.icon}</div>
              <div>
                <div className="uc-related-name">{d.label}</div>
                <div className="uc-related-desc">{d.desc}</div>
              </div>
              <span className="uc-related-arrow">→</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
};

export default function Compliance() {
  const navigate = useNavigate();
  const [active, setActive] = useState("regulatory");
  const section = SECTIONS[active];
  const ids = NAV_ITEMS.map(n => n.id);
  const idx = ids.indexOf(active);
  const prev = idx > 0 ? NAV_ITEMS[idx - 1] : null;
  const next = idx < ids.length - 1 ? NAV_ITEMS[idx + 1] : null;

  return (
    <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif", minHeight: "100vh", background: "#f0f2f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .uc-nav {
          background: #0f1923; height: 64px; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 16px rgba(0,0,0,.4);
        }
        .uc-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .uc-logo-box {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg,#1a6fff,#00c896);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 800; color: #fff;
        }
        .uc-logo-name { font-size: 13.5px; font-weight: 700; color: #fff; letter-spacing: .04em; }
        .uc-logo-tag { font-size: 9px; color: #6a7f90; letter-spacing: .13em; text-transform: uppercase; }
        .uc-nav-links { display: flex; gap: 26px; }
        .uc-nav-link { font-size: 13.5px; color: #b0c0d0; text-decoration: none; transition: color .2s; }
        .uc-nav-link:hover { color: #fff; }
        .uc-nav-link.cur { color: #fff; font-weight: 500; }
        .uc-nav-acts { display: flex; align-items: center; gap: 12px; }
        .uc-ghost { background: none; border: none; color: #b0c0d0; font-size: 13px; font-family: inherit; cursor: pointer; padding: 6px 10px; border-radius: 6px; transition: color .2s; }
        .uc-ghost:hover { color: #fff; }
        .uc-signup {
          background: linear-gradient(135deg,#00c896,#00a87a); border: none; border-radius: 8px; color: #fff;
          font-size: 13px; font-weight: 600; font-family: inherit; padding: 9px 22px; cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,200,150,.35); transition: transform .15s, box-shadow .15s;
        }
        .uc-signup:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,200,150,.45); }

        .uc-bc {
          background: #0f1923; padding: 13px 40px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; gap: 7px;
        }
        .uc-bc a { font-size: 12.5px; color: #00c896; text-decoration: none; cursor: pointer; }
        .uc-bc a:hover { text-decoration: underline; }
        .uc-bc-sep { font-size: 12px; color: #3a4a5a; }
        .uc-bc-cur { font-size: 12.5px; color: #6a7f90; }

        .uc-hero {
          background: linear-gradient(135deg,#0f1923 0%,#152535 55%,#0c2030 100%);
          padding: 56px 40px; position: relative; overflow: hidden;
        }
        .uc-hero::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 75% 50%,rgba(0,200,150,.09),transparent 60%);
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
        .uc-hero p { font-size: 15px; color: #7a90a4; max-width: 580px; line-height: 1.75; }
        .uc-hero-badges { display: flex; gap: 10px; margin-top: 22px; flex-wrap: wrap; }
        .uc-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11.5px; font-weight: 500; color: #00c896;
          background: rgba(0,200,150,.1); border: 1px solid rgba(0,200,150,.25);
          border-radius: 20px; padding: 5px 13px;
        }

        .uc-warn-wrap { background: #f0f2f5; padding: 28px 40px 0; }
        .uc-warn {
          max-width: 1100px; margin: 0 auto;
          background: #f3fdf7; border: 1px solid #86efb8;
          border-left: 4px solid #00c896; border-radius: 10px;
          padding: 16px 22px; display: flex; gap: 14px; align-items: flex-start;
        }
        .uc-warn-ico { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .uc-warn-ttl { font-size: 12px; font-weight: 700; color: #065f3e; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; }
        .uc-warn-txt { font-size: 13.5px; color: #0a5c3a; line-height: 1.65; }

        .uc-body {
          max-width: 1100px; margin: 0 auto;
          padding: 32px 40px 64px;
          display: grid; grid-template-columns: 260px 1fr; gap: 24px;
        }

        .uc-side { position: sticky; top: 100px; height: fit-content; }
        .uc-side-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 18px rgba(0,0,0,.07); overflow: hidden; }
        .uc-side-head {
          background: linear-gradient(135deg,#0f1923,#1a2d40);
          padding: 14px 20px;
          font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #5a7080;
        }
        .uc-side-scroll { overflow-y: auto; }
        .uc-side-scroll::-webkit-scrollbar { width: 3px; }
        .uc-side-scroll::-webkit-scrollbar-thumb { background: #dde3ea; border-radius: 2px; }
        .uc-side-item {
          display: flex; align-items: flex-start; gap: 11px;
          padding: 12px 20px; cursor: pointer; transition: all .18s;
          border-bottom: 1px solid #f2f4f7; border-left: 3px solid transparent;
          font-size: 12.5px; color: #4a5a70; font-weight: 400; line-height: 1.4;
        }
        .uc-side-item:last-child { border-bottom: none; }
        .uc-side-item:hover { background: #f5fffb; color: #00a87a; border-left-color: rgba(0,200,150,.35); }
        .uc-side-item.on { background: #f0fdf9; color: #00a87a; font-weight: 600; border-left-color: #00c896; }
        .uc-dot { width: 6px; height: 6px; border-radius: 50%; background: #dde3ea; flex-shrink: 0; margin-top: 5px; transition: background .18s; }
        .uc-side-item.on .uc-dot { background: #00c896; }

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
        .uc-card-num { font-size: 32px; font-weight: 700; color: rgba(0,200,150,.22); line-height: 1; flex-shrink: 0; }
        .uc-card-ttl { font-size: 20px; font-weight: 700; color: #fff; }
        .uc-card-sub { font-size: 12px; color: #6a7f90; margin-top: 3px; }
        .uc-card-body { padding: 30px 28px; }

        .uc-para { font-size: 14.5px; line-height: 1.85; color: #4a5a70; margin-bottom: 14px; }
        .uc-para:last-child { margin-bottom: 0; }

        .uc-list {
          list-style: none; margin: 10px 0 14px; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .uc-list li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: #4a5a70; line-height: 1.7;
        }
        .uc-list li::before {
          content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: #00c896; flex-shrink: 0; margin-top: 7px;
        }

        /* Restricted countries grid */
        .uc-restricted-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px; margin-top: 18px;
        }
        .uc-restricted-item {
          display: flex; align-items: center; gap: 8px;
          background: #fff5f5; border: 1px solid #ffcdd2; border-radius: 8px;
          padding: 10px 14px; font-size: 13px; font-weight: 500; color: #c62828;
        }
        .uc-restricted-icon { font-size: 15px; flex-shrink: 0; }

        /* Related docs */
        .uc-related-docs { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
        .uc-related-card {
          display: flex; align-items: center; gap: 14px;
          background: #f8fafc; border: 1px solid #e4e9f0; border-radius: 10px;
          padding: 14px 18px; cursor: pointer; transition: all .18s;
        }
        .uc-related-card:hover { border-color: #00c896; background: #f0fdf9; box-shadow: 0 2px 12px rgba(0,200,150,.1); }
        .uc-related-ico {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg,rgba(0,200,150,.15),rgba(0,168,122,.07));
          border: 1px solid rgba(0,200,150,.22);
          display: flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .uc-related-name { font-size: 14px; font-weight: 600; color: #1a2d40; }
        .uc-related-desc { font-size: 12px; color: #7a8fa4; margin-top: 2px; }
        .uc-related-arrow { font-size: 18px; color: #00c896; margin-left: auto; flex-shrink: 0; }

        .uc-section-nav { display: flex; justify-content: space-between; gap: 12px; }
        .uc-snav-btn {
          flex: 1; display: flex; align-items: center; gap: 10px;
          background: #fff; border: 1px solid #e4e9f0; border-radius: 10px;
          padding: 12px 16px; cursor: pointer; font-family: inherit;
          transition: all .18s; color: #4a5a70; font-size: 13px; font-weight: 500;
          box-shadow: 0 1px 6px rgba(0,0,0,.05);
        }
        .uc-snav-btn:hover { border-color: #00c896; color: #00a87a; box-shadow: 0 2px 12px rgba(0,200,150,.12); }
        .uc-snav-btn.next { justify-content: flex-end; text-align: right; }
        .uc-snav-label { font-size: 10px; text-transform: uppercase; letter-spacing: .1em; color: #9aa8b8; display: block; margin-bottom: 2px; }
        .uc-snav-arrow { font-size: 18px; color: #00c896; flex-shrink: 0; }

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
          background: linear-gradient(135deg,#00c896,#00a87a); border: none; border-radius: 8px; color: #fff;
          font-size: 12.5px; font-weight: 600; font-family: inherit; padding: 9px 20px; cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,200,150,.3); transition: transform .15s, box-shadow .15s;
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
          .uc-fcard { flex-direction: column; gap: 14px; text-align: center; }
          .uc-section-nav { flex-direction: column; }
          .uc-restricted-grid { grid-template-columns: 1fr 1fr; }
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
        <span className="uc-bc-sep">›</span>
        <Link to="/about">Company</Link>
        <span className="uc-bc-sep">›</span>
        <span className="uc-bc-cur">Compliance</span>
      </div>

      {/* HERO */}
      <div className="uc-hero">
        <div className="uc-hero-inner">
          <div className="uc-hero-label">Legal Information</div>
          <h1>Compliance</h1>
          <p>This page summarizes key compliance expectations and regulatory disclaimers relating to Unicap Markets LLC. It supplements our Risk Disclosure, Terms of Service, and Privacy Policy.</p>
          <div className="uc-hero-badges">
            <span className="uc-hero-badge">✅ AML / KYC</span>
            <span className="uc-hero-badge">✓ Sanctions Screening</span>
            <span className="uc-hero-badge">✓ Reg. 3766 LLC 2024</span>
          </div>
        </div>
      </div>

      {/* GREEN BANNER — compliance tone */}
      <div className="uc-warn-wrap">
        <div className="uc-warn">
          <span className="uc-warn-ico">✅</span>
          <div>
            <div className="uc-warn-ttl">Compliance Notice</div>
            <div className="uc-warn-txt">We do not provide services where prohibited. You must comply with applicable laws, including sanctions and tax obligations in your country.</div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="uc-body">
        <aside className="uc-side">
          <div className="uc-side-card">
            <div className="uc-side-head">Table of Contents</div>
            <div className="uc-side-scroll">
              {NAV_ITEMS.map(n => (
                <div key={n.id} className={`uc-side-item${active===n.id?" on":""}`} onClick={() => setActive(n.id)}>
                  <div className="uc-dot" />
                  {n.label}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="uc-content" key={active}>
          <div className="uc-chips">
            <span className="uc-chip">✅ Compliance Overview</span>
            <span className="uc-chip">✓ Reg. 3766 LLC 2024</span>
            <span className="uc-chip">✓ Saint Vincent &amp; the Grenadines</span>
          </div>

          <div className="uc-card">
            <div className="uc-card-head">
              <div className="uc-card-num">{section.num}</div>
              <div>
                <div className="uc-card-ttl">{section.title}</div>
                <div className="uc-card-sub">Unicap Markets LLC · Compliance Overview</div>
              </div>
            </div>
            <div className="uc-card-body">
              {section.content}
            </div>
          </div>

          {/* Prev / Next */}
          <div className="uc-section-nav">
            {prev ? (
              <button className="uc-snav-btn" onClick={() => setActive(prev.id)}>
                <span className="uc-snav-arrow">←</span>
                <div><span className="uc-snav-label">Previous</span>{prev.label}</div>
              </button>
            ) : <div />}
            {next ? (
              <button className="uc-snav-btn next" onClick={() => setActive(next.id)}>
                <div><span className="uc-snav-label">Next</span>{next.label}</div>
                <span className="uc-snav-arrow">→</span>
              </button>
            ) : <div />}
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