<template>
    <div>
		<el-row>
       <router-link v-if="isLoggedIn" :to="{ name: 'CreacionLista' }"><el-button round>Crear Lista</el-button></router-link>
			<el-col :sm=8 class="lateral">
				<el-input placeholder="Buscar" v-model="filter.data.lista" @keyup.enter.native="filtrarLista()">
					<el-button slot="append" icon="el-icon-search" @click="filtrarLista()"></el-button>
				</el-input>
				<div v-for="lista in listas" :key="lista._id">
					<div @click="verLista(lista)">
					<el-card class="box-card" :class="{'active' : selectedList == lista._id}">
						<el-row>
							<el-col :sm=6>
								<img :src="'https://chat.cysonline.com.ar/avatar/'+lista.usuario" style="width:100%">
							</el-col>
							<el-col :sm=18>
								<p style="padding-left:20px;text-align:left;">{{ lista.nombre | capitalize }}</p>
								<small style="padding-left:20px;text-align:left;">
                  <strong>Cantidad de temas: {{ lista.temas.length}}
                  </strong>
                  </small>
							</el-col>
						</el-row>
					</el-card>
					</div>
				</div>
			</el-col>
			<el-col :sm=16 class="detalle">
				<el-card v-if="lista">
					<el-row>
						<photo-content-button-row>
							<template slot="title">
								<span><strong>{{lista.nombre | capitalize}}</strong></span>
							</template>
							<template slot="cant">
								<span><small>Cantidad de temas: {{lista.temas.length}}</small></span>
							</template>
							<template slot="buttons">
								<favorite-button class="float-right"
									:idLista="lista._id"
									:isFollow="isFollow"
								></favorite-button>                
							</template>
							<template slot="content">
								<el-row>
								<list-capital-letter :content="lista.temas"/>
								</el-row>
							</template>
							<template slot="delete" v-if="isOwner">
								<delete-button :listId="lista._id" class="float-left"></delete-button>							
							</template>
						</photo-content-button-row>
					</el-row>
				</el-card>
				<el-card v-else>
					No hay nada!!
				</el-card>
			</el-col>
		</el-row>
		<infinite-loading @infinite="infiniteHandler" v-if="total">
			<span slot="no-more">
				Hasta aca llegue!
			</span>
		</infinite-loading>
    </div>
</template>

<script>
import PhotoContentButtonRow from "@/components/tableLayouts/PhotoContentButtonRow";
import { SmonkeyfyService, Filter } from "../services/smonkeyfyService";
import { mapGetters, mapActions } from "vuex"
import io from 'socket.io-client'
import ListCapitalLetter from '@/components/ListCapitalLetter'
import DeleteButton from '@/components/buttons/DeleteButton'
import FavoriteButton from '@/components/buttons/FavoriteButton'
import InfiniteLoading from 'vue-infinite-loading'

export default {
	name: "listaReproduccion",
	data() {
		return {
		filter: new Filter(),
		listas: [],
		total: null,
		lista: null,
		socket: null,
		selectedList: null
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: 'auth/isLoggedIn',
			loggedUser: 'auth/loggedUser',
			listaId: 'listas/listaId'
		}),
		isFollow() {
			return this.lista.seguidores.includes(this.loggedUser)
		},
		isOwner() {
			return this.lista.usuario == this.loggedUser
		},
	},
	created: async function() {
		const response = await SmonkeyfyService.getLists()
		this.listas = response.list
		this.total = response.total

		this.configureSocket()
		if(this.listaId) {
			this.lista = this.listas.find( lista => lista._id === this.listaId)
		}
	},
	methods: {
		...mapActions({
			updateListaId: 'listas/updateListaId'
		}),
		verLista(lista){
			this.lista = lista
			this.selectedList = lista._id
			this.updateListaId({listaId: lista._id})
		},
		filtrarLista: async function(){
			const data = await SmonkeyfyService.getLists(this.filter)
			this.listas = data.list
		},
		configureSocket(){
			this.socket = io.connect('http://localhost:3800/wsLista/', { 'forceNew': true })
			this.socket.on('new-list', (newList) => {
				this.listas.push(newList)
			})
			this.socket.on('update-list', ({id, lista}) => {
				const index = this.listas.findIndex(lista => lista._id === id)
				this.listas.splice(index, 1, lista)
			})
			this.socket.on('remove-list', ({id}) => {
				const index = this.listas.findIndex(list => list._id === id)
				if (index > 0) {
					if (this.listas[index] === this.lista){
						this.lista = null
					}
					this.listas.splice(index, 1)
				}
			})
		},
		async infiniteHandler($state) {
			if(this.listas.length >= this.total){
				$state.complete()
			}else{
				try{
					this.filter.data.offset += this.filter.data.limmit
					const listas = await SmonkeyfyService.getLists(this.filter)
					this.listas = this.listas.concat(listas.list)
					$state.loaded()
				}catch(err){
					$state.complete()
					console.error(err)
				}
			}
		},
	},
	components: {
		PhotoContentButtonRow,
		ListCapitalLetter,
		DeleteButton,
		FavoriteButton,
		InfiniteLoading,
	}
}
</script>

<style scoped>
.icon-square-16 {
	width: 16px;
	height: 16px;
}
img {
	border-radius: 50%;
}
.el-card.active {
	background: #583f99;
	color: white;
}
.lateral {
	padding:30px 15px 30px 30px;
}
.detalle {
	padding: 30px 30px 30px 15px;
}
</style>