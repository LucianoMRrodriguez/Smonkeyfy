const GenericController = require('./genericController');
const ListaService = require('../services/listaService');
const ListaDTO = require('../dtos/listaDTO');
const ListaFilter = require('../filters/listaFilter');
const listaSocket = require('../sockets/listaWebSocket');

class ListaController extends GenericController{

    static getListaById(req, res, next){
        const id = req.params.id;
        ListaController.resolve(next, ListaService.get(id), lista => {
            res.status(200).send({
                data: lista
            })
        })
    }

    static getListas(req, res, next) {
        const filter = new ListaFilter();
        filter.fillData(req.query);
        ListaController.resolve(next,
                Promise.all([
                    ListaService.find(filter), 
                    ListaService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: results[0],
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            });
        })
    }
    
    static createLista(req, res, next) {
        let listaDTO = new ListaDTO()
        listaDTO.hydrate(req.body);
        ListaController.resolve(next, ListaService.save(listaDTO), lista => {
			if(!lista.seguidores)
				lista.seguidores = [];
			listaSocket.newLista(lista);
			res.status(201).send({
				data: lista,
			});
		});
    }
    
    static updateLista(req, res, next) {
        let id = req.params.id;
        let listaDTO = new ListaDTO()
        listaDTO.hydrate(req.body);
        ListaController.resolve(next, ListaService.update(id, listaDTO), lista => {
            listaSocket.updateLista(lista);
            res.status(200).send({
                data: lista,
            })
        })
    }
    
    static deleteLista(req, res, next) {
        let id = req.params.id;
        ListaController.resolve(next, ListaService.delete(id), message => {
			listaSocket.removeLista(message)
			res.status(200).send({
				data: message
			})
		})
	}
	
	static followLista(req, res, next) {
		const id = req.params.id;
		const user = req.body.usuario;
        ListaController.resolve(next, ListaService.follow(id, user), lista => {
            listaSocket.updateLista(lista);
            res.status(200).send({
                data: lista
            })
        })
	}
	
	static unfollowLista(req, res, next) {
		const id = req.params.id;
		const user = req.body.usuario;
        ListaController.resolve(next, ListaService.unfollow(id, user), lista => {
            listaSocket.updateLista(lista);
            res.status(200).send({
                data: lista
            })
        })
    }
}

module.exports = ListaController