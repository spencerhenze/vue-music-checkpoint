<template>
  <div id="app" class="container-fluid">
    <!-- <ul>
      <router-link :to"{name: 'Home'}">Home</router-link>
      <router-link :to"{name: 'MyTunes'}">MyTunes</router-link>
        
    </ul> -->
     <home></home> 
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
</style>
