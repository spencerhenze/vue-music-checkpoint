<template>
    <div class="col-xs-10 results">



        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="song in results">
            <div class="thumbnail card-wrapper">
                <h3 class="center-text">{{song.artist}}</h3>
                <img class="album-artwork" :src="song.albumArt" alt="art">
                <div class="info">
                    <a href="javascript:void(0)" data-toggle="tooltip" title="Preview" @click="aud_play_pause('song.id', 'song.iconId')"><i :id="song.iconId" class="fa fa-play play-pause-button"></i>
                  <h5><strong>Title:</strong> {{song.title}}</h5></a>
                    <h5><strong>Album:</strong> {{song.collection}}</h5>
                    <h5><strong>Price:</strong> {{song.price}}</h5>
                    <audio :id="song.id" :src="song.preview" type="audio/mpeg"></audio>
                </div>
            </div>
        </div>


    </div>
</template>


<script>
    export default {
        name: 'itunes',
        data() {
            return {

            }
        },
        computed: {
            results() {
                return this.$store.state.results;
            }
        },
        methods: {
            aud_play_pause: function (audioId, iconId) {
                // TODO: fix this
                var myAudio = document.getElementById(audioId);
                if (myAudio.paused) {
                    $(`#${iconId}`).removeClass('fa fa-play');
                    $(`#${iconId}`).addClass('fa fa-pause');
                    myAudio.play();
                }
                else {
                    $(`#${iconId}`).removeClass('fa fa-pause');
                    $(`#${iconId}`).addClass('fa fa-play');
                    myAudio.pause();
                }
            }

        }
    }

</script>

<style>

</style>