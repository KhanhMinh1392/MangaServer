const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema= new Schema({
    name_cate:{
        type: String
    },
    comic_type:{
        type:Schema.Types.ObjectId,
        ref:"Comic"
    },
    color:{
        type: String
    }
})

const Category = mongoose.model('Category',CategorySchema)
module.exports = Category