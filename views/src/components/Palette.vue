<template lang="pug">
  b-container#palette-main(v-if="tagPalette != null")
    b-row
        b-col
            b-form-group(description="think of an image that represents a part of today (then press comma)")
                b-form-input(v-model="searchTerms" class="mb-2 mr-sm-2 mb-sm-0" :formatter="watcher")
        b-col
            b-form-group(description="today's tags")
                b-button(@click="saveOldTag" 
                         v-for="tag in todaysTags.filter((x,i) => i <= 10)" 
                         class="mb-2 ml-sm-2 mb-sm-2" 
                         pill 
                         variant="outline-info" 
                         size="sm") {{ tag }}
    b-row
        b-button(@click="saveOldTag" 
            v-for="tag in todaysTags.filter((x,i) => i > 10)" 
            class="mb-2 ml-sm-2 mb-sm-2" 
            pill 
            variant="outline-info" 
            size="sm") {{ tag }} 
    hr
    b-form 
        p or choose from your tag palette
        b-button(@click="saveOldTag" 
                 v-for="tag in tagPalette" 
                 class="mb-2 mr-sm-2 mb-sm-2" 
                 pill 
                 variant="outline-primary") {{ tag }}
</template>

<script>
import fetchUtil from "../assets/fetch-util";

export default {
  data() {
    return {
      apihost: process.env.VUE_APP_API_HOST,
      tagPalette: null,
      todaysTags: [],
      searchTerms: ""
    };
  },
  computed: {
    disableSave() {
      return this.searchTerms == "";
    },
    saveButtonColor() {
      return this.disableSave ? "dark" : "primary";
    },
    dateString() {
      const d = new Date();
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
  },
  mounted() {
    this.fetchPalette();
    this.fetchTodaysTags();
  },
  methods: {
    async fetchPalette() {
      const res = await fetchUtil.getData(`${this.apihost}/1/api/palette`);
      const body = await res.json();
      this.tagPalette = body.filter(x => x != null);
    },
    async fetchTodaysTags() {
      const res = await fetchUtil.getData(
        `${this.apihost}/1/api/tags/${this.dateString}`
      );
      const body = await res.json();
      this.todaysTags = body.filter(x => x != null);
    },
    async saveTag(tag) {
      const res = await fetchUtil.postData(`${this.apihost}/1/api/tags/save`, {
        tag: tag
      });
      const body = await res.json();

      if (res.status == 200) {
        this.todaysTags = this.todaysTags.filter(x => x != tag);
        this.todaysTags.push(tag);
      } else {
        this.$bvToast.toast(body.msg, {
          title: "Error",
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    },
    saveSearchTag() {
      this.saveTag(this.searchTerms);
      this.searchTerms = "";
    },
    saveOldTag(event) {
      const tag = event.target.innerText;
      this.saveTag(tag);
    },
    watcher(value) {
      if (value.charAt(value.length - 1) == ",") {
        const tag = value.substring(0, value.length - 1);
        this.saveTag(tag);
        return "";
      } else {
        return value;
      }
    }
  }
};
</script>

<style lang="sass">
</style>