import { Link } from 'react-router-dom';
import { money, dateText, courseImage } from './data.js';

export default function ProgramCard({ p }) {
  const img = courseImage(p);
  const fee = money(p.fee);
  const start = dateText(p.start_date);
  const meta = [p.duration ? `${p.duration} months` : null, start ? `Starts ${start}` : null].filter(Boolean);
  const href = `/programs/${p.slug}`;

  return (
    <article className="pcard">
      <Link to={href} className="pcard-thumb" aria-label={p.name}>
        {img && (
          <img src={img} alt={p.image_alt || p.name} loading="lazy" onError={(e) => e.currentTarget.remove()} />
        )}
        <span className="pcard-badge">{p.type || 'Program'}</span>
      </Link>

      <div className="pcard-body">
        {meta.length > 0 && (
          <div className="pills">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
        <h3>
          <Link to={href}>{p.name}</Link>
        </h3>
        <p className="pcard-desc">{(p.description || '').replace(/\s+/g, ' ').slice(0, 160)}</p>
        <div className="pcard-foot">
          <b>{fee ?? 'Fee on request'}</b>
          <Link to={href} className="pcard-link">
            View program →
          </Link>
        </div>
      </div>
    </article>
  );
}
