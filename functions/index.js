(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(/*! firebase-functions */ "firebase-functions");
const fs = __webpack_require__(/*! mz/fs */ "mz/fs");
const path = __webpack_require__(/*! path */ "path");
const express = __webpack_require__(/*! express */ "express");
const helmet = __webpack_require__(/*! helmet */ "helmet");
const hljs = __webpack_require__(/*! highlight.js */ "highlight.js");
const marked = __webpack_require__(/*! marked */ "marked");
const mustache = __webpack_require__(/*! mustache */ "mustache");
const md_render_1 = __webpack_require__(/*! ./scripts/md-render */ "./src/scripts/md-render.ts");
console.log(md_render_1.mdRender('hello, webpack world!'));
const renderer = new marked.Renderer();
const sanitize = (str) => {
    return str.replace(/&<"/g, m => {
        if (m === '&')
            return '&amp;';
        if (m === '<')
            return '&lt;';
        return '&quot;';
    });
};
renderer.image = (src, title, alt) => {
    const exec = /=\s*(\d*)\s*x\s*(\d*)\s*$/.exec(src);
    const regExp = exec && exec[0] ? new RegExp(exec[0], 'g') : '';
    const mySrc = src.replace(regExp, '');
    if (alt === 'embed-youtube') {
        return `<amp-youtube data-videoid="${mySrc}" layout="responsive" width="480" height="270"></amp-youtube>`;
    }
    else if (alt === 'embed-twitter') {
        return `<amp-twitter width="375" height="472" layout="responsive" data-tweetid="${mySrc}"></amp-twitter>`;
    }
    else if (alt === 'embed-gist') {
        return `<amp-gist data-gistid="${mySrc}" layout="fixed-height" height="225"></amp-gist>`;
    }
    else if (alt === 'embed-soundcloud') {
        return `<amp-soundcloud height=657 layout="fixed-height" data-trackid="${mySrc}" data-visual="true"></amp-soundcloud>`;
    }
    else if (alt === 'embed-instagram') {
        return `<amp-instagram data-shortcode="${mySrc}" data-captioned width="400" height="400" layout="responsive"></amp-instagram>`;
    }
    else if (alt.indexOf('video-') === 0) {
        const mySrcRegex = mySrc.match(/(.*)(?:\.([^.]+$))/);
        const srcExec = mySrcRegex !== null ? mySrcRegex[1] : '';
        const fileName = srcExec.replace('/static/videos/', '');
        const webmSrc = `/static/videos/webm/${fileName}.webm`;
        const width = exec && exec[1] ? exec[1] : 0;
        const height = exec && exec[2] ? exec[2] : 0;
        const mp4Src = `<source src="${mySrc}" type="video/mp4" />`;
        return `<div class="amp-video-wrapper">
      <amp-video controls preload="metadata" width="${width}" height="${height}" layout="responsive" poster="/static/videos/poster/${fileName}.${`png` ||
            false}" title="${sanitize(alt)}">
        <source src="${webmSrc}" type="video/webm" />
        ${mp4Src}
        <div fallback>This browser does not support the video element.</div>
      </amp-video>
    </div>`;
    }
    else {
        const mySrcRegex = mySrc.match(/(.*)(?:\.([^.]+$))/);
        const srcExec = mySrcRegex !== null ? mySrcRegex[1] : '';
        const fileName = srcExec.replace('/static/img/posts/', '');
        const webpSrc = `/static/img/posts/webp/${fileName}.webp`;
        const width = exec && exec[1] ? exec[1] : 0;
        const height = exec && exec[2] ? exec[2] : 0;
        // not webp ( jpg, png, gif... )
        const fallback = `<amp-img src="${mySrc}" width="${width}" height="${height}" alt="${sanitize(alt)}" fallback layout="responsive"></amp-img>`;
        return `<amp-img src="${webpSrc}" width="${width}" height="${height}" alt="${sanitize(alt)}" layout="responsive">${fallback}</amp-img>`;
    }
};
renderer.em = (text) => {
    let postDate, postDescription;
    if ((postDate = /^date:(\d{4}-\d{2}-\d{2})/.exec(text)) !== null) {
        const dateStr = postDate[0].replace('date:', '');
        return `<time datetime="${dateStr}">${dateStr}</time>`;
    }
    if ((postDescription = /^desc&gt;\s.*/.exec(text)) !== null) {
        const descStr = postDescription[0].replace('desc&gt; ', '');
        return `<em class="description">${descStr}</em>`;
    }
    return `<em>${text.replace('\\/', '/')}</em>`;
};
const app = express();
const commonTitle = "iiyatsu - hrfmmymt's weblog";
const publicURL = 'https://iiyatsu.hrfmmymt.com/';
const config = {
    mdDir: path.join(__dirname, '../posts/'),
    postsList: JSON.parse(fs.readFileSync(path.join(__dirname, 'posts-list.json'), 'utf8')),
    staticDir: path.join(__dirname, '../static/'),
    rootDir: path.join('./'),
    ogIcon: `${publicURL}static/img/icons/icon.png`
};
const loadPartials = (dir) => {
    const partials = {};
    fs.readdirSync(dir).map(file => {
        const name = path.basename(file, '.mustache');
        partials[name] = fs.readFileSync(path.join(dir, file), {
            encoding: 'utf-8'
        });
    });
    return partials;
};
const currentYear = new Date().getFullYear();
function getUrlPrefix(req) {
    return req.protocol + '://' + req.headers.host;
}
function enableCors(req, res, origin, opt_exposeHeaders) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Expose-Headers', ['AMP-Access-Control-Allow-Source-Origin']
        .concat(opt_exposeHeaders || [])
        .join(', '));
    if (req.query.__amp_source_origin) {
        res.setHeader('AMP-Access-Control-Allow-Source-Origin', req.query.__amp_source_origin);
    }
}
function assertCors(req, res, opt_validMethods, opt_exposeHeaders, opt_ignoreMissingSourceOrigin) {
    // Allow disable CORS check (iframe fixtures have origin 'about:srcdoc').
    // if (req.query.cors === 0) return
    const ORIGIN_REGEX = new RegExp('^http://localhost:9000|' + '^https?://hrfmmymt.github.io');
    const SOURCE_ORIGIN_REGEX = new RegExp('^http://localhost:9000|' + '^https?://hrfmmymt.github.io');
    const validMethods = opt_validMethods || ['GET', 'POST', 'OPTIONS'];
    const invalidMethod = req.method + ' method is not allowed. Use POST.';
    const invalidOrigin = 'Origin header is invalid.';
    const invalidSourceOrigin = '__amp_source_origin parameter is invalid.';
    const unauthorized = 'Unauthorized Request';
    let origin;
    if (validMethods.indexOf(req.method) === -1) {
        res.statusCode = 405;
        res.end(JSON.stringify({ message: invalidMethod }));
        throw invalidMethod;
    }
    if (req.headers.origin) {
        origin = req.headers.origin;
        if (!ORIGIN_REGEX.test(origin)) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: invalidOrigin }));
            throw invalidOrigin;
        }
        if (!opt_ignoreMissingSourceOrigin &&
            !SOURCE_ORIGIN_REGEX.test(req.query.__amp_source_origin)) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: invalidSourceOrigin }));
            throw invalidSourceOrigin;
        }
    }
    else if (req.headers['amp-same-origin']) {
        origin = getUrlPrefix(req);
    }
    else {
        res.statusCode = 401;
        res.end(JSON.stringify({ message: unauthorized }));
        throw unauthorized;
    }
    enableCors(req, res, origin, opt_exposeHeaders);
}
app.engine('mustache', (filePath, options, callback) => {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err)
            return callback(new Error('mustache render error!'), '');
        const rendered = mustache.render(content, options, loadPartials('./partials'));
        return callback(null, rendered);
    });
});
app.set('view engine', 'mustache');
app.set('views', './');
app.use(express.static(config.staticDir));
app.use(helmet());
const getPostInfo = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(config.mdDir + fileName, 'utf-8', (err, md) => {
            if (err)
                return reject(err);
            // # POST TITLE
            const h1Regex = md.match(/^#\s(.)+\n/);
            const postTitle = h1Regex !== null ? h1Regex[0].match(/[^#\n]+/) : [];
            // *desc> POST DESCRIPTION*
            const descRegex = md.match(/\n\*desc>\s(.)+\n/);
            const mdDesc = descRegex !== null ? descRegex[0] : '';
            const postDescription = /\n\*desc>\s((?:(?!\*\n)[^\s　])+)/g.exec(mdDesc);
            // *date:yyyy-mm-dd*
            const postDate = /\*date\:((?:(?!\*)[^\s　])+)/g.exec(md);
            marked.setOptions({
                gfm: true,
                highlight(code) {
                    return hljs.highlightAuto(code).value;
                }
            });
            resolve({
                title: postTitle !== null && postTitle[0].trim(),
                description: postDescription !== null && postDescription[1],
                date: postDate !== null && postDate[1],
                url: fileName.replace(/.md/g, ''),
                html: marked(md, { renderer: renderer })
            });
        });
    });
};
app.get('/', (req, res) => {
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
            list: config.postsList
        },
        footer: {
            year: currentYear
        }
    });
});
app.get('/posts/:post', (req, res) => {
    const file = path.format({
        name: req.params.post,
        ext: '.md'
    });
    try {
        fs.statSync(config.mdDir + file);
    }
    catch (err) {
        if (err.code === 'ENOENT')
            res.status(400).render('404.mustache');
    }
    getPostInfo(file).then((postInfo) => {
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
        });
    });
});
app.get('/api', (req, res) => {
    assertCors(req, res, ['GET'], undefined, true);
    res.json(config.postsList);
});
app.use((req, res) => {
    res.status(400).render('404.mustache');
});
app.use((err, req, res) => {
    res.status(500);
    res.end('my 500 error! : ' + err);
});
exports.app = functions.https.onRequest(app);

/* WEBPACK VAR INJECTION */}.call(this, "src"))

/***/ }),

/***/ "./src/scripts/md-render.ts":
/*!**********************************!*\
  !*** ./src/scripts/md-render.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function mdRender(str) {
    return console.log(str);
}
exports.mdRender = mdRender;


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "highlight.js":
/*!*******************************!*\
  !*** external "highlight.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("highlight.js");

/***/ }),

/***/ "marked":
/*!*************************!*\
  !*** external "marked" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),

/***/ "mustache":
/*!***************************!*\
  !*** external "mustache" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mustache");

/***/ }),

/***/ "mz/fs":
/*!************************!*\
  !*** external "mz/fs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mz/fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map