<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination">
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3>
        <v-card>
          <v-card-title><h4>{{ props.item.Name }}</h4></v-card-title>
          <img v-if="this.item.icon" :src="require('../assets/TypesOfCollaborationsPictures/' + collaboration.Picture + '.png')"/>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Durată:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Duration }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Preț:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Price }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-icon @click="BuyColaboration(props.item)" style="cursor:pointer"> shopping_cart </v-icon>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
                  </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            {{ props.item.Description }}
          </v-card-text>
        </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-data-iterator>
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
                  :type="e1 ? 'password' : 'text'"
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
                  :type="e1 ? 'password' : 'text'"
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

  </v-container>
</template>

<script>
  import firebase from '@/firebase'
  import moment from "moment"
  export default {
    data () {
      return {
        show: false,
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
    created: function () {
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
      },
    },
    methods: {
      BuyColaboration (item) {
        if(!this.user) {
          this.signin = true
        } else {
          this.$store.dispatch('BuyColaboration', item)
        }
      },
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
      },
    }
  }
</script>