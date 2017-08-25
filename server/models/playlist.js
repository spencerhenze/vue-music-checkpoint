var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    songs: { type: Array },

    // RELATIONSHIPS
    userId: { type: ObjectId, ref: 'User', required: true },
    // listId: {type: ObjectId, ref:'Playlist', required: true},
})

var Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;