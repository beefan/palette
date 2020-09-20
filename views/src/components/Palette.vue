<template lang="pug">
  b-container#palette-main
    div.tag-palette(v-if="tagPalette != null")
        b-form(inline)
            b-form-group(description="think of an image that represents a part of today")
                b-form-input(v-model="searchTerms" class="mb-2 mr-sm-2 mb-sm-0")
                b-button(@click="saveTag" variant="dark" class="mb-2 mr-sm-2 mb-sm-0" sm="4") Save Tag
        p {{ tagPalette }}
</template>

<script>
import fetchUtil from "../assets/fetch-util";

export default {
  props: ["searchText"],
  data() {
    return {
      apihost: process.env.VUE_APP_API_HOST,
      tagPalette: null,
      searchTerms: ""
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
    },
    async saveTag() {
      const res = await fetchUtil.postData(`${this.apihost}/1/api/tags/save`);
      const body = await res.json();
      if (res.status == 200) {
        this.$bvToast.toast(body.msg, {
          title: "Saved",
          variant: "success",
          toaster: "b-toaster-top-center"
        });
        this.searchTerms = "";
      } else {
        this.$bvToast.toast(body.msg, {
          title: "Error",
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    }
  }
};
</script>

<style lang="sass">
.tag-palette
    form
        width: 100%
</style>