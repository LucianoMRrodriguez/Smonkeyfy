import Vue from 'vue'
import Router from 'vue-router'
import ListasReproduccion from '@/components/ListasReproduccion'
import CreacionLista from '@/components/CreacionLista'
import ListaCompleta from '@/components/ListaCompleta'
import Profile from '@/components/Profile'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/Smonkeyfy/',
  saveScrollPosition: true,
  routes: [
    {
		path: '/listas/',
		name: 'ListasReproduccion',
		component: ListasReproduccion,
    },
    {
		path: '/listas/creation',
		name: 'CreacionLista',
		component: CreacionLista
    },
    {
		path: '/listas/:id',
		name: 'ListaCompleta',
		component: ListaCompleta,
		props: true
    },
    {
		path: '/profiles/:user',
		name: 'Profile',
		component: Profile
    },
    { 
		//Este path es el default si es que no matchea ninguno de los anteriores
		//Debe ir último en la lista para que no matchee antes que otros
		path: '*', 
		redirect: { name: 'ListasReproduccion' }
    }
  ]
})
