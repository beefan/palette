<template lang="pug">
b-container
    b-form(@submit="login" v-if="showlogin")
        b-form-group(label="Username: " label-for="input-1")
            b-form-input(id="input-1" v-model="form.username" :state="usernameValidation" type="text" )
            b-form-invalid-feedback(:state="usernameValidation") Username must be letters and numbers, 5-20 characters long
        b-form-group(label="Password: " label-for="input-2")
            b-form-input(id="input-2" v-model="form.password" :state="passwordValidation" type="password")
            b-form-invalid-feedback(:state="passwordValidation") password must be greater than 8 characters
        b-button(type="submit" variant="dark" :disabled="disableLogin") Login
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
            b-form-invalid-feedback(:state="passwordValidation") password must be greater than 15 characters
        b-form-group(label="Confirm Password: " label-for="input-4")
            b-form-input(id="input-4" v-model="form.confirmPassword" :state="confirmPasswordValidation" type="password")
            b-form-invalid-feedback(:state="confirmPasswordValidation") passwords must match
        b-button(type="submit" variant="dark" :disabled="disableCreateUser") Create User
        p already registered? 
            a(@click="showlogin = !showlogin") login
</template>

<script>
const fetchutil = require("../assets/fetch-util");
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
      },
      showlogin: true,
      apihost: process.env.VUE_APP_API_HOST
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const data = {
        username: this.form.username,
        password: this.form.password
      };
      const res = await fetchutil.postData(`${this.apihost}/user/login`, data);
      const body = await res.json();

      if (res.status == 200 && body.msg == "Login success.") {
        this.$emit("login");
      } else {
        this.form.password = ".";
        this.$bvToast.toast(body.msg, {
          title: "Login Failed",
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    },
    async register(e) {
      e.preventDefault();
      const data = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email
      };

      const res = await fetchutil.postData(`${this.apihost}/user/create`, data);
      const body = await res.json();

      if (res.status == 200) {
        this.$bvToast.toast(body.msg, {
          title: "User Successfully created.",
          variant: "success",
          toaster: "b-toaster-top-center"
        });
        this.form.password = "";
        this.form.confirmPassword = "";
        this.showlogin = true;
      } else {
        this.$bvToast.toast(body.msg, {
          title: "Creation Failed",
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    }
  },
  computed: {
    disableLogin() {
      return !(this.usernameValidation && this.passwordValidation);
    },
    disableCreateUser() {
      return !(
        this.usernameValidation &&
        this.passwordValidation &&
        this.emailValidation &&
        this.confirmPasswordValidation
      );
    },
    usernameValidation() {
      if (this.form.username == "") return null;
      return (
        this.form.username.length > 4 &&
        this.form.username.length < 20 &&
        /^[a-z0-9]+$/i.test(this.form.username)
      );
    },
    emailValidation() {
      if (this.form.email == "") return null;
      return (
        this.form.email.indexOf("@") > -1 &&
        this.form.email.indexOf(".") > -1 &&
        this.form.email.split("@")[1].length > 3
      );
    },
    passwordValidation() {
      if (this.form.password == "") return null;
      return this.form.password.length > 15;
    },
    confirmPasswordValidation() {
      if (this.form.confirmPassword == "") return null;
      return this.form.password === this.form.confirmPassword;
    }
  }
};
</script>

<style lang="sass">
a
    opacity: 60%
    cursor: pointer
p
    padding-top: 5%
    font-size: .8rem
</style>

