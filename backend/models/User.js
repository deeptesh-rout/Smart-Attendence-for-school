
const mongoose = require('mongoose');
const ROLES = require('../utils/roles');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
    provider: { type: String, default: 'local' },
    providerId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);  