<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

<!-- RAPORT: Toti utilizatorii -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> account_box
              </v-icon>
              Toți utilizatorii
            </v-card-title>
            <v-card-text>
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
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Toate colaborarile -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> add_shopping_cart
              </v-icon>
              Toate colaborările
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers2"
                :items="items2"
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
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Toate destinatiile -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon color="primary">
                location_on
              </v-icon>
              Toate destinațiile căutate de utilizatori
            </v-card-title>
            <v-card-text>
            <v-select
              v-model="allUniqueDestinations"
              chips
              tags
              solo
              disabled>
              <template slot="selection" slot-scope="data">
                <v-chip color="primary" label outline>
                 {{ data.item }}
                </v-chip>
              </template>
            </v-select>
          </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top utilizatori activi -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> sentiment_very_satisfied
              </v-icon>
              Top utilizatori activi
            </v-card-title>
            <v-card-text>
              <v-card>
              <v-list>
                <v-list-tile v-for="(item, index) in topusersHistory" :key="index">
                  <v-list-tile-action>
                    <v-icon v-if="index === 0" color="primary">star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top destinatii dupa cautari -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> directions_car
              </v-icon>
              Top destinații căutate
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in topDestination" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" color="primary">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
           </v-card>
        </v-flex>

<!-- RAPORT: Top cei mai activi colaboratori -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> business_center
              </v-icon>
              Top colaboratori
            </v-card-title>
            <v-card-text>
              <v-card>
              <v-list>
                <v-list-tile v-for="(item, index) in topusersCollab" :key="index">
                  <v-list-tile-action>
                    <v-icon v-if="index === 0" color="primary">star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- STATISTICA: Useri CU/FARA colaborari -->
        <v-flex xs6>
          <v-card>
            <v-card-title>
              <v-icon color="warning">
                work
              </v-icon>
              Utilizatori cu/fără colaborări
            </v-card-title>
            <v-card-text>
              <div id="piechart1"></div>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- STATISTICA: Useri CU/FARA istoric -->
        <v-flex xs6>
          <v-card>
            <v-card-title>
              <v-icon color="warning">
                history
              </v-icon>
              Utilizatori cu/fără istoric
            </v-card-title>
            <v-card-text>
              <div id="piechart2"></div>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top locații utilizatori -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> location_city
              </v-icon>
              Top domicilii utilizatori
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in usersLocations" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" color="primary">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
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
      items1: [
        { icon: true, title: 'Jason Oner', avatar: '/static/doc-images/lists/1.jpg' },
        { title: 'Travis Howard', avatar: '/static/doc-images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: '/static/doc-images/lists/4.jpg' }
      ],
      allDestinations: [],
      allUniqueDestinations: [],
      headers: [
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Nume', value: 'Name' },
        { text: 'Prenume', value: 'Surname' },
        { text: 'Data nașterii', value: 'BirthDate' },
        { text: 'Email', value: 'Email' },
        { text: 'Localitate', value: 'Locality' },
        { text: '-', value: 'a' },
        { text: '--', value: 'b' }
      ],
      items: [],
      headers2: [
        { text: 'Utilizator', align: 'left', value: 'utilizator'},
        { text: 'Data start', align: 'left', value: 'dataStart'},
        { text: 'Tip colaborare', value: 'tipColaborare'},
        { text: 'Companie', value: 'data'},
        { text: 'Descriere companie', value: ''}
      ],
      items2: [],
      topDestination: [],
      usersLocations: [],
      topusersHistory: [],
      topusersCollab: [],
      usersWithCollab: 0,
      usersWithoutCollab: 0,
      usersWithHistory: 0,
      usersWithoutHistory: 0
    }
  },
  mounted () {
    this.topusersbyCollaborations()
    this.userdetails()
    this.allUsersDestinations()
    this.collaborationsDetails()
    this.topDestinations()
    this.topUsersbySearch()
    this.piechart1()
    this.piechart2()
    this.topUsersLocations()
  },
  methods: {
    userdetails () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        const myObj = snap.val()
        var alluserdetails = []
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          const userdetails = {}
          userdetails.BirthDate = myObj[key].BirthDate
          userdetails.Locality = myObj[key].Locality
          userdetails.Name = myObj[key].Name
          userdetails.Surname = myObj[key].Surname
          userdetails.Email = myObj[key].Email
          userdetails.Key = key
          alluserdetails.push(userdetails)
        })
        this.items = alluserdetails
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    },
    allUsersDestinations () {
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
        var uniqueArray = allDest.filter(function(item, pos) {
            return allDest.indexOf(item) == pos;
        })
        this.allUniqueDestinations = uniqueArray
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    collaborationsDetails () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var myObj = snap.val()
        var keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
            if(myObj[key].Collaborations) {
              var alldetails = []
              var keysCollaborations = Object.keys(myObj[key].Collaborations)
              keysCollaborations.forEach(key2 => {
                  var details = {}
                  details.Utilizator = key
                  details.StartDate = myObj[key].Collaborations[key2].StartDate
                  details.TypesOfCollaboration = myObj[key].Collaborations[key2].TypesOfCollaboration
                  details.DenumireCompanie = myObj[key].Collaborations[key2].DenumireCompanie
                  details.DescriereCompanie = myObj[key].Collaborations[key2].DescriereCompanie
                  alldetails.push(details)
              })
            this.items2 = alldetails
          }
        })
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    },
    topDestinations () {
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
        for(var j = 0; j < 3; j ++) {
          if(allDest.length == 0) console.log('e gol')
          var modeMap = {}
          var maxEl = allDest[0], maxCount = 1
          for(var i = 0; i < allDest.length; i++)
            {
              var el = allDest[i]
              if(modeMap[el] == null)
                modeMap[el] = 1
              else
                modeMap[el]++
              if(modeMap[el] > maxCount)
              {
                maxEl = el
                maxCount = modeMap[el]
              }
            }
            for(var i = 0; i < allDest.length; i++)
            {
              if(maxEl.localeCompare(allDest[i]) == 0) {
                allDest.splice(i,1)
              }
            }
          this.topDestination.push(maxEl)
        }
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    topUsersbySearch () {
      return firebase.database().ref('userDestinationsHistory')
      .on('value', snap => {
        const myObj = snap.val()
        const topSearch = []
        const numbers = []
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          numbers.push(Object.keys(myObj[key]).length)
        })
        this.usersWithHistory = keysUsers.length
        for(var i = 0; i < 3; i ++) {
          if(numbers.length == 0) console.log('e gol')
            if(Math.max(...numbers) !== 0) {
            var a = numbers.indexOf(Math.max(...numbers))
            topSearch.push(keysUsers[a])
            numbers[a] = 0
            }
          }
         this.topusersHistory = topSearch
        }, error => {
        console.log('Error: ' + error.message)
      })
    },
    topusersbyCollaborations () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        const topSearch = []
        const numbers = []
        var myObj = snap.val()
        var keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          numbers.push(Object.keys(myObj[key].Collaborations).length)
          if(Object.keys(myObj[key].Collaborations).length === 0) {
            this.usersWithoutCollab = +this.usersWithoutCollab + 1
          } else {
            this.usersWithCollab = +this.usersWithCollab + 1
          }
        })
        for(var i = 0; i < 3; i ++) {
          if(numbers.length == 0) console.log('e gol')
            if(Math.max(...numbers) !== 0) {
            var a = numbers.indexOf(Math.max(...numbers))
            topSearch.push(keysUsers[a])
            numbers[a] = 0
            }
          }
        this.topusersCollab = topSearch
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    },
    piechart1 () {
      var withCollab = this.usersWithCollab
      var WithoutCollab = this.usersWithoutCollab
      window.google.charts.load('current', {packages: ['corechart']})
      window.google.charts.setOnLoadCallback(drawChart)
      function drawChart () {
        var data = window.google.visualization.arrayToDataTable([
          ['Tip', 'Numar'],
          ['Cu Colaborări', withCollab],
          ['Fără Colaborări', WithoutCollab]
        ])
        var options = {
          is3D: false
        }
        var chart = new window.google.visualization.PieChart(document.getElementById('piechart1'))
        chart.draw(data, options)
      }
    },
    piechart2 () {
      var keysLength
      var withHistory
      firebase.database().ref('UserDetails')
      .on('value', snap => {
        keysLength = Object.keys(snap.val()).length
        })
      , error => {
      console.log('Error: ' + error.message)
      }
      firebase.database().ref('userDestinationsHistory')
      .on('value', snap => {
        withHistory = Object.keys(snap.val()).length
        })
      , error => {
      console.log('Error: ' + error.message)
      }
      var WithoutHistory = keysLength - withHistory
      window.google.charts.load('current', {packages: ['corechart']})
      window.google.charts.setOnLoadCallback(drawChart)
      function drawChart () {
        var data = window.google.visualization.arrayToDataTable([
          ['Tip', 'Numar'],
          ['Cu Istoric', withHistory],
          ['Fără Istoric', WithoutHistory]
        ])
        var options = {
          is3D: false
        }
        var chart = new window.google.visualization.PieChart(document.getElementById('piechart2'))
        chart.draw(data, options)
      }
    },
    topUsersLocations () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var allLocations = []
        const myObj = snap.val()
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          allLocations.push(myObj[key].Locality)
        })
        for(var j = 0; j < 3; j ++) {
          if(allLocations.length == 0) console.log('e gol')
          var modeMap = {}
          var maxEl = allLocations[0], maxCount = 1
          for(var i = 0; i < allLocations.length; i++)
            {
              var el = allLocations[i]
              if(modeMap[el] == null)
                modeMap[el] = 1
              else
                modeMap[el]++
              if(modeMap[el] > maxCount)
              {
                maxEl = el
                maxCount = modeMap[el]
              }
            }
            for(var i = 0; i < allLocations.length; i++)
            {
              if(maxEl.localeCompare(allLocations[i]) == 0) {
                allLocations.splice(i,1)
              }
            }
          this.usersLocations.push(maxEl)
        }
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
  }
}
</script>