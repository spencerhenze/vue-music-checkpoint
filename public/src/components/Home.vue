<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <myTunes class="my-tunes"></myTunes>
    <itunes class="itunes"></itunes>
  </div>
</template>

<script>
  import itunes from 'itunes'
  import myTunes from 'my-tunes'
  export default {
    name: 'home',
    data() {
      return {

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