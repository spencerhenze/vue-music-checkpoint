<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->

    <!-- this is for the pop-over  -->

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
          <button type="button" class="btn btn-danger" id="show-myTunes-button" @click="toggleShowMyTunes">Show MyTunes</button>
        </form>
      </div>
    </div>

    <div class="row" id="songs">

      <!-- <div class="col-xs-1"></div> -->

      <!--songs populate here -->
      <itunes class="itunes"></itunes>

      <MyTunes class="my-tunes"></MyTunes>

      <!-- <div class="col-xs-1"></div> -->
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
        artist: '',
      }
    },
    components: {
      Itunes,
      MyTunes
    },
    methods: {
      getMusic: function () {
        if (this.artist != '') {
          this.$store.dispatch('getMusicByArtist', this.artist)
          this.artist = ''
        }

      },
      toggleShowMyTunes: function () {
        this.$store.dispatch('toggleShowMyTunes')
      }
    }
  }

</script>


<style scoped>
  /* .my-tunes {
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
  } */

  @import url('https://fonts.googleapis.com/css?family=Audiowide');

  body {
    background-image: url("//res.cloudinary.com/dvh7zccln/image/upload/v1503611491/dark_texture_utfpwd.jpg");
    background-size: auto;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  a {
    color: black;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20vh;
  }

  .form-style {
    display: flex;
    justify-content: center;
    margin-bottom: 10rem;
  }

  #search-bar {
    width: 30vw;
  }

  .page-title {
    color: white;
    font-size: 4em;
    text-align: center;
    font-family: 'Audiowide', cursive;
    text-shadow: 0 0 15px #FF0000;
  }

  .center-text {
    text-align: center;
  }

  .album-artwork {
    min-width: 150px;
  }

  .card-wrapper {

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFF;
    height: 430px;
  }

  .play-pause-button {
    margin: 2rem 0rem 2rem 0rem;
    display: flex;
    justify-content: center;
    font-size: 3.5rem;
    text-align: center;
    color: #489FDF
  }

  .play-pause-button:hover {
    text-decoration: none;
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }

  #show-myTunes-button {
    margin-left: 5rem;
  }
</style>