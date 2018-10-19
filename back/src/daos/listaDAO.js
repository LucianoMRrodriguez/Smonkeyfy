const Lista = require('../models/lista');

class ListaDAO{
    static save(lista){
        return new Promise((resolve, reject) => {
            Lista.create(lista, (err, listaStored) => {
                if (err || !listaStored){
                    reject({message: "no pudo guardarse el lista"});
                } else {
                    lista._id = listaStored._id;
                    resolve(lista);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Lista.findById(id).exec((err, lista) => {
                if (err || !lista){
                    reject ({message: "No pudo econtrarse el lista"});
                } else {
                    resolve(lista);
                }
            })
        })
    }

    static find(filter, pagination){
		if (filter.temas) {
			filter.temas =  {'$elemMatch': {"name" : filter.temas }}
		}
		if (filter.lista) {
			filter['$text'] = { '$search': filter.lista };
			delete filter.lista;
		}
        return new Promise((resolve, reject) => {
            Lista.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, listas) => {
                if (err || !listas){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(listas);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Lista.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, lista){
        let dtoUpdate = {$set:lista}
        return new Promise((resolve, reject) => {
            Lista.findByIdAndUpdate(id, dtoUpdate).exec((err, lista2) => {
                if (err || !lista2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(lista2);
                }
            })
        })
	}
	
	static addSeguidor(id, seguidores){
		return new Promise((resolve, reject) => {
            Lista.findByIdAndUpdate(id, {'$addToSet': seguidores}).exec((err, lista2) => {
                if (err || !lista2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(lista2);
                }
            })
        })
	}

	static removeSeguidor(id, seguidores){
		return new Promise((resolve, reject) => {
            Lista.findByIdAndUpdate(id, {'$pull': seguidores}).exec((err, lista2) => {
                if (err || !lista2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(lista2);
                }
            })
        })
	}

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Lista.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el lista"});
                } else {
                    resolve({_id:id});
                }
            })
        })
    }
}

module.exports = ListaDAO