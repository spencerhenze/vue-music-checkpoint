var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var favoriteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    albumArt: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    price: {type: Number, required: true},
    preview: {type: String, required: true},
    iconId: {type: String, required: true},
    id: {type: String, required: true},
    listPosition: {type: Number, required: true, default: 1}, // this keeps track of the list position

    // RELATIONSHIPS
    // userId: {type: ObjectId, ref:'User', required: true},
    // listId: {type: ObjectId, ref:'Playlist', required: true},
})

var Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;