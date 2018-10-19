<template>
    <el-row type="flex">
        <el-col class="text-left" >
            <el-row>
                <el-col :sm=6 class="text-left">
                    <el-row>
                        <slot name="title">titulo</slot>
                    </el-row>
                    <el-row>
                        <slot name="cant">cantidad de temas</slot>
                    </el-row>
                </el-col>
                <el-col :sm=18>
                    <slot v-if="isLoggedIn" name="buttons"></slot>
                </el-col>
            </el-row>
            <slot name="content">
                <el-row>
                    <el-col>
                        content1
                    </el-col>
                    <el-col>
                        content2
                    </el-col>
                    <el-col>
                        content3
                    </el-col>
                </el-row>
            </slot>
            <el-row>
                <slot name="delete" v-if="isLoggedIn"></slot>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
    computed: {
        isLoggedIn () {
            return this.$store.getters['auth/isLoggedIn']
        }
    }
}
</script>

<style scoped>

</style>


