var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var billboardModel = require('./billboard.model').BillboardModel;
var Authenticate =require('../auth/authenticate');

router.post('/', Authenticate,function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.body) {
        let currentUser=req.author;
        billboardModel.craeteResource(req.body, currentUser, 'billboard')
        .then((result) => {
            return res.status(rcode.OK).json(rformat.successMsg(`billboard created successfully!`))
        }).catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to create billboard ${error}`))
        })
    } else {
        console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Invalid payload for billboard`));
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Invalid payload for billboard`))
    }

})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    billboardModel.getBillboards()
        .then((billboard) => {
            return res.status(rcode.OK).json(rformat.success(billboard));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the billboards ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/raw', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    billboardModel.getResource(true, 'billboard')
        .then((billboards) => {
            return res.status(rcode.OK).json(rformat.success(billboards));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the billboards ${error}`));
        })
})
    .options('/raw', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    })

router.get('/size/:size', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var billboardSize = req.params.size
    billboardModel.getBillboardBySize(billboardSize)
        .then((billboards) => {
            return res.status(rcode.OK).json(rformat.success(billboards));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the billboards ${error}`));
        })
})
    .options('/size/:size', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });


router.get('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var billboardId = req.params.id
    billboardModel.getBillboardById(billboardId)
        .then((billboard) => {
            return res.status(rcode.OK).json(rformat.success(billboard));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the billboard ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var billboardId = req.params.id
    billboardModel.deleteResource(billboardId)
        .then((billboard) => {
            return res.status(rcode.OK).json(rformat.success(billboard));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the billboard ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });



router.put('/approve', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var billboardId = req.body._id;
    billboardModel.approveBillboard(billboardId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to approve the billboard ${error}`));
        })
})
    .options('/approve', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/unapprove', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var billboardId = req.body._id;
    billboardModel.unapproveBillboard(billboardId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to unapprove the billboard ${error}`));
        })
})
    .options('/unapprove', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var billboardId = req.params.id;
    let currentUser=req.author;
    billboardModel.updateResource(billboardId,req.body, currentUser)
        .then((billboard) => {
            return res.status(rcode.OK).json(rformat.success(billboard));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the billboard ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

module.exports = router;