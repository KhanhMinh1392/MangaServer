const number = require('@hapi/joi/lib/types/number')
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ChapterSchema= new Schema({
    name_chapter :{
        type: String
    },
    views:{
        type : Number,
        default:0
    },
    index:{
        type:Number
    },
    id_comic:{
        type: Schema.Types.ObjectId,
    },
    
},
{timestamps:true}
)

const Chapter = mongoose.model('Chapter',ChapterSchema)
module.exports = Chapter