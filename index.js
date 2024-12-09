"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
// import fastifyView from '@fastify/view';  // 変更
var server = require('./src/app')({
    logger: true,
    ignoreTrailingSlash: true,
});
server.listen({
    port: constants_1.CONFIG.DEV_PORT,
    host: '0.0.0.0'
}, function (err, address) {
    if (err)
        throw err;
    console.log("server listening on ".concat(address));
});
