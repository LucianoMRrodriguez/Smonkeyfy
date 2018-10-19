const GenericModelDTO = require('./genericModelDTO');

class ListaDTO extends GenericModelDTO {
    constructor(){
        super();
        this.data = Object.assign(this.data, {
            nombre: null,
			temas: null,
			seguidores: null,
			usuario: null
        })
    }

    hydrate(data){
        super.hydrate(data);
    }
};

module.exports = ListaDTO;