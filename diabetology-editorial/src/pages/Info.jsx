export default function Info({ title, children }) {
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Diabetology</p>
        <h1>{title}</h1>
      </header>
      <section className="wrap section">
        <div className="info">{children}</div>
      </section>
    </>
  );
}
