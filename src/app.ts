import fastify, { FastifyInstance } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

import { getPostInfo } from '../utils/get_post_info';

const COMMON_TITLE = "iiyatsu - hrfmmymt's weblog";
const PUBLIC_URL = 'https://iiyatsu.hrfmmymt.com/';
const GA_SUMMARY =
  'This website uses Google Analytics, a web analytics service provided by Google.';
const GA_DETAILS =
  'Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyse how users use the site.';

const config = {
  currentYear: new Date().getFullYear(),
  postDir: path.join(__dirname, '../post/'),
  postList: JSON.parse(fs.readFileSync(path.join(__dirname, '../post-list.json'), 'utf8')),
  gaSummary: GA_SUMMARY,
  gaDetails: GA_DETAILS,
};

const metadata = {
  author: 'hrfmmymt',
  copyright: 'Copyright &copy; 2021 iiyatsu of hrfmmymt All Rights Reserved.',
  description: "hrfmmymt's weblog",
  ogImage: 'public/img/icon/icon.png',
  favicon: 'public/img/icon/favicon.ico',
  title: COMMON_TITLE,
  url: PUBLIC_URL,
};

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
    reply.view('./templates/index.njk', {
      head: {
        author: metadata.author,
        description: metadata.description,
        favicon: metadata.favicon,
        ogImage: metadata.ogImage,
        ogType: 'website',
        title: metadata.title,
        url: metadata.url,
        year: config.currentYear,
      },
      postList: config.postList,
      footer: {
        gaDetails: config.gaDetails,
        gaSummary: config.gaSummary,
      },
    });
  });

  app.get('/:post', (req: any, reply: any) => {
    const { post } = req.params;
    const fileName = path.format({
      name: post,
      ext: '.md',
    });
    const filePath = config.postDir + fileName;

    if (fs.existsSync(filePath)) {
      getPostInfo({ postDir: config.postDir, fileName, withHtml: true }).then((postInfo) => {
        reply.view('./templates/page/post.njk', {
          head: {
            author: metadata.author,
            description: postInfo.description,
            favicon: metadata.favicon,
            ogImage: metadata.ogImage,
            ogType: 'article',
            title: `${postInfo.title} | ${metadata.title}`,
            url: `${metadata.url}${postInfo.url}`,
            year: config.currentYear,
          },
          post: {
            contents: postInfo.html,
          },
          footer: {
            gaDetails: config.gaDetails,
            gaSummary: config.gaSummary,
          },
        });
      });
    } else {
      reply.code(404).view('./templates/page/404.njk', {
        head: {
          author: metadata.author,
          description: `404, page not found | ${metadata.description}`,
          favicon: metadata.favicon,
          ogImage: metadata.ogImage,
          ogType: 'website',
          title: `404 | ${metadata.title}`,
          url: `${metadata.url}${post}`,
          year: config.currentYear,
        },
      });
    }
  });

  app.get('/api', (_req, reply) => {
    reply.send(config.postList);
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
