const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const multer = require("multer");
var rformat = require('./utils/response-formater');
var rcode = require('./utils/response-code');

global.__root = __dirname + '/';
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/public/images', express.static(__root + 'public/images/'));
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
}).single("image");

app.post('/upload', upload, function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.file);
  if (!req.file) {
      console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Unable to upload post`));
      return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Unable to upload post`))
  } else {
      console.log(req.file.filename)
      var imgsrc =  req.file.filename
      return res.status(rcode.OK).json(rformat.success(imgsrc));
  }

})

app.get('/newsdekho/api', function (req,res) {
    res.status(200).send('API WORKS');
});
// app.use('/api/blog', require('./articles/article.controler'));

var postController = require(__root + 'post/post.controler');
app.use('/newsdekho/api/post', postController);

var brandController = require(__root + 'brand/brand.controler');
app.use('/newsdekho/api/brand', brandController);

var gossipController = require(__root + 'gossip/gossip.controler');
app.use('/newsdekho/api/gossip', gossipController);

var billboardController = require(__root + 'billboard/billboard.controler');
app.use('/newsdekho/api/billboard', billboardController);

var pollController = require(__root + 'poll/poll.controler');
app.use('/newsdekho/api/poll', pollController);

var articleController = require(__root + 'articles/article.controler');
app.use('/newsdekho/api/article', articleController);

// app.use(require('./articles/article.controler'));

var validationController = require(__root + 'validation/validation.controler');
app.use('/newsdekho/api/author', validationController);

var adminController = require(__root + 'admin/admin.controler');
app.use('/newsdekho/api/admin', adminController);

// var pollControler = require(__root + 'poll/poll.controler');
// app.use('/newsdekho/api/poll', pollControler);

module.exports.app=app;
module.exports.upload = upload;