const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        minLength: 3,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    virtualLink:{
        type:String,
        required: false,
    },
    className:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true,
    },
    users:[Schema.Types.Mixed],
})

const Group = mongoose.model("Group", groupSchema)

module.exports = Group