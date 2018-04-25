const mongoose = require('../utils/datastore').mongoose;
const Schema   = mongoose.Schema;

const sessionSchema = new Schema({
    userId: Schema.ObjectId,
    accessToken: {type: String, index: true},
    refreshToken: {type: String, index: true},
    expiresIn: Number,
    moment: {type: Number, default: Date.now},
    createdAt: {type: Date, default: Date.now},
});

sessionSchema.statics.findById = function(id, cb) {
    return this.findOne({_id: id}, cb);
};

sessionSchema.methods.withinExpirationWindow = function() {
    /*
     * The Space server returns `expires_in` in seconds. `Date.now()`
     * returns a Number representing milliseconds.
     */
    const now = Date.now();
    const expiration = this.expiresIn * 1000;
    return this.expiresIn === 0 || now <= (this.moment + expiration);
};

module.exports = mongoose.model('Session', sessionSchema);
