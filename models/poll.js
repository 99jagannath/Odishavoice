const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Author = mongoose.model('Author');
const pollScheam = new mongoose.Schema({
    qsn:{
        type: String,
        required: true
    },
    op1:{
        type: String,
        required: true
    },
    op2:{
        type: String,
        required: true
    },
    op3:{
        type: String,
        required: true
    },
    op4:{
        type: String,
        required: true
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
    status:{
        type: String,
        default: 'pending'
    },
    createdBy:{
        type:ObjectId,
        ref:"Author"
     }

},{timestamps:true})
mongoose.model("Poll",pollScheam);