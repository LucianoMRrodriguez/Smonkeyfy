import jwtDecode from 'jwt-decode'

const auth = {
    namespaced: true,
    state: {
        token: null,
        usuario: null
    },
    getters: {
        isLoggedIn: state => !!state.token,
        loggedUser: state => state.usuario,
    },
    mutations: {
        updateToken (state, {jwt}) {
            state.token = jwt
            state.usuario = jwt ? jwtDecode(jwt).username : null
        }
    },
    actions: {
        smonkeyfyLogin (context, payload) {
            if(payload.tokens) {
                context.commit('updatetoken', {jwt:tokens.accessToken})
            } else {
                return ldap.login(payload.username, payload.password)
                    .then(resp => {
                        context.commit('updatetoken', {jwt:resp.body.id})
                    })
            }
        },
        async isAuthenticated (context) {
            return true
        },
        smonkeyfyLogout (context) {
            context.commit('updateToken', {jwt:null})
        }
    }
}

export default auth