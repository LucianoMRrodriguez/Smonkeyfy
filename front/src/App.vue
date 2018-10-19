<template>
  <div id="app">
    <el-menu mode="horizontal" background-color="#583F99">
      <el-menu-item index="1">
        <back-button/>
      </el-menu-item>
      <el-menu-item index="2">
        <el-button type="text" v-if="!isLoggedIn" @click="showModal(true)" class="nav">Login</el-button>
        <el-button type="text" v-if="isLoggedIn" @click="logoutCallback()" class="nav">Logout</el-button>
      </el-menu-item>
    </el-menu>
    <modal-login ref="modalLogin" :loginPromise="storeLogin" @logged-in="posLogin">
    </modal-login>
    <router-view/>
  </div>
</template>

<script>
import SmonkeyfyHeader from '@/components/layout/Header'
import ModalLogin from '@/components/ModalLogin'
import bus from '@/utils/mixinBus'
import events from '@/constantes/constantes'
import { mapState, mapGetters, mapActions } from 'vuex'
import BackButton from '@/components/buttons/BackButton'

export default {
  name: 'app',
  mixins: [bus],
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn'
    })
  },
  created () {
    this.validateToken()
      .then(value => {
        if(!value) {
          this.storeLogout()
        }
      })
  },
  methods: {
    showModal: function(val) {
      this.$refs.modalLogin.changeVisibility(val)
    },
    posLogin: function() {
      this.bus.send({event:events.loginEventName})
    },
    logoutCallback: function() {
      this.storeLogout()
      this.bus.send({event:events.logoutEventName})
      this.$router.push({ name: 'ListasReproduccion'})
    },
    ...mapActions({
      storeLogin: 'auth/smonkeyfyLogin',
      storeLogout: 'auth/smonkeyfyLogout',
      validateToken: 'auth/isAuthenticated',
      spotifyLogin: 'spotify/login'
    })
  },
  components: {
    'smonkeyfy-header' : SmonkeyfyHeader,
    'modal-login' : ModalLogin,
    'back-button' : BackButton
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.nav{
  color:white;
}

body {
	background: #eee;
}
</style>
