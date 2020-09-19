<template lang="pug">
  b-container
    b-row#settings-title
        b-col(sm="2") 
            b-button(variant="dark" @click="$emit('goback')")
                b-icon(icon="arrow-left" style="color: white; font-size: 2rem")
        b-col(sm="8") 
            h1 Settings
    hr
    div#settings-main(v-if="settings")
        p {settings}



</template>

<script>
const fetchutil = require('../assets/fetch-util')
export default {
    data() {
        return {
            settings: null,
            apihost: process.env.VUE_APP_API_HOST,
        }
    },
    mounted() {
        this.getSettings();
    },
    methods: {
        async getSettings() {
            const res = await fetchutil.getData(`${this.apihost}/user/settings/`);
            const body = await res.json();
            console.log(body);
            this.settings = {type: "dog"};
        }
    }
}
</script>

<style lang="sass">

</style>