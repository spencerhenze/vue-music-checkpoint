<template>
    <!-- if myTunes is showing, this main column needs to be 6 wide -->
    <div class="col-xs-offset-1 col-xs-6  results" v-if="showMyTunes == true">

        <div class="row">

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="song in results">
                <div class="thumbnail card-wrapper">
                    <h3 class="center-text">{{song.artist}}</h3>
                    <img class="album-artwork" :src="song.albumArt" alt="art">
                    <div class="info">
                        <a href="javascript:void(0)" data-toggle="tooltip" title="Preview" @click="aud_play_pause(song.jsId, song.iconId)"><i :id="song.iconId" class="fa fa-play play-pause-button"></i>
                            <h5><strong>Title:</strong> {{song.title}}</h5></a>
                        <h5><strong>Album:</strong> {{song.album}}</h5>
                        <h5><strong>Price:</strong> {{song.price}}</h5>
                        <audio :id="song.jsId" :src="song.preview" type="audio/mpeg"></audio>
                        <button type="button" @click="addToMyTunes(song)">Add</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- if myTunes is not showing, this main column needs to be 10 wide -->
    <div class="col-xs-offset-1 col-xs-10  results" v-else="showMyTunes == false">

        <div class="row">

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="song in results">
                <div class="thumbnail card-wrapper">
                    <h3 class="center-text">{{song.artist}}</h3>
                    <img class="album-artwork" :src="song.albumArt" alt="art">
                    <div class="info">
                        <a href="javascript:void(0)" data-toggle="tooltip" title="Preview" @click="aud_play_pause(song.jsId, song.iconId)"><i :id="song.iconId" class="fa fa-play play-pause-button"></i>
                            <h5><strong>Title:</strong> {{song.title}}</h5></a>
                        <h5><strong>Album:</strong> {{song.album}}</h5>
                        <h5><strong>Price:</strong> {{song.price}}</h5>
                        <audio :id="song.jsId" :src="song.preview" type="audio/mpeg"></audio>
                        <button type="button" @click="addToMyTunes(song)">Add</button>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>


<script>
    // import Home from './Home'
    import $ from 'jquery'
    export default {
        name: 'itunes',
        data() {
            return {

            }
        },
        computed: {
            results() {
                return this.$store.state.results;
            },
            showMyTunes() {
                return this.$store.state.showMyTunes;
            }
        },
        methods: {
            checkIcon: function (myAudio, iconId) {
                if (myAudio.paused) {
                    $(`#${iconId}`).removeClass('fa fa-play');
                    $(`#${iconId}`).addClass('fa fa-pause');
                }
                else {
                    $(`#${iconId}`).removeClass('fa fa-pause');
                    $(`#${iconId}`).addClass('fa fa-play');
                }
            },

            aud_play_pause: function (audioId, iconId) {
                //debugger
                // TODO: fix this
                //console.log(audioId, iconId)
                document.addEventListener('play', function (e) {
                    var audios = document.getElementsByTagName('audio');
                    for (var i = 0, len = audios.length; i < len; i++) {
                        var audio = audios[i]
                        if (audio != e.target) {
                            // this.checkIcon(audios[i].audioId, audios[i].iconId)
                            audio.pause();
                            // $(`#${iconId}`).removeClass('fa fa-pause');
                            // $(`#${audio.iconId}`).addClass('fa fa-play');
                        }
                    }
                }, true);

                var myAudio = document.getElementById(audioId);
                if (myAudio.paused) {
                    this.checkIcon(myAudio, iconId)
                    myAudio.play();

                }
                else {
                    this.checkIcon(myAudio, iconId)
                    myAudio.pause();

                }
            },
            addToMyTunes: function (song) {
                this.$store.dispatch("addToMyTunes", song)
            }

        }
    }

</script>

<style>

</style>