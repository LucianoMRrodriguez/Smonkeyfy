const GenericFilter = require('./genericFilter');
class SpotifyFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            name: null
        })
    }

};

module.exports = SpotifyFilter;