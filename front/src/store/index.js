import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import listas from './modules/listas'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
		auth,
		listas,
    },
    strict: debug,
    plugins: [createPersistedState()]
})

export default store