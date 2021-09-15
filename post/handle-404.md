# handle 404

*date:2021-09-01*

*desc> wei*

vercel デプロイ時、↓で 404 のハンドリングができず 500 が返ってしまってた ( ローカルだとOK )。

```javascript
try {
  fs.statSync(filePath);
} catch (error) {
  if (error.code === 'ENOENT') {
    reply.code(404).view('./templates/page/404.njk');
  }
}

getPostInfo({ fileName, withHtml: true }).then((postInfo) => {
...
```

↓で解決。

```javascript
if (fs.existsSync(filePath)) {
  getPostInfo({ fileName, withHtml: true }).then((postInfo) => {
  ...
} else {
  reply.code(404).view('./templates/page/404.njk');
}
```

<footer>&#8718;</footer><nav class="post-recent"><dl><dt>前に出た記事</dt><dd><a href="%E3%83%88%E3%82%A5%E3%83%BC%E3%83%89%E3%82%A5%E3%83%BC">トゥードゥー</a></dd></dl></nav>