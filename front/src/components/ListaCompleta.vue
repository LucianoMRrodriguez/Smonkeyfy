<template>
    <div>
		<el-row>
			<el-col :sm=6>
				<img src="../assets/collage.png"/>
			</el-col>
			<el-col :sm=6>
				<list-capital-letter :content="temasList"/>
				<delete-button :listId="listId" class="delete"></delete-button>
			</el-col>
		</el-row>
    </div>
</template>

<script>
import ListCapitalLetter from '@/components/ListCapitalLetter'
import BackButton from '@/components/buttons/BackButton'
import DeleteButton from '@/components/buttons/DeleteButton'
import { SmonkeyfyService } from '../services/smonkeyfyService'

export default {
	props: {
		temas: null,
	},
	data() {
		return {
			temasList: []
		}
	},
    components: {
        'list-capital-letter' : ListCapitalLetter,
        'back-button' : BackButton,
        'delete-button' : DeleteButton
    },
    computed: {
        listId: function(){
			return this.$route.params.id
		}
	},
	created: async function () {
		if (!this.temas) {
			this.temasList = (await SmonkeyfyService.getList(this.listId)).temas
		} else {
			this.temasList = this.temas
		}
	},
}
</script>

<style>
	.delete{
		float: left;
	}
</style>