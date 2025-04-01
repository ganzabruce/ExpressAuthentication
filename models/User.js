const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({  
    name: { type: String, required: true },  
    password: { type: String, required: true },  
    role: {   
        type: String,   
        enum: ['admin', 'editor', 'viewer'], // Specify your roles here  
        default: 'viewer', // Set a default role if needed  
        required: true   
    }  
}); 

const User = mongoose.model('User',userSchema)
module.exports = User