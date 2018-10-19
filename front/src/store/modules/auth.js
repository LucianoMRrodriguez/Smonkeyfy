import ldap from '@/services/ldap/tokenauth'
import jwtDecode from 'jwt-decode'

const auth = {
    namespaced: true,
    state: {
        kairosToken: null,
        usuario: null
    },
    getters: {
        isLoggedIn: state => !!state.kairosToken,
        loggedUser: state => state.usuario,
    },
    mutations: {
        updateKairosToken (state, {jwt}) {
            state.kairosToken = jwt
            state.usuario = jwt ? jwtDecode(jwt).username : null
        }
    },
    actions: {
        smonkeyfyLogin (context, payload) {
            return ldap.login(payload.username, payload.password)
                    .then(resp => {
                        context.commit('updateKairosToken', {jwt:resp.body.id})
                    })
        },
        async isAuthenticated (context) {
            let jwt = context.state.kairosToken
            if(jwt){
                let x = await ldap.validateToken(jwt)
                    .then(resp => {
                        return resp.ok
                    })
                    .catch(() => {
                        return false
                    })
                return x
            }else{
                return false
            }
        },
        smonkeyfyLogout (context) {
            context.commit('updateKairosToken', {jwt:null})
        }
    }
}

export default auth