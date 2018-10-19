const Lista = require('../models/lista');
const ListaDAO = require('../daos/listaDAO');
const ListaAssembler = require('../assemblers/listaAssembler');

class ListaService{
    static get(id) {
        return new Promise((resolve, reject) => {
            ListaDAO.fetch(id)
                .then(lista => resolve(lista))
                .catch(err => reject(err))
        })
    }

    static find(filter) {
        return new Promise((resolve, reject) => {
            ListaDAO.find(filter.filterData(), filter.pagination)
                .then(listas => resolve(listas))
                .catch(err => reject(err))
        })
    }

    static count(filter) {
        return new Promise((resolve, reject) => {
            ListaDAO.count(filter.filterData())
                .then(total => resolve(total))
                .catch(err => reject(err))
        })
    }

    static save(listaDTO) {
        return new Promise((resolve, reject) => {
            ListaDAO.save(listaDTO.getData())
                .then(lista => resolve(lista))
                .catch(err => reject(err))            
        })
    }

    static update(id, listaDTO) {
        return new Promise((resolve, reject) => {
            ListaDAO.update(id, listaDTO.getData())
                .then(lista => {
                    resolve(this.get(lista._id))  
                })
                .catch(err => reject(err))
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            ListaDAO.delete(id)
                .then(deleted => resolve(deleted))
                .catch(err => reject(err))
        });
	}
	
	
	static follow(id, user) {
        return new Promise((resolve, reject) => {
            ListaDAO.addSeguidor(id, {seguidores: user})
                .then(lista => {
                    resolve(this.get(lista._id))  
                })
                .catch(err => reject(err))
        });
	}
	
	static unfollow(id, user) {
        return new Promise((resolve, reject) => {
            ListaDAO.removeSeguidor(id, {seguidores: user})
                .then(lista => {
                    resolve(this.get(lista._id))  
                })
                .catch(err => reject(err))
        });
    }
}

module.exports = ListaService