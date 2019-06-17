# iiyatsu

[![CircleCI](https://circleci.com/gh/hrfmmymt/iiyatsu.svg?style=svg)](https://circleci.com/gh/hrfmmymt/iiyatsu)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## what's iiyatsu?
a hrfmmymt's weblog.

## usage
at first, install firebase-tools and login
```
npm i -g firebase-tools
```

on `./` ( root dir ).

```
yarn serve  // run local
yarn eslint // run ESLint
yarn deploy // build and deploy ( Firebase )
```

on `./functions/`

```
yarn tsc    // run TypeScript
yarn css    // run PostCSS
yarn watch  // watch TS and PostCSS
yarn sw     // run Workbox ( ServiceWorkers )
```

## how to add post
1. make branch from master
```
git fetch master
git pull master
git checkout -b post/foo
```
2. make markdown file `./functions/posts/foo.md`
3. initialize for server process ( markdown converting and route settings )
on `./` ( root dir ).
```
yarn get-postslist
```
4. writing...
5. [optional] optimize images of post
on `./` ( root dir ).
```
yarn img
```
6. serve and test post locally
```
yarn serve
```
7. update `./functions/public/sw.js` ( for PWA )
on `./functions/`
```
yarn sw
```
8. git commit and push `post/foo` branch
9. pull request from `post/foo` to master branch
10. build and deploy automaticaly by CircleCI after merge into master branch
11. see https://iiyatsu.hrfmmymt.com/posts/foo

## licence
MIT
