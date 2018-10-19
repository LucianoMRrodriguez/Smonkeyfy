<template>
    <div>
        <div @click="goToListaCompletaTemas(list._id, list.temas)">
            <el-row>
                <el-col :sm=12>
                    <span><strong>Titulo:</strong> {{list.nombre | capitalize}}</span><br>
                </el-col>
                <el-col :sm=12>
                    <span><strong>Cantidad de temas:</strong> {{list.temas.length}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xs=24 :sm=12 v-for="tema in list.temas.slice(0,showNItems)" :key="tema.nombre">
                    <li>{{tema.nombre | firstNchars(20) | capitalize}}</li>
                </el-col>
            </el-row> 
        </div>
        <el-row>
            <el-checkbox v-model="checkbox" @input="showItems()">Mostrar más</el-checkbox>
        </el-row>
    </div>
</template>

<script>

export default {
    props: ['list'],
    data(){
        return{
            checkbox: false,
            showNItems: 5,
        }
    },
    methods:{
        showItems(){
            if(this.checkbox){
                this.showNItems = 20
            }else{
                this.showNItems = 5
            }
        },
        goToListaCompletaTemas(id, temas){
            this.$router.push({ name: 'ListaCompleta', params: {id, temas}})
        }
    }
}
</script>