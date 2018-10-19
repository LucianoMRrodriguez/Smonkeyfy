const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListaSchema = Schema({
    nombre: {
		type: String,
		required: true,
	},
	temas: {
		type: Array,
		required: true,
	},
	seguidores: {
		type: Array,
		default: [],
	},
	usuario: String
});


ListaSchema.index({nombre: "text", usuario: "text", "temas.name": "text"}, {weights: {nombre: 10, usuario: 5}});

module.exports = mongoose.model('Lista', ListaSchema);