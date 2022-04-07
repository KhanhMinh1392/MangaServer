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
    role: {
        type:String,
        default: "User"
    }
},
{timestamps:true}
)

// UserSchema.pre('save',async function(next){
//     try {
//     console.log('password',this.password);
//     const salt = await bcrypt.genSalt(10)
//     console.log('pass salt',salt);

//     const passHash = await bcrypt.hash(this.password,salt)

//     console.log('pass hash',passHash);

//     this.password = passHash

//     next()
        
//     } catch (error) {
//         next(error)
        
//     }
// })
// UserSchema.method.isValidPassword = async function(newPassword){
//     try {
//        return await bcrypt.compare(newPassword,this.password)
        
//     } catch (error) {

//         throw new Error(error)
        
//     }
// }

const User = mongoose.model('User',UserSchema)
module.exports = User