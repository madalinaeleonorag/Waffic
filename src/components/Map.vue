<template>
  <v-layout>
    <v-flex>
      <div id="map"></div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Map',
    data () {
      return {
        map: null,
        directions: {
          service: null,
          display: null,
          start: null,
          end: null
        },
        vremeStart: {
          icon: null,
          temperatura: null
        },
        vremeFinish: {
          icon: null,
          temperatura: null
        }
      }
    },
    computed: {
      coords () {
        return this.$store.getters.location
      },
      Destination () {
        return this.$store.getters.Destination
      },
      location () {
        return this.$store.getters.location
      }
    },
    watch: {
      Destination: {
        deep: true,
        immediate: false,
        handler (newDest) {
          if (newDest && this.directions.service) {
            this.renderDirections()
          }
        }
      }
    },
    methods: {
      renderDirections () {
        if (this.Destination && this.directions.service) {
          this.directions.start = new google.maps.LatLng(this.location.lat, this.location.long)
          this.directions.end = this.Destination.geometry.location
          const request = {
            origin: this.directions.start,
            destination: this.directions.end,
            travelMode: 'DRIVING'
          }
          this.directions.service.route(request, (response, status) => {
            if (status === 'OK') {
              this.directions.display.setDirections(response)
            } else {
              window.alert('Directions request failed due to ' + status)
            }
          })
          // WEATHER
          var apikey = "Hl2mLAz2LxmKsiGn9YNJyKqlhbH69mJr"
          const latlong = this.location.lat + ',' + this.location.long
          // ACTUAL LOCATION WEATHER
          const vremea = new XMLHttpRequest()
          vremea.open("GET","http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikey + "&q=" + latlong + "&details=true", true)
          vremea.onload = () => {
            const locationKey = JSON.parse(vremea.responseText)
            const key1 = locationKey.Key
            const vremeaStatus = new XMLHttpRequest()
            vremeaStatus.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
            vremeaStatus.send()
            vremeaStatus.onload = () => {
              const stareVreme = JSON.parse(vremeaStatus.responseText)
              const iconVreme = stareVreme[0].WeatherIcon
              console.log("iconVreme actual: " + iconVreme)
              this.vremeStart.icon = iconVreme
              const tempVreme = stareVreme[0].Temperature.Metric.Value
              console.log("tempVreme actual: " + tempVreme)
              this.vremeStart.temperatura = tempVreme
              }
          }
          vremea.send()
          // DESTINATION WEATHER
          const vremea2 = new XMLHttpRequest()
          vremea2.open("GET","http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apikey + "&q=" + this.Destination.vicinity + "&details=true", true)
          vremea2.onload = () => {
            const locationKey2 = JSON.parse(vremea2.responseText)
            const key1 = locationKey2[0].Details.Key
            const vremea2Status = new XMLHttpRequest()
            vremea2Status.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
            vremea2Status.send()
            vremea2Status.onload = () => {
              const stareVreme2 = JSON.parse(vremea2Status.responseText)
              const iconVreme2 = stareVreme2[0].WeatherIcon
              console.log("iconVreme2 destinatie: " + iconVreme2)
              this.vremeFinish.icon = iconVreme2
              const tempVreme2 = stareVreme2[0].Temperature.Metric.Value
              console.log("tempVreme2 destinatie: " + tempVreme2)
              this.vremeFinish.temperatura = tempVreme2
              }
            }
          vremea2.send()
          setTimeout(() => {
            this.sendWeather()
          }, 3000)
          setTimeout(this.renderDirections, 600000)
        }
      },
      sendWeather () {
        this.$store.dispatch('getDestinationWeather', {icon: this.vremeFinish.icon, temperature: this.vremeFinish.temperatura})
        this.$store.dispatch('getWeather', {icon: this.vremeStart.icon, temperature: this.vremeStart.temperatura})
      }
    },
    mounted () {
      // INIT MAP
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: +this.coords.lat, lng: +this.coords.long},
        zoom: 16
      })
      // DIRECTIONS
      this.directions.service = new google.maps.DirectionsService
      this.directions.display = new google.maps.DirectionsRenderer
      this.directions.start = new google.maps.LatLng(this.location.lat, this.location.long)
      this.directions.end = this.Destination.geometry.location
      this.directions.display.setMap(this.map)
      this.renderDirections()
      // // WEATHER
      // var apikey = "gUErMQHAYCriONeCNTM7FhzxSz8wGygD"
      // const latlong = this.location.lat + ',' + this.location.long
      // // ACTUAL LOCATION WEATHER
      // const vremea = new XMLHttpRequest()
      // vremea.open("GET","http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikey + "&q=" + latlong + "&details=true", true)
      // vremea.onload = () => {
      //   const locationKey = JSON.parse(vremea.responseText)
      //   const key1 = locationKey.Key
      //   const vremeaStatus = new XMLHttpRequest()
      //   vremeaStatus.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
      //   vremeaStatus.send()
      //   vremeaStatus.onload = () => {
      //     const stareVreme = JSON.parse(vremeaStatus.responseText)
      //     const iconVreme = stareVreme[0].WeatherIcon
      //     console.log("iconVreme actual: " + iconVreme)
      //     this.vremeStart.icon = iconVreme
      //     const tempVreme = stareVreme[0].Temperature.Metric.Value
      //     console.log("tempVreme actual: " + tempVreme)
      //     this.vremeStart.temperatura = tempVreme
      //     }
      // }
      // vremea.send()
      // // DESTINATION WEATHER
      // const vremea2 = new XMLHttpRequest()
      // vremea2.open("GET","http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apikey + "&q=" + this.Destination.vicinity + "&details=true", true)
      // vremea2.onload = () => {
      //   const locationKey2 = JSON.parse(vremea2.responseText)
      //   const key1 = locationKey2[0].Details.Key
      //   const vremea2Status = new XMLHttpRequest()
      //   vremea2Status.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
      //   vremea2Status.send()
      //   vremea2Status.onload = () => {
      //     const stareVreme2 = JSON.parse(vremea2Status.responseText)
      //     const iconVreme2 = stareVreme2[0].WeatherIcon
      //     console.log("iconVreme2 destinatie: " + iconVreme2)
      //     this.vremeFinish.icon = iconVreme2
      //     const tempVreme2 = stareVreme2[0].Temperature.Metric.Value
      //     console.log("tempVreme2 destinatie: " + tempVreme2)
      //     this.vremeFinish.temperatura = tempVreme2
      //     }
      //   }
      // vremea2.send()
      // setTimeout(() => {
      //   this.sendWeather()
      // }, 3000)
    }
  }
</script>

<style scoped>
 #map {
   width: 100%;
   height: 570px;
   background-color: grey;
 }
</style>