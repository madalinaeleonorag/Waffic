<template>
  <v-layout>
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
          <td class="text-xs-left">{{ props.item.Utilizator }}</td>
          <td class="text-xs-left">{{ props.item.StartDate }}</td>
          <td class="text-xs-left">{{ props.item.TypesOfCollaboration }}</td>
          <td class="text-xs-left">{{ props.item.DenumireCompanie }}</td>
          <td class="text-xs-left">{{ props.item.DescriereCompanie }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-layout>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import firebase from '@/firebase'
  export default {
    name: 'AllUsersCollaborations',
    data () {
      return {
        headers: [
          { text: 'Utilizator', align: 'left', value: 'utilizator'},
          { text: 'Data start', align: 'left', value: 'dataStart'},
          { text: 'Tip colaborare', value: 'tipColaborare'},
          { text: 'Companie', value: 'data'},
          { text: 'Descriere companie', value: ''}
        ],
        items: []
      }
    },
    watch: {
      collaborationsDetails (value) {
        this.items = value
      }
    },
    computed: {
      collaborationsDetails () {
        return firebase.database().ref('UserDetails')
        .on('value', snap => {
          var myObj = snap.val()
          var keysUsers = Object.keys(snap.val())
          keysUsers.forEach(key => {
              if(myObj[key].Collaborations) {
                var keysCollaborations = Object.keys(myObj[key].Collaborations)
                keysCollaborations.forEach(key2 => {
                    var details = {}
                    details.Utilizator = key
                    details.StartDate = myObj[key].Collaborations[key2].StartDate
                    details.TypesOfCollaboration = myObj[key].Collaborations[key2].TypesOfCollaboration
                    details.DenumireCompanie = myObj[key].Collaborations[key2].DenumireCompanie
                    details.DescriereCompanie = myObj[key].Collaborations[key2].DescriereCompanie
                    this.items.push(details)
                })
              }
          })
        }, function (error) {
          console.log('Error: ' + error.message)
        })
      }
    }
  }
</script>