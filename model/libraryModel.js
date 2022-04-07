const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const LibrarySchema= new Schema({
    id_user :{
        type: Schema.Types.ObjectId,
    },
    id_comic:[{
        type: Schema.Types.ObjectId,
    }],
    
},
{timestamps:true}
)

const Library = mongoose.model('Library',LibrarySchema)
module.exports = Library