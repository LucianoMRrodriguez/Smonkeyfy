const auth = {
    namespaced: true,
    state: {
        listaId: null,
    },
    getters: {
        listaId: state => state.listaId,
    },
    mutations: {
        updateListaId (state, {listaId}) {
            state.listaId = listaId
        }
    },
    actions: {
        updateListaId (context, payload) {
			context.commit('updateListaId', {listaId:payload.listaId})
        },
    }
}

export default auth