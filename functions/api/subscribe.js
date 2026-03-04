const ALLOWED_ORIGIN = 'https://verifiedsoftware.dev';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_MAX = 5; // requests per IP per window

function corsHeaders(origin) {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin') || '';
  const headers = corsHeaders(origin);

  if (origin !== ALLOWED_ORIGIN) {
    return new Response(
      JSON.stringify({ success: false, error: 'Forbidden' }),
      { status: 403, headers }
    );
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateKey = `rate:${ip}`;

  try {
    // Rate limiting via D1
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Clean old entries and count recent requests
    await env.DB.prepare('DELETE FROM rate_limits WHERE ts < ?').bind(windowStart).run();
    const { results } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM rate_limits WHERE ip = ? AND ts >= ?'
    ).bind(ip, windowStart).run();

    if (results[0].count >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many requests. Try again later.' }),
        { status: 429, headers }
      );
    }

    // Record this request
    await env.DB.prepare('INSERT INTO rate_limits (ip, ts) VALUES (?, ?)').bind(ip, now).run();

    const { email } = await request.json();
    const cleaned = typeof email === 'string' ? email.toLowerCase().trim() : '';

    if (!cleaned || cleaned.length > 254 || !EMAIL_RE.test(cleaned)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Valid email required' }),
        { status: 400, headers }
      );
    }

    await env.DB.prepare(
      'INSERT INTO subscribers (email, subscribed_at) VALUES (?, ?) ON CONFLICT(email) DO NOTHING'
    ).bind(cleaned, new Date().toISOString()).run();

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions({ request }) {
  const origin = request.headers.get('Origin') || '';
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
