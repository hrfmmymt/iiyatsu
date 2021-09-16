import { FastifyInstance } from 'fastify';

const server: FastifyInstance = require('./src/app')({
  logger: true,
  ignoreTrailingSlash: true,
});

server.listen(4567, (err: Error, address) => {
  if (err) throw err;
  console.log(`server listening on ${address}`);
});
