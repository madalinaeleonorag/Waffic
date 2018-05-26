<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <template>
          <v-parallax :src="require('../assets/HelloWorld/accountdetails.PNG')"></v-parallax>
        </template>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
  /* eslint-disable no-unused-vars */
  export default {
    name: 'profil',
    data () {
      return {
      }
    }
  }
</script>