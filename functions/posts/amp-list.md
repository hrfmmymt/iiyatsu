# amp-list 手習い

*date:2018-08-10*

*desc> これのやつ*

1. このサイトの記事の API エンドポイントを作る
1. [別の AMP サイト](https://hrfmmymt.github.io/)で `amp-list` コンポーネントを使ってこのサイトの記事一覧をリスト表示する

というのをやりました。

`amp-list` の XMLHttpRequest で取得するデータは Cross-Origin Resource Sharing 対応しなければならないので、しました ( バックエンドは Cloud Functions for Firebase ) 。これ ([amphtml/amp-cors-requests.md at master · ampproject/amphtml](https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md)) を参考にしました。

