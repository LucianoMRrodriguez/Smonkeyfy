<template>
    <div>
        <!-- <photo-content-button-table 
            :content="list"
            @photo-click="goToListaCompleta($event)">
            <template slot="content" slot-scope="{ rowContent }">
                <profile-list :list="rowContent"></profile-list>
            </template>
            <template slot="buttons" slot-scope="{ rowButtons }">
                <el-row>
                    <el-col :sm=6>
                        <el-button circle> <img class="icon-square-16" :src="like"/>
                        </el-button>
                        <el-button circle> <img class="icon-square-16" :src="dislike"/>
                        </el-button>
                    </el-col>
                    <el-col :sm=6>
                        <delete-button :listId="rowButtons._id"></delete-button>
                    </el-col>
                </el-row>
            </template>
        </photo-content-button-table> -->
    </div>
</template>

<script>
// import PhotoContentButtonTable from '@/components/tableLayouts/PhotoContentButtonTable'
import ProfileList from './ProfileList.vue'
import { SmonkeyfyService, Filter  } from '../services/smonkeyfyService'
import DeleteButton from './buttons/DeleteButton.vue'
import events from '@/constantes/constantes'

export default {
    name: 'profile-lists',
    data() {
        return {
            list: [],
            filter: new Filter(),
            like: events.like,
            dislike: events.dislike
        }
    },
    created(){
        this.filter.data.usuario = this.username
        SmonkeyfyService.getLists(this.filter)
            .then(list => { this.list = list })
            .catch(error => console.log(error))
    },
    methods: {
        goToListaCompleta(event){
            this.$router.push({ name: 'ListaCompleta', params: {id:event._id,temas:event.temas}})
        }
    },
    computed: {
        username: function(){
            return this.$route.params.user
        }
    },
    components: {
        // 'photo-content-button-table' : PhotoContentButtonTable,
        'profile-list': ProfileList,
        'delete-button' : DeleteButton
    }
}
</script>

<style scoped>
img {
    width: 16px;
    height: 16px;
}
</style>