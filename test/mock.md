# mock

*date:2021-09-01*

*desc> mock*

mock

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
