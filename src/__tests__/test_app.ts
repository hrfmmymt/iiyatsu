const build = require('../app');

describe('server test', () => {
  const fastify = build();

  afterAll(() => {
    fastify.close();
  });

  test('responds with success on request /', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
  });

  test('GET `/:post` post', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/20180606',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
  });

  test('GET `/api` api', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('GET `/favicon.ico` favicon.ico', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/favicon.ico',
    });

    expect(response.statusCode).toBe(404);
  });

  test('GET `/:post` post', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/404',
    });

    expect(response.statusCode).toBe(404);
  });
});
