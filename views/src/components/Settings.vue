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
                b-button(@click="saveSettings" :variant="buttonVariant" :disabled="!isChanged") Save Changes
</template>

<script>
const fetchutil = require('../assets/fetch-util')
export default {
    data() {
        return {
            settingsWatcher: null,
            settings: null,
            apihost: process.env.VUE_APP_API_HOST,
        }
    },
    mounted() {
        this.fetchSettings();
    },
    computed: {
        isSettings() {
            return !(this.settings == null);       
        },
        isChanged() {
            if (this.settings == null) return false;

            for (const property in this.settings) {
                if (this.settings[property] != this.settingsWatcher[property]) return true;
            }

            return false;
        },
        buttonVariant() {
            return this.isChanged ? "danger" : "dark";
        }
    },
    methods: {
        setWatcher() {
            this.settingsWatcher = Object.assign({}, this.settings);
        },
        async fetchSettings() {
            const res = await fetchutil.getData(`${this.apihost}/user/settings/`);
            const body = await res.json();
            this.settings = body[0];
            this.setWatcher();
        },
        async saveSettings() {
            const res = await fetchutil.postData(`${this.apihost}/user/settings/save/`, this.settings);
            const body = await res.json();
            if (res.status == 200){
                this.$bvToast.toast(body.msg, {
                    title: 'Saved',
                    variant: 'success',
                    toaster: 'b-toaster-top-center'
                });
                this.setWatcher();
            } else {
                this.$bvToast.toast(body.msg, {
                    title: 'Error',
                    variant: 'danger',
                    toaster: 'b-toaster-top-center'
                });
            }
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