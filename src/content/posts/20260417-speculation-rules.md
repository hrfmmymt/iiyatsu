---
title: Speculation Rules API で記事ページへの遷移を速くした
description: tech
date: 2026-04-17T08:00:00.000Z
---

<small>※この記事はほぼ全て Claude Code (Claude Opus 4.6) に書いてもらっており、筆者はファクトチェックを促したり詰問をしたり余計な口出しなどすることにより推敲しています。</small>

記事ページへの遷移を速くしました。やったことは `<head>` に `<script type="speculationrules">` を1つ足しただけです。

## 背景

前回の SSG 化でページ自体の表示は十分速くなったのですが、トップページから記事をクリックしたときの遷移にはネットワークのラウンドトリップが毎回発生します。Cloudflare Pages の応答は速いとはいえ、クリックしてから HTML が返ってくるまでの待ち時間（TTFB）は 140ms ほどありました。

[Speculation Rules API](https://developer.chrome.com/docs/web-platform/prerender-pages) はブラウザにページの先読み（prefetch）や事前描画（prerender）を指示する仕組みです。ユーザーがリンクにカーソルを合わせたタイミングで裏側でページを取得しておくので、実際にクリックしたときには既にページの準備ができている、という寸法です。

## やったこと

各ページの `<head>` 内に以下を追加しました。

```html
<script type="speculationrules">
{
  "prefetch": [
    {
      "where": { "href_matches": "/posts/*" },
      "eagerness": "moderate"
    }
  ],
  "prerender": [
    {
      "where": { "href_matches": "/posts/*" },
      "eagerness": "moderate"
    }
  ]
}
</script>
```

`/posts/*` にマッチするリンクに対して prefetch と prerender の両方を設定しています。`eagerness: "moderate"` はリンクにホバーしてから 200ms 後に投機的な読み込みを開始する設定です。このブログは副作用のある URL（ログアウトやカートなど）がないので、記事リンクを対象に指定するだけで済みました。

Content-Security-Policy の `script-src` には既に `'unsafe-inline'` があるので、ヘッダーの変更は不要でした。Google Analytics（gtag.js）も prerender に対応しているので、二重カウントの心配もありません。

## 効果

導入後、Chrome DevTools の Network タブで確認すると、記事リンクにカーソルを合わせた時点で HTML の取得が始まり、クリック時には TTFB が 0ms になっていました。ホバーしている間に裏側で取得が終わっているので、クリックした瞬間にページが出ます。

CSS やスクリプトの読み込み時間自体は変わらないのですが、その開始がネットワーク遅延分だけ前倒しになるので体感のスピードが段違いになります。

## 補足

- Speculation Rules API の基本機能は Chrome / Edge 109 から使えるが、今回使っている `where` や `eagerness` を含む document rules は [Chrome / Edge 121 以降で対応](https://caniuse.com/mdn-html_elements_script_type_speculationrules)。122 で `Speculation-Rules` HTTP ヘッダー対応や `No-Vary-Search` ヒントなど[実用上の周辺機能がまとめて入った](https://developer.chrome.com/blog/speculation-rules-improvements)ため、実運用では 122 以降が推奨されている。Safari は 26.2 でフラグ付きの実験的サポート、Firefox は未対応。非対応ブラウザでは `<script type="speculationrules">` は単に無視されるので、プログレッシブエンハンスメントとして安全に導入できる
- `<link rel="prefetch">` や `<link rel="prerender">` といった従来の手法と比べて、URL パターンでの一括指定や eagerness の制御ができるのが利点です
- 参考: [Speculation Rules APIでウェブサイトを高速化する方法 | ICS MEDIA](https://ics.media/entry/260415/)
