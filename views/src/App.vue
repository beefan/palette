<template lang="pug">
div#app
  Login(@login="login" v-if="!loggedIn")
  Settings(@goback="settings = !settings" v-if="loggedIn && settings")
  Palette(v-if="loggedIn && !settings")
</template>

<script>
import Login from "./components/Login.vue";
import Settings from "./components/Settings.vue";
import Palette from "./components/Palette.vue";
import fetchUtil from './assets/fetch-util';

export default {
  name: "App",
  components: {
    Login,
    Settings,
    Palette
  },
  data() {
    return {
      loggedIn: false,
      settings: true
    }
  },
  mounted() {
    this.loginIfSessionIsActive();
  },
  methods: {
    login() {
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
    },
    async loginIfSessionIsActive() {
      const res = await fetchUtil.getData(process.env.VUE_APP_API_HOST);
      await res.json();
      console.log(res.status);
      this.loggedIn = res.status == 200;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
