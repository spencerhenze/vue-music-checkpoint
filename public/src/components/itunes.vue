<template>
    <div v-for="song in results">

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div class="thumbnail card-wrapper">
                <h3 class="center-text">${song.artist}</h3>
                <img class="album-artwork" src="${song.albumArt}" alt="art">
                <div class="info">
                    <a href="javascript:void(0)" data-toggle="tooltip" title="Preview" onclick="app.controllers.itunesCtrl.aud_play_pause('${id}', '${iconId}')"><i id="${iconId}" class="fa fa-play play-pause-button"></i>
                  <h5><strong>Title:</strong> ${song.title}</h5></a>
                    <h5><strong>Album:</strong> ${song.collection}</h5>
                    <h5><strong>Price:</strong> ${song.price}</h5>
                    <audio id=${id} src="${song.preview}" type="audio/mpeg"></audio>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        name: 'home',
        data() {
            return {

            }
        },
        computed: mapState({
            results(state) {
                return state.results;
            }
        })
    }

</script>

<style>

</style>