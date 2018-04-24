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
      <td class="text-xs-left">{{ props.item.locstart }}</td>
      <td class="text-xs-left">{{ props.item.locfinish }}</td>
      <td class="text-xs-left">{{ props.item.data }}</td>
      <td>
        <v-icon class="text-xs-right" @click="deleteEvent(index)" style="cursor:pointer">
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
    </v-container>
  </v-layout>
</template>

<script>
  /* eslint-disable no-unused-vars */
  export default {
    name: 'profil',
    data () {
      return {
        date1: null,
        menu1: false,
        date2: null,
        headers: [
          { text: 'Pornire', align: 'left', value: 'locstart'},
          { text: 'Destinație', value: 'locfinish'},
          { text: 'Data', value: 'data'},
          { text: 'Șterge', sortable: false, value: ''}
        ],
        menu2: false,
        filter: {
          an: null,
          luna: null
        },
        items: [
          {
            locstart: 'Frozen Yogurt',
            locfinish: 159,
            data: '1%'
          },
          {
            locstart: 'Ice cream sandwich',
            locfinish: 237,
            data: '1%'
          }
        ]
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      userHistory () {
        return this.$store.getters.userHistory
      },
      keysHistory () {
        return this.$store.getters.keysrHistory
      },
      user1 () {
        keysHistory.indexOf(user.uid)
        console.log(x)
      }
    }
  }
</script>