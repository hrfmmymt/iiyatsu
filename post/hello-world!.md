# hello, world!

*date:2021-08-29*

*desc> hello, world!*

aaaaaaaaaaa

## img
![eye-catch](https://lh3.googleusercontent.com/pw/AM-JKLVXUJtGnnBBN5SaVbSpSAynOiedhj-Jmj5WikYx2HXdnkFW8sRzZzsVoa-UGd5kDTAFQEkUGssvtbQLxqZSkmTeq6Cy_vPMhAsdi_L8NaWItXn3E0X98VtzrHFHS-NGijH4mxkitmbWn63ESli4Rvlndg=w780-h1386)

1. 画像を所定ディレクトリに配置
2. 配置した画像を最適化する
3. 最適化した画像を Google フォトに上げる
4. Google フォトからパーマリンクを取得
5. markdown 記述↑↑

## video
```html
<div class="video-wrapper">
  <video controls
    preload="metadata"
    width="640"
    height="360"
    poster="https://user-images.githubusercontent.com/4241290/131988834-79b76fd9-345e-4a58-84cd-1ab4809df1f6.png"
    title="video-test">
    <source src="https://user-images.githubusercontent.com/4241290/131988806-9bf0744d-7069-4c37-a70b-466460caa26f.mp4"
      type="video/mp4" />
    <div fallback>
      <p>This browser does not support the video element.</p>
    </div>
  </video>
</div>
```

<div class="video-wrapper">
  <video controls
    preload="metadata"
    width="640"
    height="360"
    layout="responsive"
    poster="https://user-images.githubusercontent.com/4241290/131988834-79b76fd9-345e-4a58-84cd-1ab4809df1f6.png"
    title="video-test">
    <source src="https://user-images.githubusercontent.com/4241290/131988806-9bf0744d-7069-4c37-a70b-466460caa26f.mp4"
      type="video/mp4" />
    <div fallback>
      This browser does not support the video element.
    </div>
  </video>
</div>

```html
<iframe src="https://open.spotify.com/embed/user/hrfmmymt/playlist/4rmnvhEv080DI0AX0XqfqD"
  sandbox="allow-scripts allow-same-origin"
  width="300"
  height="380"
  frameborder="0"
  allow="encrypted-media"></iframe>
```

<iframe src="https://open.spotify.com/embed/user/hrfmmymt/playlist/4rmnvhEv080DI0AX0XqfqD"
  sandbox="allow-scripts allow-same-origin"
  width="300"
  height="380"
  frameborder="0"
  allow="encrypted-media"></iframe>