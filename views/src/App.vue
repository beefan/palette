<template lang="pug">
div#app
  b-nav(align="center" v-if="activeView != views.LOGIN")
    b-nav-text.title {{ activeView }}
    b-nav-form
      b-form-input(v-if="activeView == views.PALETTE" v-model="searchTerms" ria-label="Input" class="mr-1")
    b-nav-item-dropdown(id="nav-dropdown" style="font-size: 2rem;" text="🎨")
      b-dropdown-item(@click="activeView = views.PALETTE") Palette
      b-dropdown-item(@click="activeView = views.SETTINGS") Settings
      b-dropdown-item(@click="logout") Logout
  Login(@login="activeView == views.PALETTE" v-if="activeView == views.LOGIN")
  Settings(v-if="activeView == views.SETTINGS")
  Palette(v-if="activeView == views.PALETTE" :search-text="searchTerms")
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
      searchTerms: "",
      views: {
        LOGIN: "Login",
        SETTINGS: "Settings",
        PALETTE: "Palette"
      },
      activeView: ""
    };
  },
  mounted() {
    this.activeView = this.views.LOGIN;
    this.loginIfSessionIsActive();
  },
  methods: {
    async logout() {
      this.activeView = this.views.LOGIN;
      await fetchUtil.getData(`${process.env.VUE_APP_API_HOST}/user/logout`);
    },
    async loginIfSessionIsActive() {
      const res = await fetchUtil.getData(process.env.VUE_APP_API_HOST);
      await res.json();
      if (res.status == 200) {
        this.activeView = this.views.PALETTE;
      }
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
