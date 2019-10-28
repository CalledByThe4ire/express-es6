#!/usr/bin/env node

import 'babel-polyfill';
import app from '../app';
import debugLib from 'debug';
import http from 'http';
import portfinder from 'portfinder';

const debug = debugLib('express-es6-sample:server');

let port = 3000;
(async () => {
    if (process.env.NODE_ENV === 'production') {
        port = process.env.PORT;
    }
    try {
        port = await portfinder.getPortPromise();
    } catch (e) {
        throw e;
    }

    const server = http.createServer(app);

    const onError = error => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
    const onListening = () => {
        const addr = server.address();
        const bind =
            typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log(`Listening on ${bind}`);
        debug('Listening on ' + bind);
    };

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
})();
