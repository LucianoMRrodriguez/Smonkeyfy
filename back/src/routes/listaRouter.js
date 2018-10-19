const express = require('express')
const ListaController = require('../controllers/listaController');
const AuthenticationMiddleware = require('../middlewares/authenticationMiddleware');

const api = express.Router();

api.get('/:id', ListaController.getListaById);
api.get('', ListaController.getListas);
api.post('', AuthenticationMiddleware.isLogged, ListaController.createLista);
api.put('/follow/:id', AuthenticationMiddleware.isLogged, ListaController.followLista);
api.put('/unfollow/:id', AuthenticationMiddleware.isLogged, ListaController.unfollowLista);
api.put('/:id', AuthenticationMiddleware.isLogged, ListaController.updateLista);
api.delete('/:id', AuthenticationMiddleware.isLogged, ListaController.deleteLista);

module.exports = api;