'use strict'

const fs = require('mz/fs')
const path = require('path')

const express = require('express')
const helmet = require('helmet')

const hljs = require('highlight.js')
const marked = require('marked')
const mustache = require('mustache')

const app = express()
const config = {
  mdDir: path.join(__dirname, '/posts/'),
  staticDir: path.join(__dirname, '/static/'),
  rootDir: path.join(__dirname)
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

const commonTitle = "iiyatsu - hrfmmymt's weblog"

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
app.use(express.static(config.rootDir))
app.use(helmet())

function getPostInfo(mdName, withHtml) {
  return new Promise((resolve, reject) => {
    fs.readFile(config.mdDir + mdName, 'utf-8', (err, md) => {
      if (err) return reject(err)

      const postTitle = md.match(/^#\s(.)+\n/)[0].match(/[^#\n\s]+/)
      const postDescription = md.match(/\n>(.)+\n/)[0].match(/[^>\n\s]+/)
      const postDate = md.match(/\d{4}-\d{2}-\d{2}/)

      marked.setOptions({
        gfm: true,
        highlight(code) {
          return hljs.highlightAuto(code).value
        }
      })

      resolve({
        title: postTitle[0],
        description: postDescription[0],
        date: postDate[0],
        url: mdName.replace(/.md/g, ''),
        html: withHtml ? marked(md) : null
      })
    })
  })
}

app.get('/', (req, res) => {
  async function sortedPostsInfo() {
    const mdFiles = await fs.readdir(config.mdDir)
    const postInfo = mdFiles.map(mdFile => getPostInfo(mdFile, false))
    const postsInfo = await Promise.all(postInfo)

    return postsInfo.sort((a, b) => {
      if (a.date > b.date) return -1
      if (a.date < b.date) return 1
      if (a.title > b.title) return -1
      if (a.title < b.title) return 1
      return 0
    })
  }

  sortedPostsInfo().then(sortedPostsInfo => {
    res.render('index', {
      head: {
        title: commonTitle,
        url: '',
        description: 'the beautiful something',
        fbimg: '',
        twimg: '',
        twaccount: '',
        icon: ''
      },
      index: {
        list: sortedPostsInfo
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

  getPostInfo(file, true).then(postInfo => {
    res.render('index', {
      head: {
        title: `${postInfo.title} | ${commonTitle}`,
        url: postInfo.url,
        description: postInfo.description,
        fbimg: '',
        twimg: '',
        twaccount: '',
        icon: ''
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

app.use((req, res) => {
  res.status(400).render('404.mustache')
})

app.use((err, req, res) => {
  res.status(500)
  res.end('my 500 error! : ' + err)
})

if (!module.parent) {
  app.listen(3000)
  console.log('Express started on http://localhost:3000')
}
