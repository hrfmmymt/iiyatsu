import tap from 'tap';

import { getPostInfo } from '../utils/get_post_info';

const expect = {
  title: '0',
  description: 'enable',
  date: '1999-09-11',
  url: '0',
  html: null,
};

tap.test('return data if `withHtml` is true', (t) => {
  return getPostInfo({ fileName: '0.md', withHtml: true }).then((data) => {
    t.equal(data.title, expect.title);
    t.equal(data.description, expect.description);
    t.equal(data.date, expect.date);
    t.equal(data.url, expect.url);
    t.not(data.html, null);
  });
});

tap.test('return html null if `withHtml` is false', async (t) => {
  return getPostInfo({ fileName: '0.md', withHtml: false }).then((data) => {
    t.equal(data.title, expect.title);
    t.equal(data.description, expect.description);
    t.equal(data.date, expect.date);
    t.equal(data.url, expect.url);
    t.equal(data.html, expect.html);
  });
});

tap.test('error: ENOENT', async (t) => {
  return getPostInfo({ fileName: 'XXX', withHtml: false }).catch(() =>
    t.pass('expected rejection')
  );
});
