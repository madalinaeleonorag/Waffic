<template>
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
          <td class="text-xs-left">{{ props.item.Key }}</td>
          <td class="text-xs-left">{{ props.item.Name }}</td>
          <td class="text-xs-left">{{ props.item.Surname }}</td>
          <td class="text-xs-left">{{ props.item.BirthDate }}</td>
          <td class="text-xs-left">{{ props.item.Email }}</td>
          <td class="text-xs-left">{{ props.item.Locality }}</td>
          <td class="text-xs-left">
            <router-link :to="{ name: 'UserCollaborationsHistory', params: { id: props.item.Key}}" style="cursor:pointer">
              Vezi colaborări
            </router-link>
          </td>
          <td class="text-xs-left">
            <router-link :to="{ name: 'UsersHistory', params: { id: props.item.Key}}" style="cursor:pointer">
              Vezi istoric
            </router-link>
          </td>
        </template>
      </v-data-table>
    </v-container>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "AllUsers",
  data() {
    return {
      headers: [
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Nume', value: 'Name' },
        { text: 'Prenume', value: 'Surname' },
        { text: 'Data nașterii', value: 'BirthDate' },
        { text: 'Email', value: 'Email' },
        { text: 'Localitate', value: 'Locality' },
        { text: '', value: '' }
      ],
      items: []
    }
  },
  watch: {
    userdetails (value) {
      this.items = value
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
          this.items.push(userdetails)
        })
      }, function (error) {
        console.log('Error: ' + error.message)
    })
    }
  }
}
</script>
