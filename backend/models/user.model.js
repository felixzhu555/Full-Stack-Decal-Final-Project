const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    username: {
        type:String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password:{
        type:String,
        required:true,
        minlength: 3
    },
    group:[Schema.Types.Mixed],
    
})

const User = mongoose.model("User", userSchema)

module.exports = User