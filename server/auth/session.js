var session = require('express-session');
var dbStore = require('connect-mongodb-session')(session);

var store = new dbStore({
    uri: "mongodb://student:student@ds157873.mlab.com:57873/vue-music",
    collection: 'Sessions'
});

store.on('error', function(error) {
    console.error("Failed to build session: ", error);
});


module.exports = session({
    secret: "orange juice is best served cold",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store,
    resave: true,
    saveUninitialized: true
});