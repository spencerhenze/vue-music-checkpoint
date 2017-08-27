import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

var ip = '//localhost:3000'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: [],
    showMyTunes: true
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    updateMyTunes(state, favorites) {
      state.myTunes = favorites
    },
    toggleShowMyTunes(state, payload) {
      if (state.showMyTunes == true) {
        state.showMyTunes = false;
      }
      else if (state.showMyTunes == false) {
        state.showMyTunes = true;
      }
    },

  },
  actions: {
    toggleShowMyTunes({ commit, dispatch }) {
      commit('toggleShowMyTunes')
    },

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
      console.log('hello from getMyTunes')
      //this should send a get request to your server to return the list of saved tunes
      $.get(ip + '/api/mytunes').then(favorites => {
        commit('updateMyTunes', favorites)
      })
    },

    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
      $.post(ip + '/api/mytunes', track).then(addedTrack => {
        console.log(track)
        dispatch('getMyTunes')
      }).fail(err => {
        console.error(err)
      })
    },

    removeTrack({ commit, dispatch }, trackId) {
      //Removes track from the database with delete
      $.ajax({
        url: ip + `/api/mytunes/${trackId}`,
        method: 'DELETE',
        contentType: 'application/json',
      }).then(res => {
        console.log('made it back from server')
        dispatch('getMyTunes')
      })
        .fail(err => {
          console.error(err)
        })

      // $.delete(ip + `/api/mytunes/${trackId}`).then((res) => {
      //   dispatch('getMyTunes')
      // }).fail(err => {
      //   console.log(err)
      // })
    },
    promoteTrack({ commit, dispatch }, trackId) {
      //this should increase the position / upvotes and downvotes on the track
      var updatedTrack = {}
      var updatedPrevious = {}

      // get the list
      $.get(ip + '/api/mytunes').then(favorites => {
        for (var i = 0; i < favorites.length; i++) {
          var song = favorites[i];
          var previousSong = favorites[i - 1];

          // when found, check to make sure the position is at least 2
          if (song.id == trackId) {
            if (song.listPosition > 1) {
              // decrement the position number of the current song, and increment the position number of the previous song.
              song.listPosition--;
              // assign the updated song object to the new variables
              updatedTrack = song;
              previousSong.listPosition++;
              updatedPrevious = previousSong;
            }
          }
        }// end of for loop
      }).fail(err => {console.error(err)})

      // update the current song
      $.ajax({
        url: ip + `/api/mytunes/${trackId}`,
        method: 'PUT',
        contentType: 'application/json',
      }).then(res => {
        console.log('song updated successfully')
        // dispatch('getMyTunes')
      }).fail(err => {console.error(err)})

      // update the previous song
      $.ajax({
        url: ip + `/api/mytunes/${updatedPrevious.id}`,
        method: 'PUT',
        contentType: 'application/json',
      }).then(res => {
        console.log('previous song updated successfully')
        dispatch('getMyTunes')
      }).fail(err => {console.error(err)})



      // apply the logic and build the two new objects
      // make two put requests to update each song object
      // call getMyTunes to update the store

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
