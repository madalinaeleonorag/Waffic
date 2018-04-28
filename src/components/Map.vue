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
      },
      destinationWeather () {
        return this.$store.getters.destinationWeather
      }
    },
    mounted:
      function () {
// INIT MAP
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: +this.coords.lat, lng: +this.coords.long},
          zoom: 16
        })
        var marker = new window.google.maps.Marker({
          position: {lat: +this.coords.lat, lng: +this.coords.long},
          map: map
        })
// DIRECTIONS
        var directionsService = new google.maps.DirectionsService
        console.log("directionsService: " + directionsService)
        var directionsDisplay = new google.maps.DirectionsRenderer
        console.log("directionsDisplay: " + directionsDisplay)
        var start = new google.maps.LatLng(this.location.lat, this.location.long)
        var end = this.Destination.geometry.location
        console.log("start: " + start)
        console.log("end: " + end)
        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }
        console.log("request: " + request)
        directionsDisplay.setMap(map)
        directionsService.route(request, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response)
          } else {
            window.alert('Directions request failed due to ' + status)
          }
        })
// WEATHER
        var apikey = "FhkABGhGW6SPZDZFxamNnyK9j2gz4EhG"
        const latlong = this.location.lat + ',' + this.location.long
// ACTUAL LOCATION WEATHER
        const vremea = new XMLHttpRequest()
        vremea.open("GET","http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikey + "&q=" + latlong + "&details=true", true)
        vremea.onload = function () {
        const locationKey = JSON.parse(vremea.responseText)
        const key1 = locationKey.Key
        const vremeaStatus = new XMLHttpRequest()
        vremeaStatus.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
        vremeaStatus.send()
        vremeaStatus.onload = function(){
        const stareVreme = JSON.parse(vremeaStatus.responseText)
        const iconVreme = stareVreme[0].WeatherIcon
        console.log("iconVreme actual: " + iconVreme)
        const tempVreme = stareVreme[0].Temperature.Metric.Value
        console.log("tempVreme actual: " + tempVreme)
        this.$store.dispatch('getWeather', {iconVreme, tempVreme})
        }
        }
        vremea.send()
        // test
        const iconVreme = 1
        const tempVreme = 10
        this.$store.dispatch('getWeather', {icon: iconVreme, temperature: tempVreme})
// DESTINATION WEATHER
        const vremea2 = new XMLHttpRequest()
        vremea2.open("GET","http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apikey + "&q=" + this.Destination.vicinity + "&details=true", true)
        vremea2.onload = function () {
        const locationKey2 = JSON.parse(vremea2.responseText)
        const key1 = locationKey2[0].Details.Key
        const vremea2Status = new XMLHttpRequest()
        vremea2Status.open("GET","http://dataservice.accuweather.com/currentconditions/v1/" + key1 + "?apikey=" + apikey + "&details=true", true)
        vremea2Status.send()
        vremea2Status.onload = function(){
        const stareVreme2 = JSON.parse(vremea2Status.responseText)
        const iconVreme2 = stareVreme2[0].WeatherIcon
        console.log("iconVreme2 destinatie: " + iconVreme2)
        const tempVreme2 = stareVreme2[0].Temperature.Metric.Value
        console.log("tempVreme2 destinatie: " + tempVreme2)
        }
        }
        vremea2.send()
        // test
        const iconVreme2 = 13
        const tempVreme2 = 25
        this.$store.dispatch('getDestinationWeather', {icon: iconVreme2, temperature: tempVreme2})
      }
  }
</script>

<style scoped>
 #map {
   width: 100%;
   height: 600px;
   background-color: grey;
 }
</style>