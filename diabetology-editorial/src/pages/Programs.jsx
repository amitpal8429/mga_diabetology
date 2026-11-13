import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAsync, fetchPrograms } from '../data.js';
import ProgramCard from '../ProgramCard.jsx';
import { Loading, Notice } from '../ui.jsx';

export default function Programs() {
  const state = useAsync(fetchPrograms, []);
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const type = params.get('type') || 'All';

  const types = useMemo(
    () => ['All', ...new Set((state.data || []).map((p) => p.type).filter(Boolean))],
    [state.data]
  );

  const list = (state.data || []).filter(
    (p) =>
      (type === 'All' || p.type === type) &&
      (p.name || '').toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Programs</p>
        <h1>Diabetology programs</h1>
        <p className="deck">Certificates, fellowships and diplomas. Open a program for its fee, duration and curriculum.</p>
      </header>

      <section className="wrap section">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Program type">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={t === type}
                onClick={() => setParams(t === 'All' ? {} : { type: t })}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="search"
            placeholder="Search by name"
            aria-label="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {state.loading ? (
          <Loading />
        ) : state.error ? (
          <Notice />
        ) : list.length === 0 ? (
          <p className="muted">No programs match this filter.</p>
        ) : (
          <div className="grid">
            {list.map((p) => (
              <ProgramCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
