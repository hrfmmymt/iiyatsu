import { writeFileSync } from 'fs';
import { join } from 'path';

const routesConfig = {
  version: 1,
  include: ['/*'],
  exclude: ['/static/*']
};

const distPath = join(process.cwd(), 'dist', '_routes.json');
writeFileSync(distPath, JSON.stringify(routesConfig, null, 2));

console.log('✓ _routes.json updated successfully');
