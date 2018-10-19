const GenericFilter = require('./genericFilter');
class ListaFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            nombre: null,
			temas: null,
			seguidores: null,
			usuario: null,
			lista: null,
        })
    }

};

module.exports = ListaFilter;