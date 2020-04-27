const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
   
},{
    timestamps:{
        type:String,
        required:true
    }
}
)


const User = model('User',userSchema)


module.exports = User