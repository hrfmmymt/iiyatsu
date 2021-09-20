# amp-lightbox でのアクセシビリティ戦略

*date:2018-09-10*

*desc> AMPで取り組むa11yシリーズ*

## はじめに
ちぇーす。  
[前回の記事](20180906#-amp)で「何かの折に各コンポーネントのアクセシビリティ検証してみようかしらとか考えています」と書いたのでやってみました。  
今回は当サイト未対応の amp-lightbox でやってみました。ちょっと使ってみようかなという気持ちはある感じです。

## デモ
[amp-lightbox a11y test - codepen](https://codepen.io/hrfmmymt/pen/xaLoyJ)

スタイル全くあててないのでわかりづらいかもですが、やりたかったのは基本的にはフォーカス管理です。  

## 要件
1. ボタンでパネルを開いたらフォーカスがパネル側に移ること
1. パネル側で閉じるボタンをクリックしたら元の画面の開くボタンにフォーカスが戻ること
1. `history.pushState()` 的なやつでブラウザバックでパネルが閉じられること

これが実現できました。

## やりかた
1\. は
```html
<amp-lightbox id="myLightbox1" layout="nodisplay" on="lightboxOpen:myLightbox1.focus" role="dialog">
```
の `on="lightboxOpen:myLightbox1.focus"` で。

2\. は
```html
<button on="tap:myLightbox1.close, btnLightbox1.focus">close lightbox 1</button>
```
の `on="tap:myLightbox1.close, btnLightbox1.focus"` で。

3\. は何もしていません。ビルトインですね。素敵。

## おわりに
パネルが開いている時にフォーカス移動をパネル内に収めるのは、フル AMP サイトでは自前スクリプト書けないのでできなさそうですね。ここは残念ですけど、すでに issue は開いてるよう。  
[[A11Y] amp-lightbox should be a modal dialog · Issue #4892 · ampproject/amphtml](https://github.com/ampproject/amphtml/issues/4892)

今回はここまで。冒頭で「シリーズ」と書いたので、またいつか別のコンポーネントでも検証してみますね。  
それでは、ご確認のほど何卒よろしくお願いいたします。

## 参考
- [WAI-ARIA Authoring Practice Dialog(Modal)のフォーカス管理 - /var/log/sukoyakarizumu](http://sukoyakarizumu.hatenablog.com/entry/2017/12/03/171400)
- [モーダルウィンドウを考える &mdash; Website Usability Info](https://website-usability.info/2015/07/entry_150706.html)
- [アクセシブルなモーダルダイアログの作り方 #scripty05](https://www.slideshare.net/techblogyahoo/scripty05)
- [モーダルダイアログを視覚表現だけで終わらせない - Web Accessibility Advent Calendar 2013 - neotagの雑文](http://d.hatena.ne.jp/neotag/20131202/1385950612)
<footer class="post-footer">&#8718;</footer><nav class="post-recent"><dl><dt>次に出た記事</dt><dd><a href="20181017">転職のこと</a></dd><dt>前に出た記事</dt><dd><a href="20180906">20180906</a></dd></dl></nav>