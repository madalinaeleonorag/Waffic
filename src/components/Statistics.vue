<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              uytrdeswaqezsdtcryvg
            </v-card-title>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </v-layout>
</template>

  </v-layout>
</template>


<script>
import firebase from "@/firebase"
export default {
  name: "Statistics",
  data() {
    return {
      cards: [
        { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg'},
        { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg'},
        { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'}
      ]
    }
  },
  computed: {
    //
  }
}
</script>