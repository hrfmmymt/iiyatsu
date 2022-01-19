const build = require('../app');

const responseHeadersContentType = (response: any): string => {
  return response.headers['content-type'].toLowerCase();
};

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
    expect(responseHeadersContentType(response)).toBe('text/html; charset=utf-8');
  });

  test('GET `/:post`: responds with success on request /:post', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/20180606',
    });

    expect(response.statusCode).toBe(200);
    expect(responseHeadersContentType(response)).toBe('text/html; charset=utf-8');
  });

  test('GET `/api`: responds with success on request /api', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api',
    });

    expect(response.statusCode).toBe(200);
    expect(responseHeadersContentType(response)).toBe('application/json; charset=utf-8');
  });

  test('GET `/sw.js`: responds with success on request /sw.js', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/sw.js',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/javascript');
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
    expect(responseHeadersContentType(response)).toBe('text/html');
  });
});
