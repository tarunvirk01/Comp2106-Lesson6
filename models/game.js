// create the game model with mongoose to do the CRUD operations
let mongoose = require('mongoose')

let gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is Required'
  },
  developer: {
    type: String,
    requied: 'Developer is Required'
  },
  genre: {
    type: String
  },
  year: {
    type: Number,
    required: 'Year is Required',
    min: 1970
  }
})

// make the model public
module.exports = mongoose.model('Game', gameSchema)
