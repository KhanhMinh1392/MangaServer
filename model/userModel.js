const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const bcrypt = require('bcryptjs')

const UserSchema= new Schema({
    name :{
        type: String
    },
    email:{
        type : String,
        required:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type: String,
        // required:true
    },
    password:{
        type:String,
        required:true
    },
},
{timestamps:true}
)

const User = mongoose.model('User',UserSchema)
module.exports = User