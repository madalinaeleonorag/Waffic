<template>
  <v-container grid-list-sm class="pa-4">
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          label="Email"
          name="email"
          :value= getuserdetails.email
          id="email"
          :rules="[rules.email]"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Nume"
          name="nume"
          :value= getuserdetails.nume
          id="nume"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Prenume"
          name="prenume"
          :value= getuserdetails.prenume
          id="prenume"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Localitate"
          name="localitate"
          :value= getuserdetails.localitate
          id="localitate"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-menu
          ref="datanamenu"
          lazy
          :close-on-content-click="false"
          v-model="datanamenu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="datana"
        >
          <v-text-field
            label="Data nașterii"
            slot="activator"
            :value= getuserdetails.datana
            v-model="datana"
            prepend-icon="event"
            readonly
            id = "datana"
          >
          </v-text-field>
          <v-date-picker v-model="datana" no-title scrollable @change="$refs.datanamenu.save(datana)">
            <v-spacer>
            </v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
        <v-flex xs12>
          <v-text-field
            name="parolaactuala"
            label="Parolă actuală"
            hint="Minim 8 caractere"
            v-model="oldpass"
            min="8"
            :type="e1 ? 'password' : 'text'"
            id = "oldpsw"
            required
          >
        </v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
            label="Parolă nouă"
            name="parolanoua"
            hint="Minim 8 caractere"
            v-model="password"
            min="8"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            counter
          >
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            name="parolanouaconfirm"
            label="Confirmă parolă nouă"
            hint="Minim 8 caractere"
            v-model="confirmPassword"
            min="8"
            :type="e1 ? 'password' : 'text'"
            :rules="[comparePasswords]"
            id = "newpsw"
          >
        </v-text-field>
      </v-flex>
      <v-btn @click="savenewdetails">
        Salveaza modificările
      </v-btn>
    </v-layout>
  </v-container>
</template>

<style scoped>
</style>

<script>
  import firebase from '@/firebase'
  import router from '@/router'
  export default {
    name: 'AccountDetails',
    data () {
      return {
        datana: null,
        datanamenu: false,
        password: '',
        email: '',
        e1: true,
        oldpassword: '',
        confirmPassword: '',
        oldpass: 'a',
        user1: null,
        rules: {
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalid.'
          }
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      events () {
        return this.$store.getters.events
      },
      userdetails () {
        return this.$store.getters.userdetails
      },
      keysUsers () {
        return this.$store.getters.keysUsers
      },
      getuserdetails () {
        const x = this.keysUsers.indexOf(this.user.uid)
        const userdet = this.userdetails[x]
        return userdet
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Parolele nu corespund' : ''
      }
    },
    methods: {
      savenewdetails () {
        debugger
        const user = this.user
        console.log("user :"+ user.uid)
        const nume = document.getElementById('nume').value
        const prenume = document.getElementById('prenume').value
        const email = document.getElementById('email').value
        const localitate = document.getElementById('localitate').value
        const datana = document.getElementById('datana').value
        const parolanoua = document.getElementById('newpsw').value
        const cale = firebase.database().ref('users/' + this.user.uid)
        firebase.auth().signInWithEmailAndPassword(this.user.email,this.oldpass).then( function () {
          debugger
          cale.update({nume: nume, prenume: prenume, localitate: localitate, datana: datana})
          firebase.auth().currentUser.updatePassword(parolanoua).then(function() {
            window.alert("Parola a fost schimbată")
          }).catch(function(error) {
            console.log(error.message)
          });
          console.log(nume,prenume,email,localitate,datana,parolanoua,cale)
        }).catch(function(error){
            console.log(error.message)
          })
      }
    }
  }
</script>