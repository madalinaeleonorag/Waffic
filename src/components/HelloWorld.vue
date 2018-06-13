<template>
<v-layout>
  <v-container fluid>
    <img src="@/assets/LOGO-EXTINS.png" alt="Waffic">
    <br>
    <v-card>
    <img  src="@/assets/HelloWorld/map.jpg">
    </v-card>
    <!-- <img src="@/assets/HelloWorld/map.jpg" alt="Waffic"> -->
<!-- ACCES FARA CONT -->
    <v-layout column align-center justify-center>
      <h3 class="primary--text">Acces fără cont</h3>
    </v-layout>
    <v-layout row align-center justify-center>
      <v-btn fab dark large color="primary" @click="dialog2 = !dialog2">
        <v-icon dark>account_circle</v-icon>
      </v-btn>
      <v-btn fab dark large color="primary" @click="dialog3 = !dialog3">
        <v-icon dark>message</v-icon>
      </v-btn>
      <v-btn fab dark large color="primary" @click="dialog4 = !dialog4">
        <v-icon dark>help</v-icon>
      </v-btn>
      <v-btn fab dark large color="primary" @click="dialog5 = !dialog5">
        <v-icon dark>list_alt</v-icon>
      </v-btn>
    </v-layout>
<!-- ACCES CU CONT -->
    <v-layout column align-center justify-center>
      <h3 class="primary--text">Acces cu cont</h3>
    </v-layout>
    <v-layout row align-center justify-center>
      <v-btn fab dark large color="primary" @click="dialog1 = !dialog1">
        <v-icon dark>map</v-icon>
      </v-btn>
      <v-btn fab dark large color="primary" @click="dialog6 = !dialog6">
        <v-icon dark>account_box</v-icon>
      </v-btn>
      <v-btn fab dark large color="primary" @click="dialog7 = !dialog7">
        <v-icon dark>history</v-icon>
      </v-btn>
      <v-btn fab dark large color="primary" @click="dialog8 = !dialog8">
        <v-icon dark>monetization_on</v-icon>
      </v-btn>
    </v-layout>
<!-- SIGN IN -->
    <v-dialog v-model="signin" max-width="490">
      <v-card>
        <v-card-title
          class="primary">
          Intră în cont
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
            <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            >
            </v-text-field>
            <v-text-field
              name="input-10-1"
              label="Parola"
              hint="Minim 8 caractere"
              v-model="password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              :rules="[rules.required]"
              counter
            >
            </v-text-field>
          </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" type="submit" @click="(signup=true) && (signin=false)">Cont nou</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="normal" type="submit" @click="userRecover">Am uitat parola</v-btn>
          <v-btn color="primary" type="submit" @click="userSignin">Intră în cont</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- SIGNUP -->
    <v-dialog v-model="signup" max-width="490">
      <v-card>
        <v-card-title
          class="primary">
          Crează cont nou
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.required, rules.email]"
              >
            </v-text-field>
            </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Nume"
                  v-model="nume"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Prenume"
                  v-model="prenume"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Localitate"
                  v-model="localitate"
                >
                </v-text-field>
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
                    slot="activator"
                    label="Data nașterii"
                    v-model="datana"
                    prepend-icon="event"
                    readonly
                  >
                  </v-text-field>
                  <v-date-picker v-model="datana" no-title scrollable @change="$refs.datanamenu.save(datana)">
                    <v-spacer>
                    </v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="input-10-1"
                  label="Parolă"
                  hint="Minim 8 caractere"
                  v-model="password"
                  min="8"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="'password'"
                  :rules="[rules.required]"
                  counter
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="input-10-1"
                  label="Confirmă parolă"
                  hint="Minim 8 caractere"
                  v-model="confirmPassword"
                  min="8"
                  :type="'password'"
                  :rules="[comparePasswords]"
                >
                </v-text-field>
              </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" type="submit" @click="(signin=true) && (signup=false)">Înapoi</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" @click="userSignUp">Înregistrare</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- DIALOGS PHOTOS -->
    <v-dialog v-model="dialog1">
      <v-card>
        <img src="@/assets/HelloWorld/map.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2">
      <v-card>
        <img src="@/assets/HelloWorld/signin.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3">
      <v-card>
        <img src="@/assets/HelloWorld/contact.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4">
      <v-card>
        <img src="@/assets/HelloWorld/help.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog5">
      <v-card>
        <img src="@/assets/HelloWorld/legal.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog6">
      <v-card>
        <img src="@/assets/HelloWorld/accountdetails.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog7">
      <v-card>
        <img src="@/assets/HelloWorld/historyuser.jpg" alt="Waffic">
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog8">
      <v-card>
        <img src="@/assets/HelloWorld/collaborations.jpg" alt="Waffic">
      </v-card>
    </v-dialog>

  </v-container>
</v-layout>
</template>

<script>
  import firebase from '@/firebase'
  import moment from "moment"
  export default {
    name: 'HOME',
    data () {
      return {
        dialog1: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        dialog6: false,
        dialog7: false,
        dialog8: false,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 8
        },
        items: [],
        e1: true,
        signin: false,
        password: '',
        email: '',
        address: '',
        nume: null,
        prenume: null,
        localitate: null,
        datana: null,
        datanamenu: false,
        signup: false,
        confirmPassword: '',
        rules: {
          required: (value) => !!value || 'Obligatoriu.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalid.'
          }
        }
      }
    },
    created () {
      this.$store.dispatch('getTypesOfCollaborations')
    },
    watch: {
      getTypesOfCollaborations (value) {
        this.items = value
      }
    },
    computed: {
      getTypesOfCollaborations () {
        return this.$store.getters.TypesOfCollaborations
      },
      user () {
        return this.$store.getters.user
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Parolele nu corespund' : ''
      }
    },
    methods: {
      userSignin () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
        this.signin=false
      },
      userRecover () {
        const emailprompt = prompt("Introdu emailul pentru care dorești recuperarea parolei", "");
        firebase.auth().sendPasswordResetEmail(emailprompt).then(function() {
          window.alert("A fost trimis un email de recuperare a parolei la adresa: "+ emailprompt)
        }).catch(function(error) {
          window.alert(error.message)
        })
      },
      userSignUp () {
        this.$store.dispatch('signUp', {email: this.email, password: this.password, nume: this.nume, prenume: this.prenume, localitate: this.localitate, datana: this.datana})
        this.signup=false
      }
    }
  }
</script>

<style>
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>