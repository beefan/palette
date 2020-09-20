<template lang="pug">
div#app
  b-nav(align="center" v-if="loggedIn")
    b-nav-text.title {{ activePage }}
    b-nav-form
      b-form-input(v-if="activePage == 'Palette'" v-model="searchTerms" ria-label="Input" class="mr-1")
    b-nav-item-dropdown(id="nav-dropdown" style="font-size: 2rem;" text="🎨")
      b-dropdown-item(@click="settings = false") Palette
      b-dropdown-item(@click="settings = true") Settings
      b-dropdown-item(@click="logout") Logout
  Login(@login="login" v-if="!loggedIn")
  Settings(v-if="loggedIn && settings")
  Palette(v-if="loggedIn && !settings" :search-text="searchTerms")
</template>

<script>
import Login from "./components/Login.vue";
import Settings from "./components/Settings.vue";
import Palette from "./components/Palette.vue";
import fetchUtil from "./assets/fetch-util";

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
      settings: false,
      searchTerms: ""
    };
  },
  mounted() {
    this.loginIfSessionIsActive();
  },
  computed: {
    activePage() {
      if (!this.loggedIn) return "";
      return this.settings ? "Settings" : "Palette";
    }
  },
  methods: {
    login() {
      this.loggedIn = true;
    },
    async logout() {
      this.loggedIn = false;
      await fetchUtil.getData(`${process.env.VUE_APP_API_HOST}/user/logout`);
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
.title {
  padding-right: 20px;
  font-size: 2rem;
  text-align: left;
  padding-left: 8%;
}
</style>
