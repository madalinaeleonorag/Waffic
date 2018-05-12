<template>
  <v-container fluid grid-list-md>
    <v-alert :value="true" type="warning">
      Adăugarea unei noi colaborări la cont duce la anularea colaborării deja active, fără posibilitatea recuperării sumei precedente.
    </v-alert>
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
            <v-icon @click="BuyColaboration()" style="cursor:pointer"> shopping_cart </v-icon>
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
    <!-- formBuy -->
    <v-dialog v-model="buy" max-width="490">
      <v-card>
        <v-card-title
          class="primary">
          Achiziționează colaborarea
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Denumire companie"
                v-model="DenumireCompanie">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Descriere companie"
                v-model="DescriereCompanie">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Coordonata latitudine"
                v-model="CoordonataLatitudine">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Coordonata longitudine"
                v-model="CoordonataLongitudine">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" type="submit" @click="buy=false">Înapoi</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" @click="(payment=true) && (buy=false)">Continuare</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- PAYMENT -->
    <v-dialog v-model="payment" max-width="250">
      <v-card>
       <v-flex xs12>
          <form action="https://www.paypal.com/cgi-bin/webscr" target="_blank" method="post">
          <input type="hidden" name="cmd" value="_s-xclick">
          <input type="hidden" name="hosted_button_id" value="L9NBSYBQH32T4">
          <table>
            <tr><td><input type="hidden" name="on0" value="Alege tipul de colaborare">Alege tipul de colaborare</td></tr>
            <tr><td>
              <select name="os0" v-model="selected">
                <option value="1week">1week : €1.07 EUR</option>
                <option value="HappyMonth">HappyMonth : €3.23 EUR</option>
                <option value="BeOnline">BeOnline : €6.47 EUR</option>
                <option value="What about six?">What about six? : €10.78 EUR</option>
                <option value="Forget about payment">Forget about payment : €16.18 EUR</option>
              </select>
            </td></tr>
          </table>
          <input type="hidden" name="currency_code" value="EUR">
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" @click="Payment">
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
          </form>
        </v-flex>
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
        selected: null,
        DenumireCompanie: null,
        DescriereCompanie: null,
        CoordonataLatitudine: null,
        CoordonataLongitudine: null,
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
        buy: false,
        payment: false,
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
      }
    },
    methods: {
      BuyColaboration () {
        this.buy = true
      },
      Payment() {
        var collaborationTypes =['1week','HappyMonth','BeOnline','What about six?','Forget about payment']
        this.buy = false
        var index = collaborationTypes.indexOf(this.selected)
        debugger
        var day = new Date()
        var dayWrapper = moment(day)
        var dayString = dayWrapper.format("YYYY-MM-DD")
        debugger
        firebase.database().ref('/UserDetails/' + this.user.uid + '/Collaborations/').push({
          StartDate: dayString,
          TypesOfCollaboration: index,
          DenumireCompanie: this.DenumireCompanie,
          DescriereCompanie: this.DescriereCompanie,
          CoordonataLatitudine: this.CoordonataLatitudine,
          CoordonataLongitudine: this.CoordonataLongitudine
        })
        firebase.database().ref('/Collaborations/' + this.user.uid).set({
          StartDate: dayString,
          TypesOfCollaboration: index,
          DenumireCompanie: this.DenumireCompanie,
          DescriereCompanie: this.DescriereCompanie,
          CoordonataLatitudine: this.CoordonataLatitudine,
          CoordonataLongitudine: this.CoordonataLongitudine
        })
        debugger
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