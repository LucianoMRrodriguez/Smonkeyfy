class GenericModelDTO{
    constructor() {
        this.data = {}
    }

    hydrate(data){
        for(let key of Object.keys(this.data)){
            if(data[key] != null && data[key] != undefined){
                this.data[key] = data[key];
            }            
        }
    }

    getData(){
        let validData = {};
        for(let key of Object.keys(this.data)){
            if (this.data[key] != null && this.data[key] != undefined){
                validData[key] = this.data[key];
            }
        }
        return validData;
    }
};

module.exports = GenericModelDTO;