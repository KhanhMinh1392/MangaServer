
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatisicSchema = new Schema({
    like:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    rating:{
        type:Number,
    },
    views:{
        type:Number,
    }
},
{timestamps:true}
)
const Statisic = mongoose.model('Statisic',StatisicSchema)
module.exports= Statisic