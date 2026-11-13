import { Link } from 'react-router-dom';
import { useAsync, fetchPrograms, fetchFaculty } from '../data.js';
import ProgramCard from '../ProgramCard.jsx';
import { Loading, Notice } from '../ui.jsx';

const countOf = (s) => (s.loading ? '...' : s.error ? '-' : s.data.length);

export default function Home() {
  const programs = useAsync(fetchPrograms, []);
  const faculty = useAsync(fetchFaculty, []);

  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="eyebrow">Postgraduate diabetology</p>
          <h1>
            Diabetes care, <em>taught</em> by the people who treat it.
          </h1>
          <p className="deck">
            Certificates, fellowships and diplomas for doctors. Study online and keep your clinic hours.
          </p>
          <div className="actions">
            <Link className="btn" to="/programs">Browse programs</Link>
            <Link className="btn-text" to="/contact">Talk to an advisor →</Link>
          </div>
        </div>
        <blockquote className="pull">
          <p>Every program lists its fee, duration and start date before you enrol.</p>
          <cite>How we publish our programs</cite>
        </blockquote>
      </section>

      <section className="wrap facts">
        <div>
          <b>{countOf(programs)}</b>
          <span>Diabetology programs</span>
        </div>
        <div>
          <b>{countOf(faculty)}</b>
          <span>Faculty members</span>
        </div>
        <div>
          <b>Online</b>
          <span>Self-paced study</span>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Current programs</h2>
          <Link to="/programs" className="btn-text">See all programs →</Link>
        </div>
        {programs.loading ? (
          <Loading />
        ) : programs.error ? (
          <Notice />
        ) : programs.data.length === 0 ? (
          <p className="muted">No diabetology programs are listed yet.</p>
        ) : (
          <div className="grid">
            {programs.data.slice(0, 3).map((p) => (
              <ProgramCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
