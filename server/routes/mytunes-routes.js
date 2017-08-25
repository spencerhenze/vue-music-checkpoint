var express = require('express')
var router = express.Router()

var favorites = require('../models/favorite')
router
    // return all mytunes favorites
    .get('/', (req, res, next) => {
        favorites.find({})
            .then(favorites => {
                res.send(favorites)
            })
            .catch(next)
    })

    // add a favoite
    .post('/', (req, res, next) => {
        // req.body.userId = 0
        favorites.create(req.body)
            .then(favorite => {
                res.send({message: 'favorite added successfully'})
            })
            .catch(next)
    })

    // update the favorite (mostly for sort order adjustments)
    .put('/:favoriteId', (req, res, next) => {
        var favoriteId = req.params.favoriteId
        favorites.findByIdAndUpdate(favoriteId, req.body)
            .then(favorite => {
                res.send({message: 'sort order updated successfully'})
            })
            .catch(next)
    })

    .delete('/:favoriteId', (req, res, next) => {
        var favoriteId = req.params.favoriteId
        favorites. findByIdAndRemove(favoriteId)
            .then(favorite => {
                res.send({message: 'favorite successfully removed'})
            })
            .catch(next)
    })

// Error handler
router.use('/', (err, req, res, next) => {
    if (err) {
        res.send({
            success: false,
            error: err.message     //anything above 200 is an error, 300s are redirects, 400s are errors in the request itself, 500s are server errors
        })
    }
    else {  //if we get here it means someone called next but didn't give it an error.
        res.send(400, {
            success: false,
            error: 'Bad request'
        })
    }
})

module.exports = router;