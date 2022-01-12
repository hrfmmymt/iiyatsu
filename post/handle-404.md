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