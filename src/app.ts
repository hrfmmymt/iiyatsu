import * as fs from 'fs';
import * as path from 'path';

import fastify, { FastifyInstance } from 'fastify';

import { getPostInfo } from '../utils/get_post_info';
import { CONFIG, META } from '../constants';

const isSSG = process.env.NODE_ENV !== 'ssg' || !process.env.BUILD_SSG;

function enableCors(req: any, reply: any, opt_exposeHeaders: any) {
  reply.header('Access-Control-Allow-Credentials', 'true');
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header(
    'Access-Control-Expose-Headers',
    ['AMP-Access-Control-Allow-Source-Origin'].concat(opt_exposeHeaders || []).join(', '),
  );
  if (req.query.__amp_source_origin) {
    reply.header('AMP-Access-Control-Allow-Source-Origin', req.query.__amp_source_origin);
  }
}

function ssrIndexPage(reply: any) {
  reply.view('./templates/index.njk', {
    head: {
      author: META.AUTHOR,
      description: META.DESCRIPTION,
      favicon: META.FAVICON,
      ogImage: META.OG_IMAGE,
      ogType: 'website',
      title: META.TITLE,
      url: META.URL,
      year: CONFIG.CURRENT_YEAR,
    },
    postList: CONFIG.POST_LIST,
    footer: {
      gaDetails: CONFIG.GA_DETAILS,
      gaSummary: CONFIG.GA_SUMMARY,
    },
  });
}

function ssgIndexPage(reply: any) {
  const filePath = './public/index.html';
  if (fs.existsSync(filePath)) {
    reply.sendFile(filePath);
  } else {
    reply.sendFile('<html>404</html>');
  }
}

function ssrPostPage(post: string, reply: any) {
  const fileName = path.format({
    name: post,
    ext: '.md',
  });
  const filePath = CONFIG.POST_DIR + fileName;

  if (fs.existsSync(filePath)) {
    getPostInfo({ postDir: CONFIG.POST_DIR, fileName, withHtml: true }).then((postInfo) => {
      reply.view('./templates/page/post.njk', {
        head: {
          author: META.AUTHOR,
          description: postInfo.description,
          favicon: META.FAVICON,
          ogImage: META.OG_IMAGE,
          ogType: 'article',
          title: `${postInfo.title} | ${META.TITLE}`,
          url: `${META.URL}${postInfo.url}`,
          year: CONFIG.CURRENT_YEAR,
        },
        post: {
          contents: postInfo.html,
        },
        footer: {
          gaDetails: CONFIG.GA_DETAILS,
          gaSummary: CONFIG.GA_SUMMARY,
        },
      });
    });
  } else {
    reply.code(404).view('./templates/page/404.njk', {
      head: {
        author: META.AUTHOR,
        description: `404, page not found | ${META.DESCRIPTION}`,
        favicon: META.FAVICON,
        ogImage: META.OG_IMAGE,
        ogType: 'website',
        title: `404 | ${META.TITLE}`,
        url: `${META.URL}${post}`,
        year: CONFIG.CURRENT_YEAR,
      },
    });
  }
}

function ssgPostPage(post: string, reply: any) {
  const fileName = path.format({
    name: post,
    ext: '.html',
  });
  const filePath = './public/posts/' + fileName;

  if (fs.existsSync(filePath)) {
    reply.sendFile(filePath);
  } else {
    reply.sendFile('<html>404</html>');
  }
}

function build(opts = {}) {
  const app: FastifyInstance = fastify(opts);

  app.register(require('point-of-view'), {
    engine: {
      nunjucks: require('nunjucks'),
    },
  });

  app.register(require('fastify-static'), {
    root: path.join(__dirname, '../'),
    prefix: '/',
  });

  app.get('/', (_req, reply: any) => {
    if (isSSG) {
      ssgIndexPage(reply);
    } else {
      ssrIndexPage(reply);
    }
  });

  app.get('/:post', (req: any, reply: any) => {
    const { post } = req.params;

    if (process.env.NODE_ENV !== 'ssg') {
      ssrPostPage(post, reply);
    } else {
      ssgPostPage(post, reply);
    }
  });

  app.get('/api', (req, reply) => {
    enableCors(req, reply, undefined);
    reply.send(CONFIG.POST_LIST);
  });

  app.get('/sw.js', (_req, reply) => {
    fs.readFile('./public/sw.js', 'utf-8', (err, fileBuffer) => {
      reply.type('text/javascript').send(err || fileBuffer);
    });
  });

  app.get('/robots.txt', (_req, reply) => {
    reply.type('text/plain').send('User-agent: *\nDisallow: /');
  });

  return app;
}

module.exports = build;
