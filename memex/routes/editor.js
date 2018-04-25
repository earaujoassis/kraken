'use strict';

module.exports = {
    expose(server) {
        server.route({
            method: 'GET',
            path: '/editor',
            handler: (request, reply) => {
                return reply.view('editor', {context: 'editor'});
            }
        });
    }
}
