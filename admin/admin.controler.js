var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var AdminModel = require('./admin.model').AdminModel;
var bcrypt = require('bcryptjs');
var config = require('../auth/config');
var jwt = require('jsonwebtoken');
const { response } = require('express');
var Authenticate =require('../auth/authenticate');


router.post('/signin', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(rcode.INTERNAL_SERVER_500).json.apply(rformat.failure('Email or password is missing'))
    }
    AdminModel.getAdmin(email)
        .then((admin) => {
                if(!admin) {
                    return res.status(rcode.NOT_FOUND).json(rformat.failure('Invalid username or password!'))
                }
                bcrypt.compare(password, admin.password)
                    .then((matched) => {
                        if (!matched) {
                            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure('Invalid passowrd!'));                 
                        }
                        const {_id, name, email } = admin;
                        const token = jwt.sign({ _id: _id }, config.JWT_SECRET);
                        return res.status(rcode.OK).json(rformat.success({ token: token, admin: { _id: _id, name: name, email: email}}));
                    })
        })
})
    .options('/signin', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.post('/signup', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(rcode.INTERNAL_SERVER_500).json.apply(rformat.failure('Some fields are missing'))
    }
    AdminModel.getAdmin(email)
        .then((admin) => {
                if(admin) {
                    return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure('Admin with same email Id is already exists!'))
                }
                bcrypt.hash(password, 12)
                    .then((hashedpassword) => {
                        let admin = {
                            name: name,
                            email: email,
                            password: hashedpassword
                        }
                        let currentUser = "";
                        AdminModel.craeteResource(admin, currentUser)
                            .then((result) => {
                                return res.status(rcode.OK).json(rformat.successMsg(`Admin registered successfully`));
                            })
                    })
        })
})
    .options('/signup', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/isAdmin',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("login verification");
    let currentUser=req.author;
    const {isAdmin } = currentUser;
    return res.status(rcode.OK).json(rformat.success({ isAdmin: isAdmin}));       
})
    .options('/isAdmin', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/poll/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var pollId = req.params.id
    AdminModel.deleteResource(pollId)
        .then((poll) => {
            return res.status(rcode.OK).json(rformat.success(poll));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the poll ${error}`));
        })
})
    .options('/poll/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/post/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.params.id
    AdminModel.deleteResource(postId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the post ${error}`));
        })
})
    .options('/post/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/approve',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.body._id;
    AdminModel.approvePost(postId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to approve the post ${error}`));
        })
})
    .options('/approve', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/unapprove',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.body._id;
    AdminModel.unapprovePost(postId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to unapprove the post ${error}`));
        })
})
    .options('/unapprove', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.post('/newsletter',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var content = req.body;
    AdminModel.sendNewsLetter(content)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.successMsg('News letters have been sent sucessfully'));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to send news letter ${error}`));
        })
})
    .options('/newsletter', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

module.exports = router;