const express = require('express')
const GoogleController = require('../controllers/googleController');

const api = express.Router();

api.get('', GoogleController.getGoogleUrl);
api.post('', GoogleController.getAccessToken);

module.exports = api;