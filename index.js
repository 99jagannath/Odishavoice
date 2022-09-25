var mongoDB = require('./mongodb.connection');
const port =process.env.PORT || 5000;

var initialize = async function () {
    console.log('Initializing momgoDB ......')
    await mongoDB.initialize();
    console.log('Mongo DB initializrd.')
}

var init = async function () {
    await initialize();

    var app_init = require('./app');
    app_init.app.listen(port, function() {
        console.log('Express server is listening on port ' + port);
    })
}

init();