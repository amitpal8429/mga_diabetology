import { Routes, Route, Link } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Programs from './pages/Programs.jsx';
import ProgramDetail from './pages/ProgramDetail.jsx';
import Faculty from './pages/Faculty.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Info from './pages/Info.jsx';

const SITEMAP = [
  ['Home', '/'],
  ['All programs', '/programs'],
  ['Faculty', '/faculty'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Blog', '/blog'],
  ['App', '/app'],
  ['Privacy policy', '/privacy-policy'],
  ['Terms & Conditions', '/terms'],
  ['Refund & Cancellation Policy', '/refund'],
];

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="programs" element={<Programs />} />
        <Route path="programs/:slug" element={<ProgramDetail />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="blog"
          element={<Info title="Blog"><p>No articles have been published yet. Check back soon.</p></Info>}
        />
        <Route
          path="app"
          element={<Info title="App"><p>App store links will appear here once the app is published. Until then, contact us for access.</p></Info>}
        />
        <Route
          path="privacy-policy"
          element={<Info title="Privacy policy"><p>The policy text will be published here after legal review.</p></Info>}
        />
        <Route
          path="terms"
          element={<Info title="Terms & Conditions"><p>The terms text will be published here after legal review.</p></Info>}
        />
        <Route
          path="refund"
          element={<Info title="Refund & Cancellation Policy"><p>The refund policy will be published here after legal review.</p></Info>}
        />
        <Route
          path="sitemap"
          element={
            <Info title="Sitemap">
              <ul className="sitemap">
                {SITEMAP.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </Info>
          }
        />
        <Route
          path="*"
          element={
            <section className="wrap page-head">
              <h1>Page not found</h1>
              <p className="deck">
                <Link to="/" className="btn-text">Back to home</Link>
              </p>
            </section>
          }
        />
      </Route>
    </Routes>
  );
}
