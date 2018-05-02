module.exports = {
  environment() {
    return process.env.NODE_ENV || 'development';
  },

  isProduction() {
    return process.env.NODE_ENV === 'production';
  },

  get(key) {
    return process.env[key];
  }
};
