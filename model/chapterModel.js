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
    number:{
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