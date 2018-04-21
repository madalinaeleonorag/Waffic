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
      location () {
        return this.$store.getters.location
      }
    },
    mounted:
      function () {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: +this.coords.lat, lng: +this.coords.long},
          zoom: 16
        })
        var marker = new window.google.maps.Marker({
          position: {lat: +this.coords.lat, lng: +this.coords.long},
          map: map
        })
        const latlong = this.location.lat +','+this.location.long
        console.log(latlong)
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
        console.log(stareVreme);
        var iconVreme = stareVreme[0].WeatherIcon;
        console.log(iconVreme);
        var tempVreme = stareVreme[0].Temperature.Metric.Value;
        console.log(tempVreme);
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