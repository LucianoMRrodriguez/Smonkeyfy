const GenericModelDTO = require('./genericModelDTO');

class SpotifyDTO extends GenericModelDTO {
    constructor(){
        super();
        this.data = Object.assign(this.data, {
			name: null,
			id: null,
        })
    }

    hydrate(data){
        super.hydrate(data);
    }
};

module.exports = SpotifyDTO;