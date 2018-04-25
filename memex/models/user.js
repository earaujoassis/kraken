const mongoose = require('../utils/datastore').mongoose;
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    externalUserId: {type: String, index: true},
    createdAt: {type: Date, default: Date.now},
});

userSchema.statics.findByExternalUserId = function(externalUserId, cb) {
    return this.findOne({externalUserId: externalUserId}, cb);
};

userSchema.statics.findById = function(id, cb) {
    return this.findOne({_id: id}, cb);
};

module.exports = mongoose.model('User', userSchema);
