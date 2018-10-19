const express = require('express')
const SpotifyController = require('../controllers/spotifyController');

const api = express.Router();

api.get('', SpotifyController.getSongs);

module.exports = api;