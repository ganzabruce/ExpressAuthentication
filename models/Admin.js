const mongoose = require('mongoose')
const conn = process.env.DB
 
const Schema = mongoose.Schema
const adminSchema = new Schema({  
    name: { type: String, required: true },  
    password: { type: String, required: true },  
    role: {   
        type: String,   
        enum: ['admin', 'editor', 'viewer'], // Specify your roles here  
        default: 'admin', // Set a default role if needed  
        required: true   
    }  
}); 

const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin