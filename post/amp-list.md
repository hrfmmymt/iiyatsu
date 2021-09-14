# amp-list でこのサイトの最新記事 n 件をリスト表示する

*date:2018-08-11*

*desc> これのやつ*

1. このサイトの記事の API エンドポイントを作る
1. [別の AMP サイト](https://hrfmmymt.github.io/)で `amp-list` コンポーネントを使ってこのサイトに上がった記事のタイトルとリンクをリスト表示する

というのをやりました。

`amp-list` の XMLHttpRequest で取得するデータは Cross-Origin Resource Sharing 対応しなければならないので、しました ( バックエンドは Cloud Functions for Firebase ) 。これ ([amphtml/amp-cors-requests.md at master · ampproject/amphtml](https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md)) を参考にしました。

API 実装はここまでで、あとは公式ドキュメント ( [amp-list – AMP](https://www.ampproject.org/docs/reference/components/amp-list) ) を参考に[別の AMP サイト](https://hrfmmymt.github.io/)側で `amp-list` の実装を適当にやったら適当に全リスト表示できたので、あとは微調整です。  
もともと "recent posts" というくくりで、最新の記事 5 件だけが表示されればよしと考えていたのでリストの表示数の制御できないかなと前述のドキュメントくまなく見直してみたら、下の方に [Validation](https://www.ampproject.org/docs/reference/components/amp-list#validation) という項目を発見しました。で、そこの [amp-list rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) というリンク先のソースコードに [attrs: { name: "max-items" }](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii#L102) という記述があったので、これかと思って勘で以下のように書いてみたら当たりでした。

```html
<!-- 最新の 5 件のみ表示 -->
<amp-list max-items="5" width="auto" height="120" layout="fixed-height">
```

やったぜ。

<footer>&#8718;</footer>
<nav class="post-recent">
  <dl><dt>次に出た記事</dt>
  <dd><a href="md-amp-img-webp">markdown から amp-img で webp 表示＆フォールバックのやつした</a></dd><dt>前に出た記事</dt>
  <dd><a href="20180808">TypeScript はじめました</a></dd></dl>
</nav>