const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Author = mongoose.model('Author');
const postScheam = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    hashtags:{
        type: [],
        required: true
    },
    bussinessLink:{
        type: String,
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default: 'pending'
    },
    likes:[{type:ObjectId,ref:"Author"}],
    createdBy:{
        type:ObjectId,
        ref:"Author"
     }

},{timestamps:true})
mongoose.model("Post",postScheam);