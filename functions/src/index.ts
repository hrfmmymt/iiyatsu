'use strict'
const functions = require('firebase-functions')
const fs = require('mz/fs')
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const hljs = require('highlight.js')
const marked = require('marked')
const renderer = new marked.Renderer()

const sanitize = str => {
  return str.replace(/&<"/g, m => {
    if (m === '&') return '&amp;'
    if (m === '<') return '&lt;'
    return '&quot;'
  })
}

renderer.image = (src, title, alt) => {
  const exec = /=\s*(\d*)\s*x\s*(\d*)\s*$/.exec(src)
  let regExp
  if (exec && exec[0]) regExp = new RegExp(exec[0], 'g')
  const mySrc = src.replace(regExp, '')

  if (alt === 'embed-youtube')
    return `<amp-youtube data-videoid="${mySrc}" layout="responsive" width="480" height="270"></amp-youtube>`
  if (alt === 'embed-twitter')
    return `<amp-twitter width="375" height="472" layout="responsive" data-tweetid="${mySrc}"></amp-twitter>`
  if (alt === 'embed-gist')
    return `<amp-gist data-gistid="${mySrc}" layout="fixed-height" height="225"></amp-gist>`
  if (alt === 'embed-soundcloud')
    return `<amp-soundcloud height=657 layout="fixed-height" data-trackid="${mySrc}" data-visual="true"></amp-soundcloud>`
  if (alt === 'embed-instagram')
    return `<amp-instagram data-shortcode="${mySrc}" data-captioned width="400" height="400" layout="responsive"></amp-instagram>`

  let res = `<amp-img src="${mySrc}" alt="${sanitize(alt)}`
  if (exec && exec[1]) res += `" width="${exec[1]}`
  if (exec && exec[2]) res += `" height="${exec[2]}`
  return `${res}" layout="responsive">`
}

renderer.em = text => {
  let postDate, postDescription
  if ((postDate = /^date:(\d{4}-\d{2}-\d{2})/.exec(text)) !== null) {
    const dateStr = postDate[0].replace('date:', '')
    return `<time datetime="${dateStr}">${dateStr}</time>`
  }
  if ((postDescription = /^desc&gt;\s.*/.exec(text)) !== null) {
    const descStr = postDescription[0].replace('desc&gt; ', '')
    return `<em class="description">${descStr}</em>`
  }
  return `<em>${text.replace('\\/', '/')}</em>`
}

const mustache = require('mustache')

const app = express()
const commonTitle = "iiyatsu - hrfmmymt's weblog"
const publicURL = 'https://iiyatsu.hrfmmymt.com/'
const config = {
  mdDir: path.join(__dirname, 'posts/'),
  staticDir: path.join(__dirname, 'static/'),
  rootDir: path.join(__dirname),
  ogIcon: `${publicURL}static/img/icons/icon.png`
}

const loadPartials = dir => {
  const partials = {}
  fs.readdirSync(dir).map(file => {
    const name = path.basename(file, '.mustache')
    partials[name] = fs.readFileSync(path.join(dir, file), {
      encoding: 'utf-8'
    })
  })
  return partials
}

const currentYear = new Date().getFullYear()

app.engine('mustache', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) return callback(new Error(err))

    const rendered = mustache.render(
      content,
      options,
      loadPartials('./partials')
    )
    return callback(null, rendered)
  })
})

app.set('view engine', 'mustache')
app.set('views', __dirname)

app.use(express.static(config.staticDir))
// app.use(express.static(config.rootDir))
app.use(helmet())

const getPostInfo = (fileName, parseMd) => {
  return new Promise((resolve, reject) => {
    fs.readFile(config.mdDir + fileName, 'utf-8', (err, md) => {
      if (err) return reject(err)

      const postTitle = md.match(/^#\s(.)+\n/)[0].match(/[^#\n]+/)
      const postDescription = /\n\*desc>\s((?:(?!\*\n)[^\s　])+)/g.exec(
        md.match(/\n\*desc>\s(.)+\n/)[0]
      )
      const postDate = /\*date\:((?:(?!\*)[^\s　])+)/g.exec(md)

      marked.setOptions({
        gfm: true,
        highlight(code) {
          return hljs.highlightAuto(code).value
        }
      })

      resolve({
        title: postTitle[0],
        description: postDescription[1],
        date: postDate[1],
        url: fileName.replace(/.md/g, ''),
        html: parseMd ? marked(md, { renderer: renderer }) : null
      })
    })
  })
}

async function sortPostsList(parseMd) {
  const files = await fs.readdir(config.mdDir)
  const posts = files.map(file => getPostInfo(file, parseMd))
  const postsList = await Promise.all(posts)

  return postsList.sort((a: any, b: any) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    if (a.title > b.title) return -1
    if (a.title < b.title) return 1
    return 0
  })
}

app.get('/', (req, res) => {
  sortPostsList(false).then(sortPostsList => {
    res.render('index', {
      head: {
        title: commonTitle,
        url: publicURL,
        description: "hrfmmymt's weblog",
        ogType: 'website',
        facebookImg: config.ogIcon,
        twitterImg: config.ogIcon,
        twitterAccount: '@hrfmmymt',
        year: currentYear
      },
      profile: true,
      index: {
        list: sortPostsList
      },
      footer: {
        year: currentYear
      }
    })
  })
})

app.get('/posts/:post', (req, res) => {
  const file = path.format({
    name: req.params.post,
    ext: '.md'
  })

  try {
    fs.statSync(config.mdDir + file)
  } catch (err) {
    if (err.code === 'ENOENT') res.status(400).render('404.mustache')
  }

  getPostInfo(file, true).then((postInfo: any) => {
    res.render('index', {
      head: {
        title: `${postInfo.title} | ${commonTitle}`,
        url: `${publicURL}posts/${postInfo.url}`,
        description: postInfo.description,
        ogType: 'article',
        facebookImg: config.ogIcon,
        twitterImg: config.ogIcon,
        twitterAccount: '@hrfmmymt',
        year: currentYear
      },
      post: {
        title: postInfo.title,
        url: postInfo.url,
        contents: postInfo.html
      },
      footer: {
        year: currentYear
      }
    })
  })
})

app.get('/api', (req, res) => {
  sortPostsList(true).then(sortPostsList => {
    res.json(sortPostsList)
  })
})

app.use((req, res) => {
  res.status(400).render('404.mustache')
})

app.use((err, req, res) => {
  res.status(500)
  res.end('my 500 error! : ' + err)
})

exports.app = functions.https.onRequest(app)
