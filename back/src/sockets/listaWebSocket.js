const server = require('../app');
const io = require('socket.io');

let listSocket;

const newLista = (lista) => {
	listSocket.emit('new-list', lista);
}

const updateLista = (lista) => {
	listSocket.emit('update-list', {id: lista._id, lista});
}


const removeLista = (lista) => {
	listSocket.emit('remove-list', {id: lista._id, lista});
}


const config = (server) => {
	listSocket = io(server).of('/wsLista/');
	// listSocket.on('connection', (socket) => {});
};

module.exports = {
	config,
	newLista,
	updateLista,
	removeLista,
};