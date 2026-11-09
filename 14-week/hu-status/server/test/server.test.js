const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createApp, DEMO_USER } = require('../app');

let server;
let baseUrl;

before(async () => {
  server = createApp({ secret: 'test-secret', tokenTtlSeconds: 1 }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const login = (email, password) =>
  fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

test('login with valid credentials returns a token', async () => {
  const res = await login(DEMO_USER.email, DEMO_USER.password);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(typeof body.token, 'string');
  assert.equal(body.user.email, DEMO_USER.email);
  assert.equal(body.user.password, undefined);
});

test('login with a wrong password returns 401', async () => {
  const res = await login(DEMO_USER.email, 'wrong');
  assert.equal(res.status, 401);
});

test('protected endpoint without token returns 401', async () => {
  const res = await fetch(`${baseUrl}/api/subjects`);
  assert.equal(res.status, 401);
});

test('protected endpoint with a valid token returns data', async () => {
  const { token } = await (await login(DEMO_USER.email, DEMO_USER.password)).json();
  const res = await fetch(`${baseUrl}/api/subjects`, { headers: { Authorization: `Bearer ${token}` } });
  assert.equal(res.status, 200);
  assert.ok((await res.json()).length > 0);
});

test('tampered token returns 401', async () => {
  const res = await fetch(`${baseUrl}/api/profile`, { headers: { Authorization: 'Bearer abc.def.ghi' } });
  assert.equal(res.status, 401);
});

test('expired token returns 401', async () => {
  const { token } = await (await login(DEMO_USER.email, DEMO_USER.password)).json();
  await new Promise((resolve) => setTimeout(resolve, 2100));
  const res = await fetch(`${baseUrl}/api/profile`, { headers: { Authorization: `Bearer ${token}` } });
  assert.equal(res.status, 401);
  assert.equal((await res.json()).error, 'Token expired.');
});
