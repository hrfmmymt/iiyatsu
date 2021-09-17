import tap from 'tap';
import * as path from 'path';
const marked = require('marked');
const hljs = require('highlight.js');

import { getPostInfo } from '../utils/get_post_info';

const expect = {
  title: 'mock-title',
  description: 'mock-desc',
  date: '2021-09-01',
  url: 'mock',
  html: 'mock-html',
};

tap.test('return data if `withHtml` is true', (t) => {
  return getPostInfo({
    postDir: path.join(__dirname, '/'),
    fileName: 'mock.md',
    withHtml: true,
  }).then((data) => {
    t.equal(data.title, expect.title);
    t.equal(data.description, expect.description);
    t.equal(data.date, expect.date);
    t.equal(data.url, expect.url);
    t.not(data.html, expect.html);
  });
});

tap.test('return html null if `withHtml` is false', async (t) => {
  return getPostInfo({
    postDir: path.join(__dirname, '/'),
    fileName: 'mock.md',
    withHtml: false,
  }).then((data) => {
    t.equal(data.title, expect.title);
    t.equal(data.description, expect.description);
    t.equal(data.date, expect.date);
    t.equal(data.url, expect.url);
    t.equal(data.html, null);
  });
});
