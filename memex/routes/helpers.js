module.exports = {
    panic(reply, reason) {
        return reply.redirect(`/error?error=${reason}`);
    },

    viewGlobalContext(request) {
        return {
            authenticated: request.plugins.authenticated
        };
    }
}
