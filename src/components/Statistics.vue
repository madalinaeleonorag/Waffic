<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

        <v-flex xs6>
          <v-card>
            <v-card-text>
              <bars
                :data="[1, 2, 5, 9, 5, 10, 9, 10, 2, 9, 4, 5, 6, 7, 3, 2, 3, 5]"
                :gradient="['#ffa214', '#1092e0']"
                :barWidth="5"
                :growDuration="1">
              </bars>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Top utilizatori după numărul de colaborări activate
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-tile v-for="item in items" :key="item.title">
                  <v-list-tile-action>
                    <v-icon v-if="item.icon" color="pink">star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
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

<script>
import Vue from 'vue'
import firebase from "@/firebase"
export default {
  name: "Statistics",
  data() {
    return {
      items: [
        { icon: true, title: 'Jason Oner', avatar: '/static/doc-images/lists/1.jpg' },
        { title: 'Travis Howard', avatar: '/static/doc-images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: '/static/doc-images/lists/4.jpg' }
      ],
      allDestinations: []
    }
  },
  computed: {
    getAllDestinations() {
      return firebase.database().ref('userDestinationsHistory')
          .on('value', snap => {
            var allDest = []
            const myObj = snap.val()
            const keysUsers = Object.keys(snap.val())
            keysUsers.forEach(key => {
              const keysHistory = Object.keys(myObj[key])
              keysHistory.forEach(key1 => {
                allDest.push(myObj[key][key1].Finish)
              })
            })
            this.allDestinations = allDest
          }, error => {
            console.log('Error: ' + error.message)
          })
    }
  }
}
</script>