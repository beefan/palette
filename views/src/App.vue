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
  methods: {
    login() {
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
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
