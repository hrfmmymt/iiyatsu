const build = require('../app');

describe('server test', () => {
  const fastify = build();

  afterAll(() => {
    fastify.close();
  });

  test('GET `/`: responds with success on request /', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
  });

  test('GET `/:post`: responds with success on request /:post', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/20180606',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
  });

  test('GET `/api`: responds with success on request /api', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('GET `/sw.js`: responds with success on request /sw.js', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/sw.js',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/javascript');
  });

  test('GET `/favicon.ico`: responds with 404 on request /favicon.ico', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/favicon.ico',
    });

    expect(response.statusCode).toBe(404);
  });

  test('GET `/robots.txt`: responds with success on request /robots.txt', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/robots.txt',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/plain');
    expect(response.body).toBe('User-agent: *\nDisallow: /');
  });

  test('GET `/:post`: responds with 404 on request undefined post', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/404',
    });

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
  });
});
