var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var ValidationModel = require('./validation.model').ValidationModel;
var bcrypt = require('bcryptjs');
var config = require('../auth/config');
var jwt = require('jsonwebtoken');
var Authenticate =require('../auth/authenticate');


router.post('/signin', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const {email, password} = req.body;
    console.log(email)
    console.log(password)
    if (!email || !password) {
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure('Email or password is missing'))
    }
    ValidationModel.getAuthor(email)
        .then((author) => {
                if(!author) {
                    return res.status(rcode.NOT_FOUND).json(rformat.failure('Invalid username or password!'))
                }
                bcrypt.compare(password, author.password)
                    .then((matched) => {
                        if (!matched) {
                            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure('Invalid passowrd!'));                 
                        }
                        const {_id, name, email,isAdmin, bookmarks } = author;
                        const token = jwt.sign({ _id: _id }, config.JWT_SECRET);
                        return res.status(rcode.OK).json(rformat.success({ token: token, author: { _id: _id, name: name, email: email, bookmarks: bookmarks, isAdmin: isAdmin}}));
                    })
        })
})
    .options('/signin', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.post('/jagannath/makeadmin', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("called");
    let {email} = req.body;
    ValidationModel.makeAdmin(email)
        .then((authors) => {
            return res.status(rcode.OK).json(rformat.success({ authors: authors}));

        })
})
    .options('/jagannath/makeadmin', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.post('/jagannath/removeadmin', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("called");
    let {email} = req.body;
    ValidationModel.removeAdmin(email)
        .then((authors) => {
            return res.status(rcode.OK).json(rformat.success({ authors: authors}));

        })
})
    .options('/jagannath/removeadmin', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.post('/signup', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure('Some fields are missing'))
    }
    ValidationModel.getAuthor(email)
        .then((author) => {
                console.log(author);
                if(author) {
                    return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure('Author with same email Id is already exists!'))
                }
                bcrypt.hash(password, 12)
                    .then((hashedpassword) => {
                        let author = {
                            name: name,
                            email: email,
                            password: hashedpassword
                        }
                        let currentUser = req.user;
                        console.log(author);
                        console.log(currentUser);
                        ValidationModel.craeteResource(author, currentUser)
                            .then((result) => {
                                return res.status(rcode.OK).json(rformat.successMsg(`Author registered successfully`));
                            })
                    })
        })
})
    .options('/signup', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    });

    router.put('/bookmark', Authenticate, function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        var postId = req.body._id;
        var userId = req.author._id;
        console.log(postId)
        console.log(userId);
        ValidationModel.bookmarkPost(postId, userId)
            .then((post) => {
                return res.status(rcode.OK).json(rformat.success(post));
            })
            .catch((error) => {
                return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to like the post ${error}`));
            })
    })
        .options('/bookmark', function (req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
        });
    
    router.put('/unbookmark', Authenticate, function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        var postId = req.body._id;
        var userId = req.author._id;
        ValidationModel.unBookmarkPost(postId, userId)
            .then((post) => {
                return res.status(rcode.OK).json(rformat.success(post));
            })
            .catch((error) => {
                return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to unike the post ${error}`));
            })
    })
        .options('/unbookmark', function (req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
        });

module.exports = router;