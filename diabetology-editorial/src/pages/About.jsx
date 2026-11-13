import { SITE } from '../data.js';

export default function About() {
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">About</p>
        <h1>A focused home for diabetology training.</h1>
        <p className="deck">
          Diabetology is a programme line of {SITE.parent}. It offers certificate, fellowship and diploma programs for
          doctors who want to deepen their work in diabetes care.
        </p>
      </header>

      <section className="wrap section">
        <div className="two">
          <div>
            <h2>How the programs work</h2>
            <p>
              Each program has a named curriculum, with modules and sessions you can follow in order. You study online, at
              your own pace, alongside your clinical work.
            </p>
          </div>
          <div>
            <h2>What we publish</h2>
            <p>
              Fees, duration and start dates are shown on every program page before you enrol. If something is missing, ask
              us and we will confirm it in writing.
            </p>
          </div>
        </div>

        <div className="values">
          <div>
            <h3>Taught by practising physicians</h3>
            <p>Faculty bring current clinical experience into the sessions.</p>
          </div>
          <div>
            <h3>Structured, not scattered</h3>
            <p>Modules and sessions are listed in sequence so you always know what comes next.</p>
          </div>
          <div>
            <h3>Advice before you pay</h3>
            <p>An advisor can compare programs with you and answer questions about fit and timing.</p>
          </div>
        </div>
      </section>
    </>
  );
}
