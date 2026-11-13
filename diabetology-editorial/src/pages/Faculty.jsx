import { useAsync, fetchFaculty, initials } from '../data.js';
import { Loading, Notice } from '../ui.jsx';

export default function Faculty() {
  const state = useAsync(fetchFaculty, []);

  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Faculty</p>
        <h1>Doctors who treat patients as well as teach.</h1>
        <p className="deck">Our faculty practise medicine. Their teaching comes from clinical work, not only from academic posts.</p>
      </header>

      <section className="wrap section">
        {state.loading ? (
          <Loading />
        ) : state.error ? (
          <Notice />
        ) : (
          <ul className="fgrid">
            {state.data.map((f, i) => {
              const photo = f.external_photo_url || f.profileImage || f.image_url;
              return (
                <li key={f.id ?? i}>
                  <span className="mono" data-ini={initials(f.name)}>
                    {photo && <img src={photo} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />}
                  </span>
                  <div>
                    <strong>{f.name}</strong>
                    {f.qualification && <span>{f.qualification}</span>}
                    {f.department && <em>{f.department}</em>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
