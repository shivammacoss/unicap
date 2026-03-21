import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LEGAL_HEADER_NAV } from "../constants/legalHeaderNav";

const NAV_ITEMS = [
  { id: "acceptance",  label: "1. Acceptance & Eligibility" },
  { id: "services",    label: "2. Services" },
  { id: "accounts",   label: "3. Accounts & Security" },
  { id: "trading",    label: "4. Trading & Leverage" },
  { id: "fees",       label: "5. Fees & Charges" },
  { id: "prohibited", label: "6. Prohibited Use" },
  { id: "ip",         label: "7. Intellectual Property" },
  { id: "liability",  label: "8. Disclaimers & Liability" },
  { id: "indemnity",  label: "9. Indemnity" },
  { id: "termination",label: "10. Termination" },
  { id: "changes",    label: "11. Changes" },
  { id: "governing",  label: "12. Governing Law" },
  { id: "contact",    label: "13. Contact" },
];

const SECTIONS = {
  acceptance: {
    num: "01", title: "Acceptance & Eligibility",
    content: (
      <>
        <p className="uc-para">You represent that you are at least 18 years of age or the age of legal majority in your jurisdiction, whichever is higher. You register and use our services voluntarily and in compliance with applicable law.</p>
        <p className="uc-para">We do not offer services where prohibited. See our Risk Disclosure and Compliance information for details on restricted jurisdictions.</p>
      </>
    ),
  },
  services: {
    num: "02", title: "Services",
    content: (
      <p className="uc-para">We may provide access to trading platforms, account management, funding-related workflows, educational or marketing content, and related tools. The exact scope of services available to you depends on your account type, jurisdiction, and our policies. We may modify, suspend, or discontinue any feature with reasonable notice where practicable.</p>
    ),
  },
  accounts: {
    num: "03", title: "Accounts, Security & Information",
    content: (
      <>
        <p className="uc-para">You must provide accurate registration and KYC information and keep credentials secure. You are responsible for all activity under your account.</p>
        <p className="uc-para">We may refuse, suspend, or close accounts that violate these Terms, our policies, or applicable law. Our Privacy Policy describes how we handle personal data.</p>
      </>
    ),
  },
  trading: {
    num: "04", title: "Trading, Margin & Leverage",
    content: (
      <>
        <p className="uc-para">Trading in leveraged products is speculative and may result in losses exceeding your deposits. Margin and leverage levels may change at any time.</p>
        <p className="uc-para">You are responsible for monitoring positions and maintaining sufficient margin. Nothing on our website constitutes personalized investment, tax, or legal advice. Read the Risk Disclosure in full before trading.</p>
      </>
    ),
  },
  fees: {
    num: "05", title: "Fees & Charges",
    content: (
      <p className="uc-para">Fees, spreads, swaps, commissions, and other charges may apply as disclosed on the platform or in separate schedules. We may update fee structures with notice where required by applicable law or regulation.</p>
    ),
  },
  prohibited: {
    num: "06", title: "Prohibited Use",
    content: (
      <>
        <p className="uc-para">You agree not to engage in any of the following prohibited activities:</p>
        <ul className="uc-list">
          <li>Using our services for fraud, market manipulation, money laundering, or terrorist financing</li>
          <li>Circumventing geographic, regulatory, or security restrictions</li>
          <li>Reverse engineering, scraping, or overloading our systems without authorization</li>
          <li>Impersonation or providing false documentation</li>
        </ul>
      </>
    ),
  },
  ip: {
    num: "07", title: "Intellectual Property",
    content: (
      <p className="uc-para">All trademarks, logos, software, and content are owned by Unicap Markets or its licensors. You receive a limited, non-exclusive license to use them solely as needed to access the services. No other rights are granted under these Terms.</p>
    ),
  },
  liability: {
    num: "08", title: "Disclaimers & Limitation of Liability",
    content: (
      <>
        <p className="uc-para">Services are provided "as is" and "as available." To the maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
        <p className="uc-para">We are not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, except where liability cannot be excluded by law. Our aggregate liability is limited to the net fees you paid to us in the three (3) months preceding the claim.</p>
      </>
    ),
  },
  indemnity: {
    num: "09", title: "Indemnity",
    content: (
      <p className="uc-para">You agree to indemnify and hold harmless Unicap Markets and its affiliates, officers, and agents from claims, losses, and expenses (including reasonable legal fees) arising from your use of the services, your breach of these Terms, or your violation of law.</p>
    ),
  },
  termination: {
    num: "10", title: "Termination",
    content: (
      <>
        <p className="uc-para">You may close your account subject to settlement of open obligations. We may suspend or terminate access for breach, risk, legal, or operational reasons.</p>
        <p className="uc-para">Provisions that by nature should survive — including liability limits, indemnity, and governing law — will survive termination of these Terms.</p>
      </>
    ),
  },
  changes: {
    num: "11", title: "Changes to Terms",
    content: (
      <p className="uc-para">We may update these Terms by posting a revised version on this site. Material changes may require additional notice where required by law. Continued use after the effective date constitutes acceptance unless you close your account beforehand.</p>
    ),
  },
  governing: {
    num: "12", title: "Governing Law & Disputes",
    content: (
      <p className="uc-para">These Terms are governed by the laws of Saint Vincent and the Grenadines, without regard to conflict-of-law principles, except where mandatory consumer protections in your country apply. Disputes shall be resolved in the courts of Saint Vincent and the Grenadines, unless binding arbitration or another forum is mandated by applicable law.</p>
    ),
  },
  contact: {
    num: "13", title: "Contact Us",
    content: (
      <p className="uc-para">For questions about these Terms, please contact us through the official support channels listed on our website. Our support team is available to assist you with any queries regarding your account or our services.</p>
    ),
  },
};

export default function Terms() {
  const navigate = useNavigate();
  const [active, setActive] = useState("acceptance");
  const section = SECTIONS[active];

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
          background: linear-gradient(135deg,#00c896,#00a87a);
          border: none; border-radius: 8px; color: #fff;
          font-size: 13px; font-weight: 600; font-family: inherit;
          padding: 9px 22px; cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,200,150,.35);
          transition: transform .15s, box-shadow .15s;
        }
        .uc-signup:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,200,150,.45); }

        .uc-bc {
          background: #0f1923; padding: 13px 40px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; gap: 7px;
        }
        .uc-bc a { font-size: 12.5px; color: #00c896; text-decoration: none; cursor: pointer; }
        .uc-bc a:hover { text-decoration: underline; }
        .uc-bc span { font-size: 12px; color: #3a4a5a; }
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

        .uc-body {
          max-width: 1100px; margin: 0 auto;
          padding: 32px 40px 64px;
          display: grid; grid-template-columns: 248px 1fr; gap: 24px;
        }

        /* SIDEBAR */
        .uc-side { position: sticky; top: 100px; height: fit-content; }
        .uc-side-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 18px rgba(0,0,0,.07); overflow: hidden; }
        .uc-side-head {
          background: linear-gradient(135deg,#0f1923,#1a2d40);
          padding: 14px 20px;
          font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #5a7080;
        }
        .uc-side-scroll { max-height: calc(100vh - 180px); overflow-y: auto; }
        .uc-side-scroll::-webkit-scrollbar { width: 3px; }
        .uc-side-scroll::-webkit-scrollbar-track { background: transparent; }
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
        .uc-card-num {
          font-size: 32px; font-weight: 700; color: rgba(0,200,150,.25);
          font-variant-numeric: tabular-nums; line-height: 1; flex-shrink: 0;
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
        .uc-para { font-size: 14.5px; line-height: 1.85; color: #4a5a70; margin-bottom: 14px; }
        .uc-para:last-child { margin-bottom: 0; }

        .uc-h3 {
          font-size: 15px; font-weight: 700; color: #1a2d40;
          margin: 24px 0 10px; padding-bottom: 8px;
          border-bottom: 1px solid #edf0f4;
        }
        .uc-h3:first-child { margin-top: 0; }

        .uc-list {
          list-style: none; margin: 10px 0 14px; padding: 0;
          display: flex; flex-direction: column; gap: 9px;
        }
        .uc-list li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: #4a5a70; line-height: 1.7;
        }
        .uc-list li::before {
          content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: #00c896; flex-shrink: 0; margin-top: 7px;
        }

        .uc-inline-link { color: #00a87a; font-weight: 500; text-decoration: none; }
        .uc-inline-link:hover { text-decoration: underline; }

        /* nav between sections */
        .uc-section-nav {
          display: flex; justify-content: space-between; gap: 12px;
        }
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

        /* Footer card */
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
          .uc-side-card { border-radius: 10px; }
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
        <span>›</span>
        <Link to="/about">Company</Link>
        <span>›</span>
        <span className="uc-bc-cur">Terms of Service</span>
      </div>

      {/* HERO */}
      <div className="uc-hero">
        <div className="uc-hero-inner">
          <div className="uc-hero-label">Legal Information</div>
          <h1>Terms of Service</h1>
          <p>These terms govern your access to and use of the website, platforms, and related services operated under the Unicap Markets brand. By using our services, you agree to this agreement.</p>
        </div>
      </div>

      {/* WARNING */}
      <div className="uc-warn-wrap">
        <div className="uc-warn">
          <span className="uc-warn-ico">⚠️</span>
          <div>
            <div className="uc-warn-ttl">Risk Warning</div>
            <div className="uc-warn-txt">Trading involves substantial risk of loss. Review our Risk Disclosure before you trade or fund an account.</div>
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
            <span className="uc-chip">📜 Terms of Service</span>
            <span className="uc-chip">✓ Reg. 3766 LLC 2024</span>
            <span className="uc-chip">✓ Saint Vincent &amp; the Grenadines</span>
          </div>

          <div className="uc-card">
            <div className="uc-card-head">
              <div className="uc-card-num">{section.num}</div>
              <div>
                <div className="uc-card-ttl">{section.title}</div>
                <div className="uc-card-sub">Unicap Markets LLC · Terms of Service</div>
              </div>
            </div>
            <div className="uc-card-body">
              {section.content}
            </div>
          </div>

          {/* Prev / Next navigation */}
          {(() => {
            const ids = NAV_ITEMS.map(n => n.id);
            const idx = ids.indexOf(active);
            const prev = idx > 0 ? NAV_ITEMS[idx - 1] : null;
            const next = idx < ids.length - 1 ? NAV_ITEMS[idx + 1] : null;
            return (
              <div className="uc-section-nav">
                {prev ? (
                  <button className="uc-snav-btn" onClick={() => setActive(prev.id)}>
                    <span className="uc-snav-arrow">←</span>
                    <div>
                      <span className="uc-snav-label">Previous</span>
                      {prev.label}
                    </div>
                  </button>
                ) : <div />}
                {next ? (
                  <button className="uc-snav-btn next" onClick={() => setActive(next.id)}>
                    <div>
                      <span className="uc-snav-label">Next</span>
                      {next.label}
                    </div>
                    <span className="uc-snav-arrow">→</span>
                  </button>
                ) : <div />}
              </div>
            );
          })()}

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