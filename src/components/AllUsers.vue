<template>
 <v-container>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="(item, index) in items" :key="index">
      <div slot="header" style="font-weight:bold;">{{item.Key}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">Prenume: {{item.Name}}</v-card-text>
        <v-card-text class="grey lighten-3">Nume: {{item.Surname}}</v-card-text>
        <v-card-text class="grey lighten-3">Data nașterii: {{item.BirthDate}}</v-card-text>
        <v-card-text class="grey lighten-3">Email: {{item.Email}}</v-card-text>
        <v-card-text class="grey lighten-3">Localitate: {{item.Locality}}</v-card-text>
          <v-card-text class="grey lighten-3">
            <v-btn class="primary" @click="(collaborationsDetails = true) && (index1 = index)">Vezi istoric colaborări
            </v-btn>
          </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

      <!-- LOGIN -->

  <v-dialog v-model="collaborationsDetails" max-width="490">
    <v-card>
      <v-card-title
        class="primary">
        Intră în cont
      </v-card-title>
        <v-container fluid>
          <v-data-table
            :headers="headers"
            :items="items"
            item-key="name"
            class="elevation-1">
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.StartDate }}</td>
              <td class="text-xs-left">{{ props.item.TypesOfCollaboration }}</td>
              <td class="text-xs-left">{{ props.item.DenumireCompanie }}</td>
              <td class="text-xs-left">{{ props.item.DescriereCompanie }}</td>
            </template>
          </v-data-table>
        </v-container>
      <v-card-actions>
        <v-btn color="primary" type="submit" @click="collaborationsDetails = false">Ieșire</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

 </v-container>
</template>



<script>
  import firebase from '@/firebase'
import vueEditorBridge from './vue-temp/vue-editor-bridge';
  export default {
    name: 'AllUsers',
    data () {
      return {
        id: null,
        items: [],
        index1: null,
        collaborationsDetails: false,
        headers: [
          { text: 'Data start', align: 'left', value: 'locstart'},
          { text: 'Tip colaborare', value: 'locfinish'},
          { text: 'Companie', value: 'data'},
          { text: 'Descriere companie', value: ''}
        ],
        items: []
      }
    },
    watch: {
      userdetails (value) {
        this.items = value
      }
      // collaborationsDetails (value) {
      //   this.items = value
      // }
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
            this.items.push(userdetails)
          })
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    collaborationsDetails () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var myObj = snap.val()
            if(myObj[index1].Collaborations) {
              var keysCollaborations = Object.keys(myObj[index1].Collaborations)
              keysCollaborations.forEach(key2 => {
                  var details = {}
                  details.StartDate = myObj[index1].Collaborations[key2].StartDate
                  details.TypesOfCollaboration = myObj[index1].Collaborations[key2].TypesOfCollaboration
                  details.DenumireCompanie = myObj[index1].Collaborations[key2].DenumireCompanie
                  details.DescriereCompanie = myObj[index1].Collaborations[key2].DescriereCompanie
                  this.items.push(details)
              })
            }
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    }
  }
}
</script>