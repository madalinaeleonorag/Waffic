<template>
  <v-container fluid>
    <v-data-table
      :headers='headers'
      :items='items'
      item-key='name'
      class='elevation-1'>
      <template slot='headerCell' slot-scope='props'>
        <v-tooltip bottom>
          <span slot='activator'>
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left'>{{ props.item.Email }}</td>
        <td class='text-xs-left'>{{ props.item.Name }}</td>
        <td class='text-xs-left'>{{ props.item.Message }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>



<script>
import firebase from '@/firebase'
export default {
  name: 'ReceivedMessages',
  data() {
    return {
      headers: [
        { text: 'Email', align: 'left', value: 'Email' },
        { text: 'Nume', value: 'Name' },
        { text: 'mesaj', value: 'Message' },
        { text: '', value: '' }
      ],
      items: []
    }
  },
  computed: {
    messages() {
      return firebase.database().ref('ContactMessages').on('value',snap => {
        this.items = []
        var myObj = snap.val()
        if (myObj) {
          var keysMessages = Object.keys(snap.val())
            keysMessages.forEach(key => {
              var messagesDetails = {}
              messagesDetails.Email = myObj[key].Email
              messagesDetails.Name = myObj[key].Name
              messagesDetails.Message = myObj[key].Message
              this.items.push(messagesDetails)
          })
        } else {
          var messagesDetails = {}
          messagesDetails.Email = 'none'
          messagesDetails.Name = 'none'
          messagesDetails.Message = 'none'
          this.items.push(messagesDetails)
        }
      },
      function(error) {
        console.log('Error: ' + error.message)
      }
    )}
  },
  mounted () {
      return firebase.database().ref('ContactMessages').on('value',snap => {
        this.items = []
        var myObj = snap.val()
        if (myObj) {
          var keysMessages = Object.keys(snap.val())
            keysMessages.forEach(key => {
              var messagesDetails = {}
              messagesDetails.Email = myObj[key].Email
              messagesDetails.Name = myObj[key].Name
              messagesDetails.Message = myObj[key].Message
              this.items.push(messagesDetails)
          })
        } else {
          var messagesDetails = {}
          messagesDetails.Email = 'none'
          messagesDetails.Name = 'none'
          messagesDetails.Message = 'none'
          this.items.push(messagesDetails)
        }
      },
      function(error) {
        console.log('Error: ' + error.message)
      }
    )}
  }
</script>