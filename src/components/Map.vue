<template>
  <v-layout>
    <v-flex>
      <div id="map"></div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'events',
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
        const latlong = this.location.lat + ',' + this.location.long
        console.log("Latlong: "+ latlong)
        const vremea = new XMLHttpRequest()
        vremea.open("GET","http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=nIT7Uk4fHN82eVK6A6RoTOz1ABFZv6WN&q="+latlong+"&details=true", true)
        vremea.onload = function () {
        const locationKey = JSON.parse(vremea.responseText)
        const key1 = locationKey.Key
        const vremeaStatus = new XMLHttpRequest()
        vremeaStatus.open("GET","http://dataservice.accuweather.com/currentconditions/v1/"+key1+"?apikey=VSbxFwm7S4kz8tyvaBiFAVxCbsBlnvtm&details=true", true)
        vremeaStatus.send();
        vremeaStatus.onload = function(){
        const stareVreme = JSON.parse(vremeaStatus.responseText)
        console.log("stareVreme: " + stareVreme);
        var iconVreme = stareVreme[0].WeatherIcon;
        console.log("iconVreme: " + iconVreme);
        var tempVreme = stareVreme[0].Temperature.Metric.Value;
        console.log("tempVreme: " + tempVreme);
        }
        }
        vremea.send()
        console.log(vremea)
      }
  }
</script>

<style scoped>
 #map {
   width: 100%;
   height: 550px;
   background-color: grey;
 }
</style>