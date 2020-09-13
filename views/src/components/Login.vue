<template lang="pug">
b-container
    b-form(@submit="login" v-if="showlogin")
        b-form-group(label="Username: " label-for="input-1")
            b-form-input(id="input-1" v-model="form.username" :state="usernameValidation" type="text" )
            b-form-invalid-feedback(:state="usernameValidation") Username must be letters and numbers, 5-20 characters long
        b-form-group(label="Password: " label-for="input-2")
            b-form-input(id="input-2" v-model="form.password" :state="passwordValidation" type="password")
            b-form-invalid-feedback(:state="passwordValidation") password must be greater than 8 characters
        b-button(type="submit" variant="dark") Login
        p not a registered user? 
            a(@click="showlogin = !showlogin") create an account 
    b-form(@submit="register" v-if="!showlogin")
        b-form-group(label="Username: " label-for="input-1")
            b-form-input(id="input-1" v-model="form.username" :state="usernameValidation" type="text" )
            b-form-invalid-feedback(:state="usernameValidation") username must be letters and numbers, 5-20 characters long
        b-form-group(label="Email: " label-for="input-3")
            b-form-input(id="input-3" v-model="form.email" :state="emailValidation" type="text" )
            b-form-invalid-feedback(:state="emailValidation") email must be valid, wait who determines what's <em>valid</em> anyway?
        b-form-group(label="Password: " label-for="input-2")
            b-form-input(id="input-2" v-model="form.password" :state="passwordValidation" type="password")
            b-form-invalid-feedback(:state="passwordValidation") password must be greater than 8 characters
        b-form-group(label="Confirm Password: " label-for="input-4")
            b-form-input(id="input-4" v-model="form.confirmPassword" :state="confirmPasswordValidation" type="password")
            b-form-invalid-feedback(:state="confirmPasswordValidation") passwords must match
        b-button(type="submit" variant="dark") Create User
        p already registerd? 
            a(@click="showlogin = !showlogin") login
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            showlogin: true
        }
    },
    methods: {
        login(e) {
            e.preventDefault()
            this.$bvToast.toast('You clicked Login')
        },
        register(e) {
            e.preventDefault()
            alert('rarrr')
        }
    },
    computed: {
        usernameValidation() {
            if (this.form.username == '') return null;
            return this.form.username.length > 4 && 
                   this.form.username.length < 20 &&
                   (/^[a-z0-9]+$/i).test(this.form.username)
        },
        emailValidation() {
            if (this.form.email == '') return null;
            return this.form.email.indexOf('@') > -1 && 
                   this.form.email.indexOf('.') > -1 &&
                   this.form.email.split('@')[1].length > 3
        },
        passwordValidation() {
            if (this.form.password == '') return null;
            return this.form.password.length > 8
        },
        confirmPasswordValidation() {
            if (this.form.confirmPassword == '') return null;
            return this.form.password === this.form.confirmPassword
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

