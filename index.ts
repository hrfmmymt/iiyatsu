import { FastifyInstance } from 'fastify';
import { CONFIG } from './constants';

const server: FastifyInstance = require('./src/app')({
  logger: true,
  ignoreTrailingSlash: true,
});

server.listen(CONFIG.DEV_PORT, (err: Error, address) => {
  if (err) throw err;
  console.log(`server listening on ${address}`);
});
