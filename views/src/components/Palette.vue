<template lang="pug">
  b-container#palette-main
    p {{ this.searchText }}
</template>

<script>
export default {
  props: ["searchText"],
  data() {
    return {
      loaded: null,
      apihost: process.env.VUE_APP_API_HOST
    };
  }
};
</script>

<style>
</style>