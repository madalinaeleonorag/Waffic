<template>
  <v-layout>
    <v-container fluid>
      <v-card>
        aifi cu v-for locatiile favorite
      </v-card>
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
        headers: [
          { text: 'Pornire', align: 'left', value: 'locstart'},
          { text: 'Destinație', value: 'locfinish'},
          { text: 'Data', value: 'data'},
          { text: 'Șterge', sortable: false, value: ''}
        ],
        items: []
      }
    },
    created: function () {
      this.$store.dispatch('getData')
    },
    watch: {
      userHistory (value) {
        this.items = value
      }
    },
    computed: {
      userHistory () {
        return this.$store.getters.userHistory
      },
      user () {
        return this.$store.getters.user
      },
      keysHistory () {
        return this.$store.getters.keysrHistory
      }
    }
  }
</script>