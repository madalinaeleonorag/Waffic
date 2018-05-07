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
            <v-list-tile>
              <v-list-tile-content>
                <!-- <v-list-tile-sub-title class="align-end"> -->
                  <div>
                  {{ props.item.Description }}
                  </div>
                  <!-- </v-list-tile-sub-title> -->
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-spacer></v-spacer>
              <v-icon class="text-xs-right" @click="BuyColaboration(index)" style="cursor:pointer">
                shopping_cart
              </v-icon>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 8
        },
        items: []
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
      }
    }
  }
</script>