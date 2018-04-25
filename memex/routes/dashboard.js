'use strict';

module.exports = {
    expose(server) {
        server.route({
            method: 'GET',
            path: '/dashboard',
            handler: (request, reply) => {
                if (!request.plugins.authenticated) {
                    return reply.redirect('/');
                }
                return reply.view('dashboard', {context: 'dashboard'});
            }
        });
    }
}
