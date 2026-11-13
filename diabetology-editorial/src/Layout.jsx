import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, PROGRAM_TYPES } from './data.js';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/programs', label: 'Programs' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/about', label: 'About' },
];

const TAGLINE =
  'Certificate and fellowship programs that let practising doctors specialise without stepping away from clinical work.';

const LOGO_URL = 'https://medicalglobalacademy.com/wp-content/uploads/2026/08/logo_new.png';

// Replace each href with the academy's real social profile URL.
const SOCIAL = [
  { label: 'Instagram', mark: 'Ig', href: '#' },
  { label: 'LinkedIn', mark: 'in', href: '#' },
  { label: 'X', mark: 'X', href: '#' },
  { label: 'YouTube', mark: 'YT', href: '#' },
  { label: 'Facebook', mark: 'f', href: '#' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="util">
        <div className="wrap util-row">
          <span>{SITE.parent} presents Diabetology</span>
          <span className="util-links">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </span>
        </div>
      </div>

      <div className="wrap head-row">
        {/* Updated Logo Link */}
        <Link to="/" className="wordmark" aria-label="Diabetology home">
          <img 
            src={LOGO_URL} 
            alt="Medical Global Academy Logo" 
            style={{ height: '48px', width: 'auto', display: 'block' }} 
          />
          <small>Postgraduate programs in diabetes care</small>
        </Link>

        <nav id="site-nav" className={'nav' + (open ? ' open' : '')} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="head-end">
          <Link to="/contact" className="pill">Enquire</Link>
          <button
            className="burger"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          {/* Updated Footer Logo */}
          <Link to="/" className="foot-brand" aria-label="Medical Global Academy Home">
            <img 
              src={LOGO_URL} 
              alt="Medical Global Academy Logo" 
              style={{ height: '40px', width: 'auto', display: 'block', marginBottom: '16px' }} 
            />
          </Link>
          <p className="foot-tagline">{TAGLINE}</p>
          <p className="foot-parent">A programme line of {SITE.parent}</p>
          <ul className="foot-contact">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
          </ul>
          <div className="social">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} title={s.label}>
                {s.mark}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/programs">All programs</Link>
            </li>
            <li>
              <Link to="/faculty">Faculty</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Program types</h3>
          <ul>
            {PROGRAM_TYPES.map((t) => (
              <li key={t}>
                <Link to={`/programs?type=${encodeURIComponent(t)}`}>
                  {t === 'Certificate' ? 'Certificate courses' : t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Support</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link to="/app">App</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/refund">Refund & Cancellation Policy</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot-base">
        &copy; {new Date().getFullYear()} Diabetology. All rights reserved.
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Header />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}