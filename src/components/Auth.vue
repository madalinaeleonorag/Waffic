<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1>AUTENTIFICARE</h1>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="email"
                  v-model="email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="password"
                  label="Parola"
                  hint="Cel puțin 8 caractere"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="[rules.required]"
                  counter
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-spacer></v-spacer>
            <router-link color="primary" to="/RecoverPsw" style="cursor:pointer">
                Am uitat parola
            </router-link>
              <v-btn color="primary" type="submit" @click="userSignin">
                  Autentificare
              <v-icon>
                  lock
              </v-icon>
              </v-btn>
            <v-divider inset></v-divider>
            <router-link to="/SignUp" style="cursor:pointer">
                  <v-btn color="primary">
                      Cont nou
                  </v-btn>
            </router-link>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        e1: true,
        password: '',
        email: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
  computed: {
    comparePasswords () {
        return this.password !== this.confirmPassword ? 'Parola nu corespunde' : ''
    },
    user () {
      return this.$store.getters.user
    }
  },
    methods: {
      userSignin () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
      }
    }
  }
</script>