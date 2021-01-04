import { FastifyInstance } from 'fastify';

const server: FastifyInstance = require('./src/app')({
  logger: true,
  ignoreTrailingSlash: true,
});

server.listen(3000, (err: Error, address) => {
  if (err) throw err;
  console.log(`server listening on ${address}`);
});
