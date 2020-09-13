<template lang="pug">
b-container
    b-form(@submit="login" v-if="login")
        b-form-group(label="Username: " label-for="input-1")
            b-form-input(id="input-1" v-model="form.username" type="text" )
        b-form-group(label="Password: " label-for="input-2")
            b-form-input(id="input-2" v-model="form.password" type="password")
        b-button(type="submit" variant="dark") Login
        p not a registered user? 
            a(@click="login = !login") create an account 
    b-form(@submit="register" v-if="!login")
        b-form-group(label="Username: " label-for="input-1")
            b-form-input(id="input-1" v-model="form.username" type="text" )
        b-form-group(label="Email: " label-for="input-3")
            b-form-input(id="input-3" v-model="form.email" type="email" )
        b-form-group(label="Password: " label-for="input-2")
            b-form-input(id="input-2" v-model="form.password" type="password")
        b-form-group(label="Confirm Password: " label-for="input-4")
            b-form-input(id="input-4" v-model="form.confimPassword" type="password")
        b-button(type="submit" variant="dark") Login
        p already registerd? 
            a(@click="login = !login") login

</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confimPassword: '',
                email: ''
            },
            login: true
        }
    }
}
</script>

<style lang="sass">
a 
    opacity: 60%
    cursor: pointer
p
    padding-top: 5%
    font-size: .8rem
</style>

