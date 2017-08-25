var mongoose= require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var sessionSchema = new mongoose.Schema({
    created: {type:Date, required: true},
    age: {type: Number, required: true},
    valid: {type: Boolean, required: true, default: true},

    //RELATIONSHIPS
    userId: {type:ObjectId, ref:"User", required: true},
})

var Session = mongoose.model("Session", sessionSchema);


module.exports = Session;