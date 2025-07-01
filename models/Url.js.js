const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlOriginal: { type: String, required: true, unique: true },
    codigoCurto: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);
