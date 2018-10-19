<template>
    <div>
        <i v-if="fav" @click="abandonar()" class="fas fa-heart fa-lg heart"></i>
        <i v-else @click="seguir()" class="far fa-heart fa-lg"></i>
    </div>
</template>

<script>
import { SmonkeyfyService } from "../../services/smonkeyfyService";
export default {
    name: "fav-button",
    props: [
        'idLista',
        'isFollow',
    ],
    data(){
        return{
            fav: this.isFollow
        }
    },
    methods:{
        seguir(){
            SmonkeyfyService.seguir(this.idLista)
            this.fav = true
        },
        abandonar(){
            SmonkeyfyService.abandonar(this.idLista)
            this.fav = false
        }
    },
    watch:{
        isFollow(){
            this.fav = this.isFollow
        }
    }
}
</script>

<style scoped>
    .heart{
    color: red; 
    }
</style>
