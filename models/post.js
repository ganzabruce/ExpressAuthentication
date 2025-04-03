const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    postTitle: {
        type:String ,
        required: true
    },
    postBody: {
        type:String,
        required: true
    },
    createdBy:{
        type:String,
        required:true
    }
},{timestamps:true})

const post = mongoose.model('post',postSchema)
module.exports = post