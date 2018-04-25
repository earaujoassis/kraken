'use strict';

const Session        = require('../models/session');
const SpaceService   = require('../services/space-service');

const Authentication = require('./authentication');
const Dashboard      = require('./dashboard');
const Editor         = require('./editor');

module.exports = {
    over(server) {
        server.ext('onPreHandler', (request, reply) => {
            if (request.state['mem.session'] && request.state['mem.session'].session) {
                Session.findById(request.state['mem.session'].session)
                    .then(session => {
                        if (session && session.withinExpirationWindow()) {
                            request.plugins.authenticated = true;
                            request.plugins.session = session;

                            return reply.continue();
                        } else if (session) {
                            SpaceService.refreshAccessToken(session.refreshToken)
                                .end(response => {
                                    if (response.code !== 200) {
                                        Session.findOne({_id: session.id}).remove().exec();
                                        reply.unstate('mem.session');
                                        return reply.continue();
                                    }

                                    var upsertData = session.toObject();
                                    delete upsertData._id;
                                    upsertData.accessToken = response.body['access_token'];
                                    upsertData.refreshToken = response.body['refresh_token'];
                                    upsertData.expiresIn = response.body['expires_in'];

                                    Session.update({_id: session.id}, upsertData, {upsert: true})
                                        .then(response => {
                                            return Session.findById(request.state['mem.session'].session);
                                        })
                                        .then(session => {
                                            request.plugins.authenticated = true;
                                            request.plugins.session = session;

                                            return reply.continue();
                                        })
                                        .catch(err => {
                                            reply.unstate('mem.session');
                                            return reply.continue();
                                        });
                                });
                        } else {
                            return reply.continue();
                        }
                    })
                    .catch(err => {
                        return reply.continue();
                    });
            } else {
                return reply.continue();
            }
        });

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, reply) => {
                if (request.plugins.authenticated) {
                    return reply.redirect('/dashboard');
                }
                const backgrounds = ['field', 'mountains'];
                const backgroundClass = backgrounds[Math.random()*backgrounds.length>>0];
                return reply.view('index', {context: 'index', background: backgroundClass});
            }
        });

        Authentication.expose(server);
        Dashboard.expose(server);
        Editor.expose(server);
    }
};
