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
      console.log(state.myTunes)
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
        // favorites should come back sorted
        commit('updateMyTunes', favorites)
      })
    },

    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
      // get the list and adjust the listPosition property
      $.get(ip + '/api/mytunes').then(favorites => {
        track.listPosition = (favorites.length + 1);

        // Then submit the new song.
        $.post(ip + '/api/mytunes', track).then(addedTrack => {
          console.log(track)
          dispatch('getMyTunes')
        }).fail(err => { console.error(err) })


      }).fail(err => { console.error(err) })

    },

    removeTrack({ commit, dispatch }, trackId) {
      //Removes track from the database with delete

      $.get(ip + '/api/mytunes').then(favorites => {
        for (var i = 0; i < favorites.length; i++) {
          var song = favorites[i];
          var nextSong = favorites[i + 1];

          // when found, update the rest of the items
          if (song._id == trackId) {
            if (nextSong) {
              for (var j = i; j < favorites.length; j++) {
                var followingSong = favorites[j]
                followingSong.listPosition--;
                $.ajax({
                  url: ip + `/api/mytunes/${followingSong._id}`,
                  method: 'PUT',
                  contentType: 'application/json',
                  data: JSON.stringify(followingSong)
                }).then(res => {
                  console.log("")
                }).fail(err => { console.error(err) })


              } // end of internal for loop
            }

            $.ajax({
              url: ip + `/api/mytunes/${trackId}`,
              method: 'DELETE',
              contentType: 'application/json',
            }).then(res => {
              dispatch('getMyTunes')
              return
            }).fail(err => {
                console.error(err)
              })

          }
        }
      }).fail(err => { console.error(err) })
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
        console.log(`current song's position: ${song.listPosition}`)
        if (song.listPosition > 1) {
          // decrement the position number of the current song, and increment the position number of the previous song.
          song.listPosition--;
          console.log(`current song's new position: ${song.listPosition}`)

          // assign the updated song objects to the new variables
          updatedTrack = song;

          previousSong.listPosition++;
          console.log(`previous song's new position: ${previousSong.listPosition}`)
          updatedPrevious = previousSong;
        }
        else {
          return console.log("song is already in the top position")
        }
      }
    }// end of for loop
    // update the current song
    $.ajax({
      url: ip + `/api/mytunes/${updatedTrack._id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedTrack)
    }).then(res => {
      console.log('song updated successfully')
    }).fail(err => { console.error(err) })

    // update the previous song
    $.ajax({
      url: ip + `/api/mytunes/${updatedPrevious._id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedPrevious)
    }).then(res => {
      console.log('previous song updated successfully')
      dispatch('getMyTunes')
    }).fail(err => { console.error(err) })

  }).fail(err => { console.error(err) })

},
demoteTrack({ commit, dispatch }, trackId) {
  //this should decrease the position / upvotes and downvotes on the track
  var updatedTrack = {}
  var updatedNext = {}

  // get the list
  $.get(ip + '/api/mytunes').then(favorites => {
    for (var i = 0; i < favorites.length; i++) {
      var song = favorites[i];
      var nextSong = favorites[i + 1];

      // when found, check to make sure the position is at least 2
      if (song.id == trackId) {
        console.log(`current song's position: ${song.listPosition}`)
        if (song.listPosition < favorites.length) {
          // decrement the position number of the current song, and increment the position number of the previous song.
          song.listPosition++;
          console.log(`current song's new position: ${song.listPosition}`)

          // assign the updated song objects to the new variables
          updatedTrack = song;

          nextSong.listPosition--;
          console.log(`next song's new position: ${nextSong.listPosition}`)
          updatedNext = nextSong;
        }
        else {
          return console.log("song is already in the last position")
        }
      }
    }// end of for loop
    // update the current song
    $.ajax({
      url: ip + `/api/mytunes/${updatedTrack._id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedTrack)
    }).then(res => {
      console.log('song updated successfully')
    }).fail(err => { console.error(err) })

    // update the previous song
    $.ajax({
      url: ip + `/api/mytunes/${updatedNext._id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedNext)
    }).then(res => {
      console.log('next song updated successfully')
      dispatch('getMyTunes')
    }).fail(err => { console.error(err) })

  }).fail(err => { console.error(err) })

}

  } // end actions


}) // end store object

export default store
