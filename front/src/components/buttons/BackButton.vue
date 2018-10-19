<template>
    <div class="back">
        <i class="el-icon-back" @click="back()"></i>
    </div>
</template>

<script>
export default {
    name: "back-button",
    methods: {
        back() {
            this.$router.history.go(-1)
        }
    }
}
</script>

<style scoped>
    .back{
        color:white;
    }
</style>