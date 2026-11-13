import { SITE } from './data.js';

export function Loading() {
  return <p className="state">Loading...</p>;
}

export function Notice() {
  return (
    <div className="state notice">
      <strong>Programs could not be loaded right now.</strong>
      <p>
        Try again shortly, or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </div>
  );
}
