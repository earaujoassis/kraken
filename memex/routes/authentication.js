'use strict';

const User         = require('../models/user');
const Session      = require('../models/session');
const SpaceService = require('../services/space-service');
const Helpers      = require('./helpers');

module.exports = {
    expose(server) {
        server.route({
            method: 'GET',
            path: '/authorize',
            handler: (request, reply) => {
                return reply.redirect(SpaceService.buildAuthorizeURI(server.info.uri));
            }
        });

        server.route({
            method: 'GET',
            path: '/callback',
            handler: (request, reply) => {
                SpaceService
                    .obtainAccessToken(request.query.code, `${server.info.uri}${request.url.pathname}`)
                    .end(response => {
                        if (response.code !== 200) {
                            return Helpers.panic(reply, 'failed_dependency');
                        }

                        const externalUserId = response.body['user_id'];
                        const accessToken = response.body['access_token'];
                        const refreshToken = response.body['refresh_token'];
                        const expiresIn = response.body['expires_in'];

                        User.findByExternalUserId(externalUserId)
                            .then(result => {
                                if (!result) {
                                    return new User({externalUserId: externalUserId}).save();
                                } else {
                                    return Promise.resolve(result);
                                }
                            })
                            .then(user => {
                                return new Session({
                                    userId: user['_id'],
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    expiresIn: expiresIn
                                }).save();
                            })
                            .then(session => {
                                return reply.redirect('/')
                                    .state('mem.session', {session: session['_id']});
                            })
                            .catch(err => {
                                return Helpers.panic(reply, 'datastore_error');
                            });
                    });
            }
        });

        server.route({
            method: 'GET',
            path: '/signout',
            handler: (request, reply) => {
                return reply.redirect('/').unstate('mem.session');
            }
        });
    }
};
