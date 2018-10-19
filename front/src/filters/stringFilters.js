import Vue from 'vue'

Vue.filter('firstNchars', function (value, n) {
    if (!value) return ''
    value = value.toString()
    if(value.length > n)
        return value.substring(0,n) + "..."
    return value
});
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});