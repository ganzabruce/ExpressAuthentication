const mongoose = require('mongoose')
const conn = process.env.DB
 
const Schema = mongoose.Schema
const adminSchema = new Schema({  
    name: { type: String, required: true },  
    password: { type: String, required: true },  
    role: {   
        type: String,   
        enum: ['admin', 'editor', 'viewer'], 
        default: 'admin', 
        required: true   
    }  
}); 

const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin