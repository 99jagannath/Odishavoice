const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Author = mongoose.model('Author');
const gossipScheam = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    likes:[{type:ObjectId,ref:"Author"}],
    status:{
        type: String,
        default: 'pending'
    },
    createdBy:{
        type:ObjectId,
        ref:"Author"
     }

},{timestamps:true})
mongoose.model("Gossip",gossipScheam);