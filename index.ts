import { FastifyInstance } from 'fastify';

import { CONFIG } from './constants';
import createServer from './src/app';

const server: FastifyInstance = createServer({
  logger: true,
  ignoreTrailingSlash: true,
});

server.listen({ 
  port: CONFIG.DEV_PORT,
  host: '0.0.0.0'
}, (err: Error | null, address: string) => {
  if (err) throw err;
  console.log(`server listening on ${address}`);
});