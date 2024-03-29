# markdown から amp-img で webp 表示＆フォールバックのやつした

*date:2018-08-14*

*desc> tech*

## 皆さまお疲れ様です
まずは GEZAN の新曲を聞いてお疲れの身体をリセットしましょう。どうぞ。

<iframe width="560" height="315" src="https://www.youtube.com/embed/7_n9DdSFrjE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

はい。  
こんにちは、技術ブログです。このブログ自体の実装はまだまだ続けているので、記事が日報的になっていきます。

ということで、今回は当サイトの画像表示に webp を使うことにしました。それにあたって、

1. 画像最適化タスクに webp 書き出しを追加
1. Markdown での画像挿入により webp および、非対応ブラウザ ( Google Chrome 以外ということですね ) へのフォールバックタグ出力

の作業を行いました。

1\. に関してはプロジェクトルート側の package.json のスクリプトで呼び出して使っている、画像最適化用の Node.js ユーティリティ関数の修正で対応しました。  
修正内容としては、それまでに書いていた Jimp による最適化を行なった後に [imagemin-webp](https://github.com/imagemin/imagemin-webp) によるコンバートの処理の書き足しです。

2\. は Firebase Cloud Functions で行なっていた Markdown パーサーの出力処理修正で対応しました。

ということで、こう入力すると

`![alt](PATH/TO/IMG.jpg)`

こんな感じで出力されます。

```
<amp-img src="PATH/TO/IMG.webp" width="100" height="100" alt="alt">
  <amp-img fallback src="PATH/TO/IMG.jpg" width="100" height="100" alt="alt">
  </amp-img>
</amp-img>
```

やったぜ。

*2021年アップデート時に AMP をやめました*
<footer class="post-footer">&#8718;</footer><nav class="post-recent"><dl><dt>次に出た記事</dt><dd><a href="trip-to-hkd">北海道に行ってきました</a></dd><dt>前に出た記事</dt><dd><a href="amp-list">amp-list でこのサイトの最新記事 n 件をリスト表示する</a></dd></dl></nav>