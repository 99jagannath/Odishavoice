const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const brandScheam = new mongoose.Schema({
    cover:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    map:{
        type: String,
        required: true
    },
    detail:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    owner1:{
        type: String,
        required: true
    },
    position1:{
        type: String,
        required: true
    },
    about1:{
        type: String,
        required: true
    },
    phone1:{
        type: String,
        required: true
    },
    profile1:{
        type: String,
        required: true
    },
    owner2:{
        type: String,
        required: true
    },
    position2:{
        type: String,
        required: true
    },
    about2:{
        type: String,
        required: true
    },
    phone2:{
        type: String,
        required: true
    },
    profile2:{
        type: String,
        required: true
    },
    img1:{
        type: String,
        required: true
    },
    img2:{
        type: String,
        required: true
    },
    img3:{
        type: String,
        required: true
    },
    img4:{
        type: String,
        required: true
    },
    img5:{
        type: String,
        required: true
    },
    img6:{
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
mongoose.model("Brand",brandScheam);