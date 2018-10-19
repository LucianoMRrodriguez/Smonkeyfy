const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpotifySchema = Schema({
    name: String
});

module.exports = mongoose.model('Spotify', SpotifySchema);