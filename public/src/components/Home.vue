<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->

    <!-- this is for the pop-over  -->
    <MyTunes class="my-tunes"></MyTunes>
    <!--  -->

    <!-- Begin Main content  -->
    <div class="row">
      <div class="col-xs-12 page-header">
        <h1 class="page-title">Discover Your Music</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <form class="form-inline form-style" @submit.prevent="getMusic">
          <!--DO NOT MODIFY THE ID OR ONCLICK ATTRIBUTES IN THIS FORM-->
          <div class="form-group">
            <input id="search-bar" type="text" class="form-control" v-model="artist" placeholder="Artist Name" />
            <button type="submit" class="btn btn-primary" id="get-music-button">Get Music</button>
          </div>
        </form>
      </div>
    </div>
    <div id="songs">

      <div class="row">
        <div class="col-xs-1"></div>
        <div class="col-xs-10 results">

          <!--songs populate here -->
          <itunes class="itunes"></itunes>

        </div>
        <div class="col-xs-1"></div>
      </div>
    </div>
    <!--end of main content  -->


  </div>
  </template>

<script>
  import MyTunes from './MyTunes'
  import Itunes from './Itunes'
  // import myTunes from './my-tunes'
  export default {
    name: 'home',
    data() {
      return {
        artist: ''
      }
    },
    components: {
      Itunes,
      MyTunes
    },
    methods: {
      getMusic: function() {
        if(this.artist != ''){
          this.$store.dispatch('getMusicByArtist', this.artist)
          artist = ''
        }

      }
    }
  }

</script>


<style>
  .my-tunes {
    display: inline-block;
    min-height: 500px;
    min-width: 50%;
    background: green;
  }

  .itunes {
    display: inline-block;
    background: red;
    min-height: 500px;
    min-width: 45%;
  }
</style>