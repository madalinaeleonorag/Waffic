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
    },
    created: function () {
      console.log('map: ', window.google.maps)
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: +this.coords.lat, lng: +this.coords.long},
        zoom: 16
      })
      var marker = new window.google.maps.Marker({
        position: {lat: +this.coords.lat, lng: +this.coords.long},
        map: map
      })
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