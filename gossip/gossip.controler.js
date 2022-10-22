var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var gossipModel = require('./gossip.model').GossipModel;
var Authenticate =require('../auth/authenticate');

router.post('/', Authenticate,function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.body) {
        let currentUser=req.author;
        gossipModel.craeteResource(req.body, currentUser, 'gossip')
        .then((result) => {
            return res.status(rcode.OK).json(rformat.successMsg(`gossip created successfully!`))
        }).catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to create gossip ${error}`))
        })
    } else {
        console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Invalid payload for gossip`));
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Invalid payload for Gossip`))
    }

})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    gossipModel.getgossips()
        .then((gossips) => {
            return res.status(rcode.OK).json(rformat.success(gossips));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the gossips ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/raw', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    gossipModel.getResource(true, 'gossip')
        .then((gossips) => {
            return res.status(rcode.OK).json(rformat.success(gossips));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the gossips ${error}`));
        })
})
    .options('/raw', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });


router.get('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.params.id
    gossipModel.getgossipById(gossipId)
        .then((gossip) => {
            return res.status(rcode.OK).json(rformat.success(gossip));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the gossip ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.params.id
    gossipModel.deleteResource(gossipId)
        .then((gossip) => {
            return res.status(rcode.OK).json(rformat.success(gossip));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the gossip ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });



router.put('/approve', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.body._id;
    gossipModel.approveGossip(gossipId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to approve the gossip ${error}`));
        })
})
    .options('/approve', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/unapprove',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.body._id;
    gossipModel.unapproveGossip(gossipId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to unapprove the gossip ${error}`));
        })
})
    .options('/unapprove', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/like', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.body._id;
    var userId = req.author._id;
    gossipModel.likeGossip(gossipId, userId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to like the gossip ${error}`));
        })
})
    .options('/like', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/unlike', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.body._id;
    var userId = req.author._id;
    gossipModel.unlikeGossip(gossipId, userId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to like the gossip ${error}`));
        })
})
    .options('/unlike', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var gossipId = req.params.id;
    let currentUser=req.author;
    gossipModel.updateResource(gossipId,req.body, currentUser)
        .then((gossip) => {
            return res.status(rcode.OK).json(rformat.success(gossip));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the gossip ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

module.exports = router;