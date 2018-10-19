
<template>
    <div>
<el-row>
	<el-col  :sm=8 class="lateral">
		<div  v-for="lista in listas" :key="lista._id" >
            <el-card class="box-card">
            <el-row>
			<el-col  :sm=6>
			<img  :src="'https://chat.cysonline.com.ar/avatar/'+lista.usuario" style="width:100%">
			</el-col>
            <el-col :sm=18>
			<p style="padding-left:20px;text-align:left;">{{ lista.nombre | capitalize }}</p>
			<small style="padding-left:20px;text-align:left;">
               <strong> Cantidad de temas: {{ lista.temas.length}}
               </strong>   
               </small>
			</el-col>
            </el-row>
            </el-card>
            </div>
	</el-col>

	<el-col :sm=16 class="detalle">
        <el-card>
        <h3 class="">Nueva lista</h3>
        <el-row>
		<el-col :sm=12>
        <el-input placeholder="Nombre de playlist" v-model="reproduccion.nombre"></el-input>
	</el-col>
        </el-row>
    <br />
        <el-row>
			<el-col :sm=18> 
        <el-input placeholder="Artista o cancion" v-model="nombre">
        </el-input>
	        </el-col>

    <el-col :sm=6> 
        <el-button type="primary" icon="el-icon-search" @click="buscarTema()"></el-button>
    </el-col>
        </el-row>
    <br />

    <div>    
    <searchlista :temas="temas" v-model="reproduccion.temas"></searchlista> 
    </div>

    <div>
       <el-button type="primary" @click="guardarTema()">Guardar</el-button> 
    </div>
        </el-card>
	</el-col>
</el-row>
    </div>
</template>

<script>
    import BackButton from '@/components/buttons/BackButton'
    import buscarlista from './BuscarLista.vue'  
    import { SmonkeyfyService, Filter } from '../services/smonkeyfyService'
    import listareproduccion from './ListasReproduccion.vue'
    import io from 'socket.io-client'
    import { mapGetters } from "vuex"

    export default {
        components: {
            'back-button' : BackButton,
              searchlista: buscarlista,
              reproduccion: listareproduccion,
        },
        data() {
      return {
        nombre:'',
        temas:[],
        reproduccion: {
            temas: [],
            nombre: null
        },
        listas: [],
        lista: null,
      };
    },
    computed:{
         ...mapGetters({
            loggedUser: 'auth/loggedUser'
    }),
    },
    created: async function() {
    const filter = new Filter()
    filter.data.usuario = this.loggedUser
    const response = await SmonkeyfyService.getLists(filter)
    this.listas = response.list
	this.socket = io.connect('http://localhost:3800/wsLista/', { 'forceNew': true })
		this.socket.on('new-list', (newList) => {
            if(this.loggedUser===newList.usuario)
                this.listas.push(newList)
		})
    },
   methods:{
       async buscarTema(){
        this.temas = await SmonkeyfyService.getSongs(this.nombre)
    },
       vaciar(){
            this.reproduccion.temas = [],
            this.reproduccion.nombre = ''
            this.nombre = ''
            this.temas = []
        },
        async guardarTema(){
            if(this.reproduccion.temas.length==0)
               alert('ERROR: LA LISTA NO PUEDE QUEDAR VACIA')
            else {
                this.reproduccion = await SmonkeyfyService.postSongs(this.reproduccion)
                this.vaciar()
            }

        }
   }
    }
    
</script>

<style>
 .input1 {
    max-width: 30%;
  }
  .input2 {
    max-width: 30%;
  }
  h3 {
      text-align: left;
  }
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
</style>