<template>
    <div class="myTunes-wrapper col-xs-12 col-sm-5" v-if="showMyTunes==true">

        <div class="row">
            <div class="col-xs-12">
                <h1 class="myTunes-title">MyTunes</h1>
            </div>
        </div>

        <div class="row myTunes-items-wrapper">
            <!--build items here  -->

            <div class="col-xs-12 thumbnail my-card-wrapper" v-for="song in myList">
                <div class="row">
                    <div class="col-xs-12 info-wrapper">
                        <img class="album-artwork" :src="song.albumArt" alt="art">
                        <div class="info">
                            <!-- <a href="javascript:void(0)" data-toggle="tooltip" title="Preview" @click="aud_play_pause(song.id, song.iconId)"><i :id="song.iconId" class="fa fa-play my-play-pause-button"></i>  -->
                            <h5><strong>Title:</strong> {{song.title}}</h5>
                            <!-- </a> -->
                            <h5><strong>Artist: </strong>{{song.artist}}</h5>
                            <h5><strong>Album:</strong> {{song.album}}</h5>
                            <h5><strong>Price:</strong> {{song.price}}</h5>

                        </div>
                        <!-- <button type="button" @click="removeTrack(song._id)">Remove</button> -->
                        <div class="btn btn-group-vertical" role="group" aria-label="promote/demote">
                            <button type="button" class="btn btn-success" @click="promoteTrack(song.id)"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></button>
                            <button type="button" class="btn btn-danger" @click="demoteTrack(song.id)"><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></button>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xs-12 my-action-bar">
                        <audio controls :id="song.id" :src="song.preview" type="audio/mpeg"></audio>
                        <i :id="song.iconId" @click="removeTrack(song._id)" class="fa fa-trash remove-song-button"></i>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>


<script>
    import $ from 'jquery'
    export default {
        name: 'mytunes',
        data() {
            return {

            }
        },

        computed: {
            myList() {
                return this.$store.state.myTunes;
            },
            showMyTunes() {
                return this.$store.state.showMyTunes;
            }
        },

        methods: {
            removeTrack: function (songId) {
                console.log("made it to remove track")
                this.$store.dispatch("removeTrack", songId)
            },
            promoteTrack: function (trackId) {
                this.$store.dispatch("promoteTrack", trackId)
            },
            demoteTrack: function (trackId) {
                this.$store.dispatch("demoteTrack", trackId)
            },
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

        },

        mounted() {
            this.$store.dispatch("getMyTunes")
        }

    }

</script>


<style>
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
        height: auto;
    }

    .card-wrapper {
        background-color: #FFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 400px;
    }

    .myTunes-title {
        text-align: center;
        color: white;
    }

    .myTunes-items-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .my-card-wrapper {

        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;

        /* height: 400px; */
        padding-top: 20px;
        max-width: 460px;
        padding:10px;
    }

    .my-action-bar {
        display: flex;
        align-items: center;
    }

    

    .remove-song-button {
        color: #C9302C;
        font-size: 2.5rem;
        margin-left: 30px;
    }

    .info-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info {
        flex-direction: column;
        margin: 0px 10px 0px 10px;
    }

    .my-play-pause-button {
        margin: 2rem 0rem 2rem 0rem;
        font-size: 3rem;
        text-align: center;
        color: #489FDF
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
</style>