import { useEffect, useState } from 'react';

export const SITE = {
  name: 'Diabetology',
  parent: 'Medical Global Academy',
  email: 'support@medicalglobalacademy.com',
  phone: '+91 9289994218',
  phoneHref: 'tel:+919289994218',
  api: 'https://24x7.medicalglobalacademy.com/api',
  images: 'https://24x7.medicalglobalacademy.com/storage/uploads/course/',
};

export const PROGRAM_TYPES = ['Certificate', 'Fellowship', 'PG Diploma'];

// Only programs whose category, department or name contains this word are shown.
export const KEYWORD = 'diabet';

export function inSubject(course) {
  const k = KEYWORD.toLowerCase();
  return [course?.category?.name, course?.department, course?.name].some((v) =>
    String(v ?? '').toLowerCase().includes(k)
  );
}

async function getJson(path) {
  const res = await fetch(SITE.api + path, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return Array.isArray(data) ? data : data.data ?? data;
}

export const fetchPrograms = async () => (await getJson('/course-list')).filter(inSubject);

export async function fetchProgram(slug) {
  const data = await getJson('/course-details/' + encodeURIComponent(slug));
  const course = Array.isArray(data) ? data[0] : data;
  return course && inSubject(course) ? course : null;
}

export const fetchFaculty = () => getJson('/faculty-list');

// { loading, error, data } for any async call
export function useAsync(fn, deps) {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  useEffect(() => {
    let alive = true;
    setState({ loading: true, error: null, data: null });
    fn()
      .then((data) => alive && setState({ loading: false, error: null, data }))
      .catch((error) => alive && setState({ loading: false, error, data: null }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export const money = (n) =>
  n === null || n === undefined || n === '' ? null : '₹' + Number(n).toLocaleString('en-IN');

export const dateText = (s) => {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export function deptText(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.join(', ') : raw;
  } catch {
    return raw;
  }
}

export const courseImage = (c) => (c?.image ? SITE.images + c.image : '');

export const initials = (name) =>
  String(name || '')
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
