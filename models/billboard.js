const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Author = mongoose.model('Author');
const billboardScheam = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'pending'
    },
    createdBy:{
        type:ObjectId,
        ref:"Author"
     }

},{timestamps:true})
mongoose.model("Billboard",billboardScheam);