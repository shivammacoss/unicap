import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LEGAL_HEADER_NAV } from "../constants/legalHeaderNav";

const NAV_ITEMS = [
  { id: "scope",       label: "1. Scope" },
  { id: "collect",     label: "2. Data We Collect" },
  { id: "use",         label: "3. How We Use Data" },
  { id: "legal",       label: "4. Legal Bases" },
  { id: "sharing",     label: "5. Sharing & Recipients" },
  { id: "transfers",   label: "6. International Transfers" },
  { id: "retention",   label: "7. Retention" },
  { id: "security",    label: "8. Security" },
  { id: "rights",      label: "9. Your Rights" },
  { id: "cookies",     label: "10. Cookies" },
  { id: "children",    label: "11. Children" },
  { id: "changes",     label: "12. Changes" },
  { id: "contact",     label: "13. Contact" },
];

const SECTIONS = {
  scope: {
    num: "01", title: "Scope",
    content: (
      <p className="uc-para">This Policy applies to personal data collected through our websites, client portals, mobile applications, support channels, and related onboarding or verification processes operated by Unicap Markets LLC.</p>
    ),
  },
  collect: {
    num: "02", title: "Data We Collect",
    content: (
      <>
        <p className="uc-para">We may collect the following categories of personal information:</p>
        <ul className="uc-list">
          <li><strong>Identity and contact data:</strong> name, date of birth, address, email, phone, country of residence, government ID numbers and document images</li>
          <li><strong>Financial and account data:</strong> payment details, transaction history, account balances, trading activity, and communications regarding funding</li>
          <li><strong>Technical data:</strong> IP address, device identifiers, browser type, logs, and similar metadata used for security and analytics</li>
          <li><strong>Verification data:</strong> information obtained during KYC/AML checks from you or approved service providers</li>
        </ul>
      </>
    ),
  },
  use: {
    num: "03", title: "How We Use Personal Data",
    content: (
      <>
        <p className="uc-para">We use your personal data to:</p>
        <ul className="uc-list">
          <li>Open, maintain, and secure trading and wallet accounts</li>
          <li>Execute trades, process deposits and withdrawals, and calculate fees</li>
          <li>Comply with legal and regulatory obligations, including AML/CFT and sanctions screening</li>
          <li>Detect, prevent, and investigate fraud, abuse, or security incidents</li>
          <li>Provide customer support and service-related notices</li>
          <li>Improve our products, subject to applicable law and your choices where required</li>
          <li>Send marketing only where permitted and with appropriate consent or opt-out mechanisms</li>
        </ul>
      </>
    ),
  },
  legal: {
    num: "04", title: "Legal Bases",
    content: (
      <>
        <p className="uc-para">Depending on your region, we rely on performance of a contract, legal obligation, legitimate interests (balanced against your rights), or consent, as required by applicable privacy laws.</p>
        <p className="uc-para">Note: Specific rights and legal bases vary by jurisdiction. This is a general statement; consult local laws for precise entitlements applicable to you.</p>
      </>
    ),
  },
  sharing: {
    num: "05", title: "Sharing & Recipients",
    content: (
      <p className="uc-para">We may share data with payment processors, banking partners, identity verification providers, cloud hosting providers, professional advisers, and authorities when required by law. We require all service providers to protect data appropriately and use it only for the specific purposes we instruct.</p>
    ),
  },
  transfers: {
    num: "06", title: "International Transfers",
    content: (
      <p className="uc-para">Your data may be processed in Saint Vincent and the Grenadines and other countries where we or our vendors operate. We implement safeguards consistent with applicable law for cross-border transfers to ensure your data remains protected.</p>
    ),
  },
  retention: {
    num: "07", title: "Retention",
    content: (
      <p className="uc-para">We retain personal data for as long as needed to provide services, meet legal and regulatory record-keeping requirements (including AML), resolve disputes, and enforce agreements. Retention periods may vary by category of data and jurisdiction.</p>
    ),
  },
  security: {
    num: "08", title: "Security",
    content: (
      <p className="uc-para">We use administrative, technical, and organizational measures designed to protect personal data against unauthorized access, loss, or misuse. No method of transmission or storage is completely secure; you use our services at your own risk within the limits described in our Terms and Risk Disclosure.</p>
    ),
  },
  rights: {
    num: "09", title: "Your Rights",
    content: (
      <p className="uc-para">Subject to applicable law, you may have rights to access, correct, delete, restrict, or object to certain processing, and to data portability or withdrawal of consent. To exercise any of these rights, please contact our support team. You may also lodge a complaint with a supervisory authority where applicable in your jurisdiction.</p>
    ),
  },
  cookies: {
    num: "10", title: "Cookies & Similar Technologies",
    content: (
      <p className="uc-para">We may use cookies and similar tools for essential functionality, analytics, and preferences. You can control cookies through your browser settings; however, disabling certain cookies may affect service functionality and your overall experience on our platform.</p>
    ),
  },
  children: {
    num: "11", title: "Children",
    content: (
      <p className="uc-para">Our services are not directed to individuals under 18 years of age, or the applicable age of majority in your jurisdiction. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us immediately.</p>
    ),
  },
  changes: {
    num: "12", title: "Changes to This Policy",
    content: (
      <p className="uc-para">We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. The revised version will be posted on this page with an updated effective date where appropriate. We encourage you to review this Policy periodically.</p>
    ),
  },
  contact: {
    num: "13", title: "Contact Us",
    content: (
      <p className="uc-para">For privacy inquiries, data subject requests, or questions about this Policy, please contact us through the official support channels listed on our website. Our team will respond to your inquiry in accordance with applicable legal requirements.</p>
    ),
  },
};

export default function Privacy() {
  const navigate = useNavigate();
  const [active, setActive] = useState("scope");
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
        .uc-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
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

        /* Privacy-specific hero badge */
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
          background: #f0f7ff; border: 1px solid #90c4ff;
          border-left: 4px solid #2196f3; border-radius: 10px;
          padding: 16px 22px; display: flex; gap: 14px; align-items: flex-start;
        }
        .uc-warn-ico { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .uc-warn-ttl { font-size: 12px; font-weight: 700; color: #0d47a1; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; }
        .uc-warn-txt { font-size: 13.5px; color: #1a3a6a; line-height: 1.65; }

        .uc-body {
          max-width: 1100px; margin: 0 auto;
          padding: 32px 40px 64px;
          display: grid; grid-template-columns: 248px 1fr; gap: 24px;
        }

        .uc-side { position: sticky; top: 100px; height: fit-content; }
        .uc-side-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 18px rgba(0,0,0,.07); overflow: hidden; }
        .uc-side-head {
          background: linear-gradient(135deg,#0f1923,#1a2d40);
          padding: 14px 20px;
          font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #5a7080;
        }
        .uc-side-scroll { max-height: calc(100vh - 180px); overflow-y: auto; }
        .uc-side-scroll::-webkit-scrollbar { width: 3px; }
        .uc-side-scroll::-webkit-scrollbar-thumb { background: #dde3ea; border-radius: 2px; }
        .uc-side-item {
          display: flex; align-items: center; gap: 11px;
          padding: 11px 20px; cursor: pointer; transition: all .18s;
          border-bottom: 1px solid #f2f4f7; border-left: 3px solid transparent;
          font-size: 12.5px; color: #4a5a70; font-weight: 400; line-height: 1.35;
        }
        .uc-side-item:last-child { border-bottom: none; }
        .uc-side-item:hover { background: #f5fffb; color: #00a87a; border-left-color: rgba(0,200,150,.35); }
        .uc-side-item.on { background: #f0fdf9; color: #00a87a; font-weight: 600; border-left-color: #00c896; }
        .uc-dot { width: 6px; height: 6px; border-radius: 50%; background: #dde3ea; flex-shrink: 0; transition: background .18s; }
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
        .uc-card-num {
          font-size: 32px; font-weight: 700; color: rgba(0,200,150,.22);
          font-variant-numeric: tabular-nums; line-height: 1; flex-shrink: 0;
        }
        .uc-card-ttl { font-size: 20px; font-weight: 700; color: #fff; }
        .uc-card-sub { font-size: 12px; color: #6a7f90; margin-top: 3px; }

        .uc-card-body { padding: 30px 28px; }

        .uc-para { font-size: 14.5px; line-height: 1.85; color: #4a5a70; margin-bottom: 14px; }
        .uc-para:last-child { margin-bottom: 0; }
        .uc-para strong { color: #1a2d40; font-weight: 600; }

        .uc-list {
          list-style: none; margin: 10px 0 14px; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .uc-list li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: #4a5a70; line-height: 1.7;
        }
        .uc-list li strong { color: #1a2d40; font-weight: 600; }
        .uc-list li::before {
          content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: #00c896; flex-shrink: 0; margin-top: 7px;
        }

        .uc-inline-link { color: #00a87a; font-weight: 500; text-decoration: none; }
        .uc-inline-link:hover { text-decoration: underline; }

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
          .uc-side-scroll { max-height: 200px; }
          .uc-fcard { flex-direction: column; gap: 14px; text-align: center; }
          .uc-section-nav { flex-direction: column; }
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
        <span className="uc-bc-cur">Privacy Policy</span>
      </div>

      {/* HERO */}
      <div className="uc-hero">
        <div className="uc-hero-inner">
          <div className="uc-hero-label">Legal Information</div>
          <h1>Privacy Policy</h1>
          <p>This policy explains how Unicap Markets LLC collects, uses, stores, and protects personal information when you use our websites, applications, and related services.</p>
          <div className="uc-hero-badges">
            <span className="uc-hero-badge">🔒 Data Protected</span>
            <span className="uc-hero-badge">✓ AML / KYC Compliant</span>
            <span className="uc-hero-badge">✓ Reg. 3766 LLC 2024</span>
          </div>
        </div>
      </div>

      {/* INFO BANNER — blue for privacy (not amber/orange) */}
      <div className="uc-warn-wrap">
        <div className="uc-warn">
          <span className="uc-warn-ico">🔒</span>
          <div>
            <div className="uc-warn-ttl">Data Processing Notice</div>
            <div className="uc-warn-txt">We process personal data to operate accounts and meet legal obligations (including AML/KYC). Use of trading services remains subject to risk — see our Risk Disclosure.</div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="uc-body">
        {/* Sidebar */}
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

        {/* Content */}
        <div className="uc-content" key={active}>
          <div className="uc-chips">
            <span className="uc-chip">🔒 Privacy Policy</span>
            <span className="uc-chip">✓ Reg. 3766 LLC 2024</span>
            <span className="uc-chip">✓ Saint Vincent &amp; the Grenadines</span>
          </div>

          <div className="uc-card">
            <div className="uc-card-head">
              <div className="uc-card-num">{section.num}</div>
              <div>
                <div className="uc-card-ttl">{section.title}</div>
                <div className="uc-card-sub">Unicap Markets LLC · Privacy Policy</div>
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