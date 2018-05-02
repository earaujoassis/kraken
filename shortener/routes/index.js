module.exports = {
  over(server) {
    server.route({
      method: 'GET', path: '/',
      handler: (request, reply) => {
        return reply.view('index');
      }
    });
  }
};
