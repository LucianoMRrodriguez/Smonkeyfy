<template>
    <div>
        <el-button type="danger" icon="el-icon-delete" @click="dialog()">
            Borrar
        </el-button>

        <el-dialog
            title="Borrar lista"
            :visible.sync="showDialog"
            width="30%"
            center>
            <span>¿Está seguro que desea borrar esta lista <strong>permanentemente</strong>?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog()">Cancelar</el-button>
                <el-button type="primary" @click="deleteList()">Confirmar</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { SmonkeyfyService } from '../../services/smonkeyfyService'

export default {
    props: ['listId'],
    data(){
        return{
            showDialog: false
        }
    },
    methods:{
        dialog(){
            this.showDialog = !this.showDialog
        },
        deleteList(){
            this.dialog()
            SmonkeyfyService.deleteList(this.listId)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
        }
    }
}
</script>
