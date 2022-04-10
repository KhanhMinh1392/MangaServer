const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgComicSchema= new Schema({
    image :[{
        type:String
    }],
    id_comic:{
        type: Schema.Types.ObjectId,
        
    },
    id_chapter:{
        type: Schema.Types.ObjectId,
       
    }
    
},
{timestamps:true}
)

const imgComic = mongoose.model('imgComic',imgComicSchema)
module.exports = imgComic