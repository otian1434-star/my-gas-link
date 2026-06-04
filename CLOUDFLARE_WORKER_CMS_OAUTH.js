function randomHex(bytes) {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function githubAuthorizeUrl({ clientId, redirectUri, scope, state }) {
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scope);
  url.searchParams.set('state', state);
  return url.toString();
}

async function exchangeGithubToken({ clientId, clientSecret, code, redirectUri }) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const json = await response.json();
  if (!response.ok || !json.access_token) {
    throw new Error(json.error_description || json.error || 'GitHub token exchange failed');
  }
  return json.access_token;
}

function callbackHtml(status, token) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authorizing CMS</title>
  <script>
    const receiveMessage = (message) => {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify({ token })}',
        '*'
      );
      window.removeEventListener('message', receiveMessage, false);
    };
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  </script>
</head>
<body>
  <p>Authorizing CMS...</p>
</body>
</html>`;
}

function requireEnv(env, name) {
  if (!env[name]) throw new Error(`Missing ${name}`);
  return env[name];
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  if (url.searchParams.get('provider') !== 'github') {
    return new Response('Invalid provider', { status: 400 });
  }

  const clientId = requireEnv(env, 'GITHUB_OAUTH_ID');
  const repoIsPrivate = env.GITHUB_REPO_PRIVATE && env.GITHUB_REPO_PRIVATE !== '0';
  const scope = repoIsPrivate ? 'repo,user' : 'public_repo,user';
  const redirectUri = `${url.origin}/callback?provider=github`;
  const location = githubAuthorizeUrl({
    clientId,
    redirectUri,
    scope,
    state: randomHex(8),
  });

  return Response.redirect(location, 302);
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  if (url.searchParams.get('provider') !== 'github') {
    return new Response('Invalid provider', { status: 400 });
  }

  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const token = await exchangeGithubToken({
    clientId: requireEnv(env, 'GITHUB_OAUTH_ID'),
    clientSecret: requireEnv(env, 'GITHUB_OAUTH_SECRET'),
    code,
    redirectUri: `${url.origin}/callback?provider=github`,
  });

  return new Response(callbackHtml('success', token), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (url.pathname === '/auth') return handleAuth(request, env);
      if (url.pathname === '/callback') return handleCallback(request, env);

      return new Response('曜舞天堂 CMS OAuth worker is running.', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    } catch (error) {
      return new Response(String(error && error.message ? error.message : error), {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  },
};
