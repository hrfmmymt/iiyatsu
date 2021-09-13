import tap from 'tap';
import fastify, { FastifyInstance } from 'fastify';
import * as path from 'path';
const request = require('supertest');

const build = require('../src/app');
import { checkFileExistence } from '../utils/check_file_existence';

tap.test('GET `/` route', (t) => {
  t.plan(3);

  const fastify = build();

  t.teardown(() => fastify.close());

  fastify.inject(
    {
      method: 'GET',
      url: '/',
    },
    (err: Error, response: any) => {
      t.error(err);
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'text/html; charset=utf-8');
    },
  );
});

tap.test('GET `/:post` post', (t) => {
  t.plan(3);

  const fastify = build();

  t.teardown(() => fastify.close());

  fastify.inject(
    {
      method: 'GET',
      url: '/20180606',
    },
    (err: Error, response: any) => {
      t.error(err);
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'text/html; charset=utf-8');
    },
  );
});

tap.test('GET `/api` api', (t) => {
  t.plan(3);

  const fastify = build();

  t.teardown(() => fastify.close());

  fastify.inject(
    {
      method: 'GET',
      url: '/api',
    },
    (err: Error, response: any) => {
      t.error(err);
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
    },
  );
});

tap.test('GET `/favicon.ico` favicon.ico', (t) => {
  t.plan(2);

  const fastify = build();

  t.teardown(() => fastify.close());

  fastify.inject(
    {
      method: 'GET',
      url: '/favicon.ico',
    },
    (err: Error, response: any) => {
      t.error(err);
      t.equal(response.statusCode, 404);
    },
  );
});

// tap.test('GET `/:post` post', (t) => {
//   t.plan(1);

//   const fastify = build();

//   t.teardown(() => fastify.close());

//   fastify.inject(
//     {
//       method: 'GET',
//       url: '/404',
//     },
//     (err: Error, response: any) => {
//       t.error(err);
//       t.equal(response.statusCode, 404);
//     }
//   );
// });

// tap.test('404', function (t) {
// const fastify: FastifyInstance = build();
// const request = supertest(fastify);
// request(fastify)
//   .get('/333')
//   .expect(404)
// .end((err: any) => {
//   t.error(err);
//   t.end();
// });
// });

// describe('POST Not found', () => {
//   const fastify = build();
//   it('respond with 404', done => {
//     const request = supertest(fastify);
//     request
//       .get('/notfound.md')
//       .expect(404, done);
//   });
// });

// tap.test('shorthand - empty', t => {
//   t.plan(2)
//   const fastify = build();
//   sget({
//     method: 'GET',
//     url: 'http://localhost:' + fastify.server.address() + '/empty'
//   }, (err: Error) => {
//     t.error(err)
//     t.pass
//     // t.strictEqual(response.statusCode, 204)
//   })
// })

// tap.test('empty response', t => {
//   t.plan(1)
//   const fastify = build();
//   try {
//     fastify.get('/empty', function (req, reply) {
//       reply.code(204).send()
//     })
//     t.pass();
//   } catch (e) {
//     t.fail();
//   }
// })
