const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Author = mongoose.model('Author');
const postScheam = new mongoose.Schema({
    title:{
        type: String
    },
    subtitle:{
        type: String
    },
    body:{
        type: String
    },
    photo:{
        type: []
    },
    caption:{
        type: String
    },
    location:{
        type: String
    },
    category:{
        type: String
    },
    type:{
        type: String
    },
    hashtags:{
        type: []
    },
    bussinessLink:{
        type: String
    },
    views:{
        type: Number,
        default: 0
    },
    qsn:{
        type: String
    },
    op1:{
        type: String
    },
    op2:{
        type: String
    },
    op3:{
        type: String
    },
    op4:{
        type: String
    },
    ans1:{
        type: Number,
        default: 0
    },
    ans2:{
        type: Number,
        default: 0
    },
    ans3:{
        type: Number,
        default: 0
    },
    ans4:{
        type: Number,
        default: 0
    },
    pic:{
        type: String
    },
    cover:{
        type: String
    },
    size:{
        type: String
    },
    mode:{
        type: String
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