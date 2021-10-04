"use strict";
exports.__esModule = true;
var server = require('./src/app')({
    logger: true,
    ignoreTrailingSlash: true
});

server.listen(4567, function (err, address) {
    if (err)
        throw err;
    console.log("server listening on " + address);
});
