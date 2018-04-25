const mongoose = require('mongoose');
const Config   = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(Config.buildDataStoreURI());
const db = mongoose.connection;

db.once('open', () => console.log("Connection with database succeeded."));
db.on('error', console.error.bind(console, 'connection error'));

exports.mongoose = mongoose;
exports.db = db;
