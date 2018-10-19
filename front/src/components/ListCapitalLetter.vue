<template>
    <div>
		<el-row>
			<el-input placeholder="Buscar un tema" v-model="search" @keyup.enter.native="filtrarLista()">
				<el-button slot="append" icon="el-icon-search" @click="filtrarLista()"></el-button>
			</el-input>
		</el-row>
        <el-row type="flex" v-for="(content,letter) in tableContents" :key="letter" :gutter="20">
            <el-col :xs=24 :sm=2 class="text-right">
                <strong>{{ letter }}</strong>
            </el-col>
            <el-col :xs=24 :sm=22 class="text-left">
                <el-row v-for="(subcontent, i) in content" :key="subcontent + '_' + i">
                    {{ subcontent }}
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
	name: 'list-capital-letter',
	props: {
		content: Array
	},
	data(){
		return{
			search: "",
			list: [],
			temas: this.content
		}
	},
	computed: {
		tableContents() {
			const sortedContent = this.temas
			.map(a => a.name)
			.sort((a, b) => a.localeCompare(b))
			let tableContent = {}
			sortedContent.forEach(element => {
				tableContent[element[0].toUpperCase()] = []    
			});
			sortedContent.forEach(element => {
				tableContent[element[0].toUpperCase()] = tableContent[element[0].toUpperCase()].concat(element)
			});
			return tableContent
		}
	},
	methods:{
		filtrarLista(){
			let result = []
			let name = this.search.toLowerCase()
			this.content.forEach(tema => {
				if(tema.name.toLowerCase().includes(name)){
					result.push(tema)
				}
			});

			return this.search ? result : this.content
		}
	},
	watch:{
		content(){
			this.temas = this.content
		},
		search(){
			this.temas = this.filtrarLista()
		}
	}
}
</script>

<style>
</style>