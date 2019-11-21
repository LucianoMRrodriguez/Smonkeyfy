<template>
    <el-dialog title="Login" :visible.sync="visible" @keyup.13.native="login">
        <slot name="beforeForm">
        </slot>
        <el-alert
            v-if="showAlert"
            title="Usuario y/o password inválidos."
            type="error"
            @close="showAlert = false"
            show-icon>
        </el-alert>
        <el-form :model="form">
            <el-form-item label="Username" prop="name">
            <el-input ref="userInput" type="text" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <slot name="afterForm">
        </slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">Cancel</el-button>
            <el-button type="primary" @click="login" :loading="logging">Login</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'modal-login',
    props: {
        loginPromise: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            form: {
                name: '',
                pass: ''
            },
            visible: false,
            showAlert: false,
            focus: false,
            logging: false
        }
    },
    methods: {
        login() {
            if(!this.logging){
                this.logging = true
                this.loginPromise({username: this.form.name, password: this.form.pass})
                    .then(response => {
                        this.$emit('logged-in', response)
                        this.clearInputs()
                        this.visible = false
                        this.showAlert = false
                        this.logging = false
                    }, () => {
                        this.$emit('failed-in')
                        this.showAlert = true
                        this.logging = false
                    })
            }
        },
        changeVisibility(val) {
            this.visible = val
        },
        clearInputs() {
            this.form.name = ''
            this.form.pass = ''
        }
    },
    watch: {
        visible: function(){
            this.$nextTick(function () {
                this.$refs.userInput.focus()
            })
        }
    }
}
</script>

