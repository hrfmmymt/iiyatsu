import { existsSync, readFileSync } from 'fs'
import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { parse } from 'dotenv'

const devVars = existsSync('.dev.vars') ? parse(readFileSync('.dev.vars', 'utf-8')) : {};

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  define: {
    'process.env': devVars
  }
})
