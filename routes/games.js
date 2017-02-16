let express = require('express')
let router = express.Router()

// reference Game model for CRUD
let Game = require('../models/game')

// Get games index page
router.get('/', function(req, res, next) {

  // use the model to query the games collection in mongodb
  Game.find(function(err, qr) {
    if (err) {
      console.log(err)
      res.end(err)
      return
    }
    // load the view and pass the gammes data to it
    res.render('games/index', {
      games: qr,
      title: 'Games'
    })
  })
})

// /GET /games/add
router.get('/add', function(req, res, next) {
    res.render('games/add', { title: 'Add'
  })
})

router.post('/add', function(req,  res, next) {
  // use our games model to add a new Game document to mongodb
  Game.create({
    title: req.body.title,
    developer: req.body.developer,
    genre: req.body.genre,
    year: req.body.year
  },function(err) {
    if (err) {
      console.log(err)
      res.render('error')
      return
    }

    // if no errror show updated games list
    res.redirect('/games')
   })
})

// delete the selected games
router.get('/delete/:_id', function(req, res, next) {
  // delte game and redirect
  Game.remove({ _id: req.params._id }, function(err) {
    if (err) {
      console.log(err)
      res.render('error')
      return
    }

    res.redirect('/games')
  })
})

// edit the slected game
router.get('/:_id', function(req, res, next) {
  // look up the selected game
  Game.findById(req.params._id, function(err, game) {
    if (err) {
      console.log(err)
      res.render('error')
      return
    }
  res.render('games/edit', {
    game: game,
    title: 'Edit'
  })
  })
})

// POST /games/ id
router.post('/:_id', function(req, res, next) {
  // fill a game object
  let game = new Game({
    _id: req.params._id,
    title: req.body.title,
    developer: req.body.developer,
    genre: req.body.genre,
    year: req.body.year
  })

  // call mongoose update
  Game.update({ _id: req.params._id}, game, function(err) {
    if (err) {
      console.log(err)
      res.render('error')
      return
    }
    res.redirect('/games')
  })
})

// make public
module.exports = router
