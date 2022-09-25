const mongoose = require('mongoose');
const {MONGOURI} = require('./auth/config');

var register_models = async function () {
    require('./models/auther');
    require('./models/post');
    require('./models/Blog');
    require('./models/gossip');
    require('./models/billboard');
    require('./models/poll');
    require('./models/brand');
}

var initialize = async function () {
    await register_models();

    mongoose.connect(MONGOURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let db = mongoose.connection
    mongoose.connection.on('connected',()=>{
        console.log('mongo is connected');
    });

    mongoose.connection.on('error',(err)=>{
        console.log('error connecting',err);
    });
    mongoose.model('Author');
}

module.exports.initialize = initialize;