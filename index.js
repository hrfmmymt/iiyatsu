"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var server = require('./src/app')({
    logger: true,
    ignoreTrailingSlash: true,
});
server.listen(constants_1.CONFIG.DEV_PORT, function (err, address) {
    if (err)
        throw err;
    console.log("server listening on ".concat(address));
});
