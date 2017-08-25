import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

var ip = '//localhost:3000'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: []
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    updateMyTunes(state, favorites) {
      state.myTunes = favorites
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      console.log(artist)
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);

      $.getJSON(apiUrl).then(data => {
        console.log(data)
        // at this point the data object from the API includes movies. We need to filter those before committing.
        var filteredList = []
        // check each item to make sure it's a song. if it is, push it to the filtered list.
        data.results.forEach(function (item) {
          if (item.kind == 'song') {
            filteredList.push(item)
          }
        })
        // now customize the object to make it more friendly.
        var songList = filteredList.map(function (song) {
          return {
            title: song.trackName,
            albumArt: song.artworkUrl60,
            artist: song.artistName,
            album: song.collectionName,
            price: song.collectionPrice,
            preview: song.previewUrl,
            id: song.trackId
          }
        })

        // now add the extra keys that will allow manipulation of play/pause and icon
        var i = 0;

        songList.forEach(song => {
          song.jsId = 'song' + i;
          song.iconId = 'stateicon' + i;
          i++
        })

        // now commit the filtered and customized results
        console.log(songList)
        commit('setResults', songList)
      })
    },

    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
      $.get(ip + '/api/mytunes').then(favorites => {
          commit('updateMyTunes', favorites)
        })
    },

    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
      $.post(ip + '/api/mytunes', track).then(addedTrack => {
        commit('addToMyTunes', addedTrack)
      }).fail(err => {
        console.error(err)
      })
    },

    removeTrack({ commit, dispatch }, track) {
      //Removes track from the database with delete
    },
    promoteTrack({ commit, dispatch }, track) {
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    }

  } // end actions

  // getters: {
  //   results: (state) => {
  //     return state.results;
  //   }
  // }

}) // end store object

export default store
