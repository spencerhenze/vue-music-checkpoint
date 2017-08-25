<template>
    <div class="row">
        <h1>MyTunes</h1>
        <!--build items here  -->
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="song in results">
            <div class="thumbnail card-wrapper">
                <h3 class="center-text">{{song.artist}}</h3>
                <img class="album-artwork" :src="song.albumArt" alt="art">
                <div class="info">
                    <a href="javascript:void(0)" data-toggle="tooltip" title="Preview" @click="aud_play_pause(song.id, song.iconId)"><i :id="song.iconId" class="fa fa-play play-pause-button"></i>
                    <h5><strong>Title:</strong> {{song.title}}</h5></a>
                    <h5><strong>Album:</strong> {{song.album}}</h5>
                    <h5><strong>Price:</strong> {{song.price}}</h5>
                    <audio :id="song.id" :src="song.preview" type="audio/mpeg"></audio>
                    <button type="button" @click="removeTrack(song.id)">Remove</button>

                </div>
            </div>
        </div>

    </div>

</template>


<script>
    export default {
        name: 'mytunes',
        data() {
            return {

            }
        },

        computed: {
            myList() {
                return this.$store.state.myTunes;
            }
        },

        methods: {
            removeTrack: function(songId) {
                this.$store.dispatch("removeTrack")
            }
        },

        mounted() {
            this.$store.dispatch("getMyTunes")
        }

    }

</script>


<style>

</style>