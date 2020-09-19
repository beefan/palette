<template lang="pug">
  b-container
    b-row#settings-title
        b-col(sm="4") 
            b-button(variant="dark" @click="$emit('goback')")
                b-icon(icon="arrow-left" style="color: white; font-size: 2rem")
        b-col(sm="8") 
            h1 Settings
            hr
            div#settings-main(v-if="isSettings")
                b-form-group(description="this is how often we'll prompt you for a tag entry")
                    b-input-group(prepend="Prompt Frequency " append= " hrs")
                        b-form-input(v-model="settings.prompt_frequency_hrs", type="text")
                b-form-group(description="probably best not to start analysizing new entries right away")
                    b-input-group(prepend="Analysis Lag " append= " hrs")
                        b-form-input(v-model="settings.analysis_frequency_hrs", type="text")
                b-form-group(description="invest in your growth, but don't get obsessive")
                    b-input-group(prepend="Check Limit " append= " hrs")
                        b-form-input(v-model="settings.check_limit_hrs", type="text")
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
    computed: {
        isSettings() {
            return !(this.settings == null);       
        }
    },
    methods: {
        async getSettings() {
            const res = await fetchutil.getData(`${this.apihost}/user/settings/`);
            const body = await res.json();
            this.settings = body[0];
        }
    }
}
</script>

<style lang="sass">
#settings-title
    text-align: left
#settings-main, input
    text-align: right
</style>