export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Valid email required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, tags: ['website'] })
    });

    if (res.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const err = await res.json();
    return new Response(
      JSON.stringify({ success: false, error: err }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
