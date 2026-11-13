import { Link, useParams } from 'react-router-dom';
import { useAsync, fetchProgram, money, dateText, deptText, courseImage } from '../data.js';
import { Loading, Notice } from '../ui.jsx';

export default function ProgramDetail() {
  const { slug } = useParams();
  const state = useAsync(() => fetchProgram(slug), [slug]);

  if (state.loading) return <div className="page-wide"><Loading /></div>;
  if (state.error) return <div className="page-wide"><Notice /></div>;

  const p = state.data;
  if (!p) {
    return (
      <div className="page-wide">
        <h1>Program not found</h1>
        <p>
          <Link to="/programs" className="btn-text">Back to programs</Link>
        </p>
      </div>
    );
  }

  const img = courseImage(p);
  const highlights = (p.highlight || []).map((h) => h.highlight).filter(Boolean);
  const modules = (p.module || []).map((m) => m?.module).filter(Boolean);
  const lines = [
    ['Total program cost', money(p.total_fee)],
    ['Duration', p.duration ? `${p.duration} months` : null],
    ['Starts', dateText(p.start_date)],
    ['Department', deptText(p.department)],
  ].filter(([, v]) => v);

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/programs">Programs</Link>
        <span>›</span>
        <span>{p.name}</span>
      </nav>

      <header className="detail-head">
        <div className="pills">
          {p.duration && <span>{p.duration} months</span>}
          {p.type && <span className="accent">{p.type}</span>}
        </div>
        <h1>{p.name}</h1>
      </header>

      <div className="detail-grid">
        <div className="detail-main">
          {img && (
            <img className="cover" src={img} alt={p.image_alt || p.name} onError={(e) => e.currentTarget.remove()} />
          )}

          <h2>About this program</h2>
          {p.description ? (
            <div className="body">{p.description.replace(/\r\n/g, '\n')}</div>
          ) : (
            <p className="muted">Full description coming soon.</p>
          )}

          {highlights.length > 0 && (
            <>
              <h2>What this program covers</h2>
              <ul className="checks">
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          )}

          {modules.length > 0 && (
            <>
              <h2>Curriculum</h2>
              <ol className="modules">
                {modules.map((m, i) => (
                  <li key={i}>
                    <span className="mnum">{String(i + 1).padStart(2, '0')}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>

        <aside className="fee-card">
          <p className="fee-label">Registration fee</p>
          <p className="fee-big">{money(p.fee) ?? 'On request'}</p>
          <dl className="fee-lines">
            {lines.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <Link className="btn full" to={`/contact?program=${encodeURIComponent(p.name)}`}>
            Enquire about this program
          </Link>
          <Link className="btn ghost full" to="/contact">
            Talk to an advisor
          </Link>
        </aside>
      </div>
    </>
  );
}
