// import store from '../store/modules/auth'
import events from '../constantes/constantes'
// import { mapGetters } from "vuex"
import store from '../store'

export class InterceptorService{
    static adjuntarToken(request){
        if(request.url.includes(events.__API__)){
            let token = store.state.auth.kairosToken

            request.headers.set('Authorization', "JWT " + token)
            request.headers.set('Accept', 'application/json')
        }
    }
}
