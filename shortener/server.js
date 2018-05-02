require('dotenv').config();
const Config = require('./utils/config');
if (Config.isProduction()) {
  require('newrelic');
}

const Path        = require('path');
const Hapi        = require('hapi');
const Hoek        = require('hoek');

const server      = new Hapi.Server({ debug: { request: ['error'] } });

const Middlewares = require('./middlewares');
const Routes      = require('./routes');

if (!Config.isProduction()) {
  server.register(require('inert'), err => {
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
}

server.register(require('vision'), err => {
  Hoek.assert(!err, err);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    layout: true,
    layoutPath: Path.join(__dirname, 'templates/layout'),
    partialsPath: 'templates/partials',
    isCached: Config.isProduction(),
    context: request => {
      return {
        user: request.user || null,
        isAuthenticated: request.isAuthenticated
      };
    }
  });
});

server.connection({
  host: '0.0.0.0',
  port: Config.get('PORT') || 8080
});

server.state('shortener.session', {
  isSecure: Config.isProduction(),
  isHttpOnly: true,
  isSameSite: 'Strict',
  ttl: null,
  encoding: 'iron',
  password: Config.get('SHORTENER_SESSION_SECRET'),
  clearInvalid: false,
  strictHeader: false
});

server.ext('onPreHandler', Middlewares.processSession);

server.on('response', request => {
  console.log(request.info.remoteAddress + ' | ' +
    request.response.statusCode + ' | ' +
    request.method.toUpperCase() + ' ' + request.url.path);
});

Routes.over(server);

server.start(err => {
  if (err) {
    throw err;
  }

  console.log('[' + Config.environment() + '] Server running at:', server.info.uri);
});
