import Vue from 'vue'

const login = function (username, password) {
    return Vue.http.post('https://kairos.cysonline.com.ar:1443/api/tokens/', 
        {username: username, password: password})
}
const validateToken = function (jwt) {
    return Vue.http.get('https://kairos.cysonline.com.ar:1443/api/tokens/' + jwt)
}

export default {
    login,
    validateToken
}