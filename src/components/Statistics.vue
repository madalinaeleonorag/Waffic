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
                  <td class="text-xs-left">{{ props.item.Key }}</td>
                  <td class="text-xs-left">{{ props.item.Name }}</td>
                  <td class="text-xs-left">{{ props.item.Surname }}</td>
                  <td class="text-xs-left">{{ props.item.BirthDate }}</td>
                  <td class="text-xs-left">{{ props.item.Email }}</td>
                  <td class="text-xs-left">{{ props.item.Locality }}</td>
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

<!-- RAPORT: Top tipuri colaborari active -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> attach_money
              </v-icon>
              Top tip colaborari active
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in topCollabs" :key="index">
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

<!-- RAPORT: Top tipuri colaborari active -->
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <v-icon color="primary"> calendar_today
              </v-icon>
              Top vârste utilizatori
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in userAges" :key="index">
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
import moment from "moment"
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
        { text: '-', value: 'a' },
        { text: '--', value: 'b' },
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Nume', value: 'Name' },
        { text: 'Prenume', value: 'Surname' },
        { text: 'Data nașterii', value: 'BirthDate' },
        { text: 'Email', value: 'Email' },
        { text: 'Localitate', value: 'Locality' }
      ],
      items: [],
      usersLocations: [],
      headers2: [
        { text: 'Utilizator', align: 'left', value: 'utilizator'},
        { text: 'Data start', align: 'left', value: 'dataStart'},
        { text: 'Tip colaborare', value: 'tipColaborare'},
        { text: 'Companie', value: 'data'},
        { text: 'Descriere companie', value: ''}
      ],
      items2: [],
      topDestination: [],
      topusersHistory: [],
      topusersCollab: [],
      usersWithCollab: 0,
      usersWithoutCollab: 0,
      usersWithHistory: 0,
      usersWithoutHistory: 0,
      topCollabs: [],
      userAges: [],
      allUsersAges: []
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
    this.topCollaborations()
    this.usersAges()
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
        var alldetails = []
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
              alldetails.push(details)
            })
          }
        })
        this.items2 = alldetails
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
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('piechart1'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Tip', 'Numar'],
          ['Cu Colaborări', this.usersWithCollab],
          ['Fără Colaborări', this.usersWithoutCollab]
        ]), { is3D: false })
     }})
    },
    piechart2 () {
      var myObjwith = []
      var myObj = []
      firebase.database().ref('UserDetails')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('userDestinationsHistory')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('piechart2'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Tip', 'Numar'],
          ['Cu Istoric', Object.keys(myObjwith).length],
          ['Fără Istoric', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false})
      }})
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
    topCollaborations () {
      return firebase.database().ref('Collaborations')
      .on('value', snap => {
        var collaborationTypes =['1week','HappyMonth','BeOnline','What about six?','Forget about payment']
        var allTopCollabs = []
        var allCollabs = []
        const myObj = snap.val()
        const keysCollabs = Object.keys(snap.val())
        keysCollabs.forEach(key => {
          allCollabs.push(myObj[key].TypesOfCollaboration)
        })
        for(var j = 0; j < 3; j ++) {
          var modeMap = {}
          var maxEl = allCollabs[0], maxCount = 1
          for(var i = 0; i < allCollabs.length; i++)
            {
              var el = allCollabs[i]
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
            for(var i = 0; i < allCollabs.length; i++)
            {
              if(maxEl === allCollabs[i]) {
                allCollabs.splice(i,1)
              }
            }
          allTopCollabs.push(maxEl)
        }
        for(var i = 0; i < allTopCollabs.length; i++)
        {
          allTopCollabs[i] = collaborationTypes[i]
        }
        this.topCollabs = allTopCollabs
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
    usersAges () {
      return firebase.database().ref('UserDetails')
      .on('value', snap => {
        var allAgesinNumber = []
        var allAges = []
        const myObj = snap.val()
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          var x = myObj[key].BirthDate
          allAges.push(moment(x).format())
        })
        for(var i = 0; i < allAges.length; i ++) {
          allAges[i] = Math.round(moment.duration(moment(new Date()).diff(moment(allAges[i]))).asYears())
          this.allUsersAges.push(allAges[i])
        }
        for(var j = 0; j < 3; j ++) {
          if(allAges.length == 0) console.log('e gol')
          var modeMap = {}
          var maxEl = allAges[0], maxCount = 1
          for(var i = 0; i < allAges.length; i++)
            {
              var el = allAges[i]
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
            for(var i = 0; i < allAges.length; i++)
            {
              if(maxEl === allAges[i]) {
                allAges.splice(i,1)
              }
            }
          this.userAges.push(maxEl)
        }
      }, error => {
        console.log('Error: ' + error.message)
      })
    },
  }
}
</script>