import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SITE } from '../data.js';

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    program: params.get('program') || 'General enquiry',
    message: '',
  });
  const [status, setStatus] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus('Enter your name and a valid email address.');
      return;
    }
    // Connect this to your backend or a form service before going live.
    setStatus('Thank you. An advisor will reply by email within one working day.');
    setForm({ ...form, name: '', email: '', phone: '', message: '' });
  }

  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Contact</p>
        <h1>Talk to an advisor.</h1>
        <p className="deck">Tell us which program you are considering and we will reply with the details.</p>
      </header>

      <section className="wrap section">
        <div className="contact">
          <ul className="contact-info">
            <li>
              <span>Email</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
          </ul>

          <form className="form" onSubmit={submit} noValidate>
            <label>
              Full name
              <input name="name" value={form.name} onChange={update} autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" />
            </label>
            <label>
              Program
              <input name="program" value={form.program} onChange={update} />
            </label>
            <label className="full">
              Message
              <textarea name="message" value={form.message} onChange={update} />
            </label>
            <div className="full actions">
              <button className="btn" type="submit">Send enquiry</button>
              <p className="status" role="status" aria-live="polite">{status}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
