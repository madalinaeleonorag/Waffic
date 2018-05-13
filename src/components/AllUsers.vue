<template>
 <v-container>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="(item, index) in items1" :key="index">
      <div slot="header" style="font-weight:bold;">{{item.Key}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">Prenume: {{item.Name}}</v-card-text>
        <v-card-text class="grey lighten-3">Nume: {{item.Surname}}</v-card-text>
        <v-card-text class="grey lighten-3">Data nașterii: {{item.BirthDate}}</v-card-text>
        <v-card-text class="grey lighten-3">Email: {{item.Email}}</v-card-text>
        <v-card-text class="grey lighten-3">Localitate: {{item.Locality}}</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
 </v-container>
</template>



<script>
  import firebase from '@/firebase'
  export default {
    name: 'AllUsers',
    data () {
      return {
        items1: [],
        index1: null
      }
    },
    watch: {
      userdetails (value) {
        this.items1 = value
      }
    },
    computed: {
      userdetails () {
        return firebase.database().ref('UserDetails')
        .on('value', snap => {
          const myObj = snap.val()
          const keysUsers = Object.keys(snap.val())
          keysUsers.forEach(key => {
            const userdetails = {}
            userdetails.BirthDate = myObj[key].BirthDate
            userdetails.Locality = myObj[key].Locality
            userdetails.Name = myObj[key].Name
            userdetails.Surname = myObj[key].Surname
            userdetails.Email = myObj[key].Email
            userdetails.Key = key
            this.items1.push(userdetails)
          })
        }, function (error) {
          console.log('Error: ' + error.message)
      })
    }
  }
}
</script>