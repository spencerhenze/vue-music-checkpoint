var mongoose = require("mongoose");
var connection = mongoose.connection;

var status = `Connecting to database - `;


mongoose.connect("mongodb://student:student@ds157873.mlab.com:57873/vue-music", {

    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', (err) => {
    status += `[FAIL]`;
    console.log(status);
});


connection.once('open', (err) => {
    status += `[ CONNECTED ]`;
    console.log(status);
})