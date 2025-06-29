const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    hash: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);
