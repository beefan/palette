<template lang="pug">
div#app
  Login(@login="login" v-if="!loggedIn")
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Login
  },
  data() {
    return {
      loggedIn: false
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
