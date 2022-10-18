const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    term:String,
    resetToken:String,
    expireToken:Date,
    bookmarks:[{type:ObjectId,ref:"Post"}],
    isAdmin:{
        type: Boolean,
        default:false,
        required: false
    }
})

mongoose.model("Author",authorSchema);