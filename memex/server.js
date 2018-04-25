'use strict';

const Path        = require('path');
const Hapi        = require('hapi');
const Hoek        = require('hoek');

const server      = new Hapi.Server({ debug: { request: ['error'] } });

const Routes      = require('./routes');
const Config      = require('./utils/config');

if (!Config.isProduction()) {
    server.register(require('inert'), (err) => {
        Hoek.assert(!err, err);

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: 'public'
                }
            }
        });
    });

    server.on('response', function (request) {
        console.log(request.info.remoteAddress + ' | ' +
            request.response.statusCode + ' | ' +
            request.method.toUpperCase() + ' ' + request.url.path);
    });
}

server.register(require('vision'), (err) => {
    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        layout: true,
        layoutPath: Path.join(__dirname, 'templates/layout'),
        isCached: Config.isProduction(),
        context: require('./routes/helpers').viewGlobalContext
    });
});

server.connection({
    host: 'localhost',
    port: 8000
});

server.state('mem.session', {
    isSecure: Config.isProduction(),
    isHttpOnly: true,
    isSameSite: 'Strict',
    ttl: null,
    encoding: 'iron',
    password: Config.get('MEMEX_SESSION_SECRET'),
    clearInvalid: false,
    strictHeader: false
});

Routes.over(server);

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
