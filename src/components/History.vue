<template>
  <v-layout>
    <v-container fluid>
      <v-card>
        aici cu v-for locatiile favorite
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
      <td class="text-xs-left">{{ props.item.Start }}</td>
      <td class="text-xs-left">{{ props.item.Finish }}</td>
      <td class="text-xs-left">{{ props.item.Date }}</td>
      <td>
        <v-btn icon class="text-xs-right" @click="deleteItem(props.item)">
          <v-icon>delete</v-icon>
        </v-btn>
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
        return this.$store.getters.keysHistory
      }
    },
    methods: {
      deleteItem (item) {
        var index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?')
        console.log(index)
        this.$store.dispatch('deleteHistory', index)
      }
    }
  }
</script>