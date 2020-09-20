<template lang="pug">
  b-container#palette-main
    div.tag-palette(v-if="tagPalette != null")
        p {{ tagPalette }}
</template>

<script>
import fetchUtil from "../assets/fetch-util";

export default {
  props: ["searchText"],
  data() {
    return {
      apihost: process.env.VUE_APP_API_HOST,
      tagPalette: null
    };
  },
  mounted() {
    this.fetchPalette();
  },
  methods: {
    async fetchPalette() {
      const res = await fetchUtil.getData(`${this.apihost}/1/api/palette`);
      const body = await res.json();
      this.tagPalette = body;
    }
  }
};
</script>

<style>
</style>