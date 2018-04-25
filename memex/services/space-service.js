'use strict'

const unirest = require('unirest');
const Config  = require('../utils/config');

const spaceURI          = Config.get('MEMEX_SPACE_URL');
const spaceClientScope  = Config.get('MEMEX_SPACE_SCOPE');
const spaceClientKey    = Config.get('MEMEX_SPACE_KEY');
const spaceClientSecret = Config.get('MEMEX_SPACE_SECRET');

const authorizationKeySecret = new Buffer(`${spaceClientKey}:${spaceClientSecret}`).toString('base64');

module.exports = {
    buildAuthorizeURI(serverURI) {
        return spaceURI + "/authorize?" +
            "client_id=" + spaceClientKey + "&" +
            "redirect_uri=" + encodeURIComponent(serverURI + "/callback") + "&" +
            "response_type=code&" +
            "scope=" + spaceClientScope + "&" +
            "state=";
    },

    errorURI() {
        return spaceURI + "/error" + "client_id=" + spaceClientKey + "error=client_misconfigured";
    },

    obtainAccessToken(grantCode, callbackURI) {
        console.log('Remote request: request access token from grant code');
        return unirest.post(`${spaceURI}/token`)
            .headers({
                'Authorization': `Basic ${authorizationKeySecret}`,
                'Accept': 'application/vnd.space.v1+json',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .send('grant_type=authorization_code')
            .send(`code=${grantCode}`)
            .send(`redirect_uri=${callbackURI}`);
    },

    refreshAccessToken(refreshToken) {
        console.log('Remote request: request access token from refresh token');
        return unirest.post(`${spaceURI}/token`)
            .headers({
                'Authorization': `Basic ${authorizationKeySecret}`,
                'Accept': 'application/vnd.space.v1+json',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .send('grant_type=refresh_token')
            .send(`refresh_token=${refreshToken}`)
            .send(`scope=${spaceClientScope}`);
    },

    obtainTokenState(token) {
        console.log('Remote request: request token state from access token');
        return unirest.post(`${spaceURI}/api/sessions/introspect`)
            .headers({
                'Authorization': `Basic ${authorizationKeySecret}`,
                'Accept': 'application/vnd.space.v1+json',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .send(`access_token=${token}`);
    }
}
