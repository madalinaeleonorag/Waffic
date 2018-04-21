<template>
  <v-layout>
    <v-container fluid>
      EROAREA CU NULL E DE AICI , NU MAI EXISTAL EGATURA CU DB EVENTS
      <v-list two-line>
        <v-menu offset-y>
          <v-btn slot="activator"> AN
          </v-btn>
          <v-list>
            <v-list-tile @click="filter.an = null">
              <v-list-tile-title>
                All years
                <template v-if="filter.an === null">
                  &#10004;
                </template>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile v-for="an in ani" :key="an" @click="filter.an = an">
              <v-list-tile-title>
                {{an}}
                <template v-if="an === filter.an">
                  &#10004;
                </template>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <v-btn slot="activator"> LUNA </v-btn>
          <v-list>
            <v-list-tile @click="filter.luna = null">
              <v-list-tile-title>
                All months
                <template v-if="filter.luna === null">
                  &#10004;
                </template>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile
            v-for="(month,index) in months"
            :key="index"
            @click="filter.luna = index"
            :disabled="months.clickable">
              <v-list-tile-title>
                {{month.nume}}
                <template v-if="index === filter.luna">
                  &#10004;
                </template>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu
          ref="menu1"
          lazy
          :close-on-content-click="false"
          v-model="menu1"
          transition="scale-transition"
          offset-y
          :nudge-right="40"
          :return-value.sync="date1">
          <v-text-field
            slot="activator"
            label="Data de start"
            v-model="date1"
            readonly>
          </v-text-field>
          <v-date-picker v-model="date1" no-title scrollable @change="$refs.menu1.save(date1)">
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="menu2"
          lazy
          :close-on-content-click="false"
          v-model="menu2"
          transition="scale-transition"
          offset-y
          :nudge-right="40"
          :return-value.sync="date2">
          <v-text-field
            slot="activator"
            label="Data de final"
            v-model="date2"
            readonly>
          </v-text-field>
          <v-date-picker v-model="date2" @change="$refs.menu2.save(date2)" no-title scrollable>
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
        <v-btn @click.native="filter.luna = null, filter.an = null, date1 = null, date2 = null "> RESET
        </v-btn>
        <v-list-tile avatar v-for="(event,index) in filterEvents" :key="index">
            <v-list-tile-avatar>
                <img :src="event.avatar">
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
                {{event.titlu}}
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="event.descriere">
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              {{event.data | longtimeago}}
            </v-list-tile-action-text>
            <v-icon :class="{'green--text':event.prezenta, 'red--text':!event.prezenta}" @click="event.prezenta=!event.prezenta">
              {{event.prezenta ? 'star' : 'star_border'}}
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-container>
  </v-layout>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import moment from 'moment'
  export default {
    name: 'profil',
    data () {
      return {
        date1: null,
        menu1: false,
        date2: null,
        menu2: false,
        ceva: false,
        id: null,
        filter: {
          an: null,
          luna: null
        }
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      months () {
        return this.$store.getters.months
      },
      ani () {
        let ani = []
        this.events.forEach((event, index) => {
          let an = event.data.getFullYear()
          if (!ani.includes(an)) {
            ani.push(an)
          }
        })
        return ani
      },
      filterEvents () {
        return this.events.filter(event => {
          const an = event.data.getFullYear()
          const month = event.data.getMonth()
          let matchingYears = true
          let matchingMonths = true
          let dupadata = true
          let inaintedata = true
          let betweendata = true
          if (this.filter.an || this.filter.luna) {
            matchingYears = this.filter.an ? this.filter.an === an : true
            matchingMonths = this.filter.luna ? this.filter.luna === month : true
          } else if (this.date1 || this.date2) {
            const data = moment(event.data)
            const dupa = moment(this.date1)
            const inainte = moment(this.date2)
            if (dupa === null && inainte) {
              inaintedata = inainte ? data.isSameOrBefore(inainte) : true
            } else if (dupa && inainte === null) {
              dupadata = dupa ? data.isSameOrAfter(dupa) : true
            } else if (dupa && inainte) {
              betweendata = (inainte && dupa) ? data.isBetween(dupa, inainte, null, '[]') : true
            }
          }
          return matchingYears && matchingMonths && inaintedata && dupadata && betweendata
        })
      }
    },
    filters: {
      longtimeago (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>