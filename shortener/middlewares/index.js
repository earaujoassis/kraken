module.exports = {
  processSession(request, reply) {
    if (request.state['stonewall.session'] && request.state['stonewall.session'].user_id) {
      const User = require('../models').user;

      User
        .findOne({ where: { uid: request.state['stonewall.session'].user_id } })
        .then(user => {
          if (user && user.id) {
            request.isAuthenticated = true;
            request.user = user;
          } else {
            request.isAuthenticated = false;
          }
          return reply.continue();
        })
        .catch(err => {
          console.error(err);
          return reply.continue();
        });
    } else {
      request.isAuthenticated = false;
      return reply.continue();
    }
  }
};
