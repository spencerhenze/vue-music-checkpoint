var router = require('express').Router();
var Users = require('../models/user');


// add a user
router.post("/register", (req, res) => {
    //req.body.email = req.body.email.toLowerCase();
    console.log(req);
    Users.create(req.body).then((user) => {
        console.log(user);
        req.session.uid = user.id;
        req.session.save();
        user.password = null;
        delete user.password;
        res.send({
            message: "created account OK",
            data: user
        });
    }).catch((err) => {
        res.send({ error: err });
    });
});

// delete a user
router.delete('/:userId', (req, res, next) => {
    var userId = req.params.userId;
    
    //find the user and blow them away!
    User.findByIdAndRemove(userId)
        .then(user => {
            res.send({ message: `So long user: ${userId}.`})
        })
        .catch(next);
})


// log in
router.post("/login", (req, res) => {
    console.log('youre hitting login')

    Users.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            //TODO: make these errors more general once app is fully functional
            return res.send({ error: `Invalid login or password: couldn't find user` })
        }
        user.validatePassword(req.body.password)
            .then((valid) => {
                if (!valid) {
                    return res.send({ error: 'Invalid login or password: incorrect password' });
                }
                //console.log(user);
                req.session.uid = user.id;
                req.session.save(); //save session
                user.password = null;

                delete user.password;

                console.log("Logged in correctly");
                res.send({
                    message: 'success',
                    data: user
                });
            }).catch(err => {
                res.send({ error: err || 'Invalid login or password: validate password request failed' });
            })
        // console.log(valid);

    }).catch(err => {
        res.send({ error: err || 'Invalid login or password: couldn`t find user catch' }); //if false alarm return the regular thing.
    });

});


// To update user password
router.put('/:userId', function (req, res, next) {
    var userId = req.params.userId;
    var updatedUserObject = req.body;

    //find the user and update the record
    User.findByIdAndUpdate(userId, updatedUserObject)
        .then(user => {
            res.send(req.body);
        })
        .catch(next);
})

// to log out
router.delete('/logout', (req, res) => {
    req.session.destroy();
    res.send({
        message: "goodbye"
    });
});


module.exports = router;