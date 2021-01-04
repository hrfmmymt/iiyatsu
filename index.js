"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server = require('./src/app')({
    logger: true,
    ignoreTrailingSlash: true,
});
server.listen(3000, (err, address) => {
    if (err)
        throw err;
    console.log(`server listening on ${address}`);
});
