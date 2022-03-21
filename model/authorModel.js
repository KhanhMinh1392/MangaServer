const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    name_author:{
        type:String
    }

})

const Author = mongoose.model('Author',AuthorSchema)
module.exports = Author