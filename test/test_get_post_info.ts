import tap from 'tap';
const marked = require('marked');
const hljs = require('highlight.js');

import { getPostInfo } from '../utils/get_post_info';

const expect = {
  title: 'preact-cli でポートフォリオサイトを作った',
  description: 'ギジュツテキ',
  date: '2018-06-06',
  url: '20180606',
  html: null,
};

tap.test('return data if `withHtml` is true', (t) => {
  return getPostInfo({ fileName: '20180606.md', withHtml: true }).then((data) => {
    t.equal(data.title, expect.title);
    t.equal(data.description, expect.description);
    t.equal(data.date, expect.date);
    t.equal(data.url, expect.url);
    t.not(data.html, null);
  });
});

tap.test('return html null if `withHtml` is false', async (t) => {
  return getPostInfo({ fileName: '20180606.md', withHtml: false }).then((data) => {
    t.equal(data.title, expect.title);
    t.equal(data.description, expect.description);
    t.equal(data.date, expect.date);
    t.equal(data.url, expect.url);
    t.equal(data.html, expect.html);
  });
});

tap.test('error: ENOENT', async (t) => {
  return getPostInfo({ fileName: 'XXX', withHtml: false }).catch(() =>
    t.pass('expected rejection'),
  );
});
