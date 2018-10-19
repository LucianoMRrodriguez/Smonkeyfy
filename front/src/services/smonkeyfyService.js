import Vue from 'vue'

export class SmonkeyfyService{
  static async getLists(filter = new Filter()){
    const response = await Vue.http.get('http://localhost:3800/listas/?' + filter.getQueryString())
    const json = await response.json()
    return json.data
	}
  static async deleteList(id){
    const response = await Vue.http.delete('http://localhost:3800/listas/' + id)
    const json = await response.json()
    return json
  }
  static async getSongs(nombre){
    const futureResponse = await Vue.http.get('http://localhost:3800/spotify?name=' + nombre)
		const response = await futureResponse.json()
		return response.data.list
  }
  static async postSongs(nuevaLista){
    const response = await Vue.http.post('http://localhost:3800/listas', nuevaLista)
    const json = await response.json()
    return json
  }
  static async seguir(idLista){
    const futureResponse = await Vue.http.put('http://localhost:3800/listas/follow/' + idLista)
		const response = await futureResponse.json()
    return response.data.list
  }
  static async abandonar(idLista){
    const futureResponse = await Vue.http.put('http://localhost:3800/listas/unfollow/' + idLista)
		const response = await futureResponse.json()
    return response.data.list
  }

}
export class Filter {
  constructor () {
    this.data = {
      usuario: null,
      nombre: null,
      lista: null,
      offset: 0,
      limmit: 10,
    }
  }
  
  getQueryString() {
    let queryString = ''
    for (let key of Object.keys(this.data)) {
      if (this.data[key] != null) {
        queryString += (queryString !== '' ? '&' : '') + `${key}=${this.data[key]}`
      }
    }
    return queryString
  }
}
