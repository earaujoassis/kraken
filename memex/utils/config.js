'use strict';

module.exports = {
    environment() {
        return process.env.NODE_ENV || 'development';
    },

    isProduction() {
        return process.env.NODE_ENV === 'production';
    },

    get(key) {
        return process.env[key];
    },

    buildDataStoreURI() {
        return `${process.env.MEMEX_MONGO_URL}${process.env.MEMEX_MONGO_NAME}_${process.env.NODE_ENV || 'development'}`;
    }
}
