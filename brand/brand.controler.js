var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var brandModel = require('./brand.model').brandModel;
var Authenticate =require('../auth/authenticate');

router.post('/', Authenticate,function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.body) {
        let currentUser=req.author;
        brandModel.craeteResource(req.body, currentUser)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.successMsg(`brand created successfully!`))
        }).catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to create brand ${error}`))
        })
    } else {
        console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Invalid payload for brand`));
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Invalid payload for brand`))
    }

})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    brandModel.getBrands()
        .then((brands) => {
            return res.status(rcode.OK).json(rformat.success(brands));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the brands ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/raw', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    brandModel.getResource()
        .then((brands) => {
            return res.status(rcode.OK).json(rformat.success(brands));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the brands ${error}`));
        })
})
    .options('/raw', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });


router.get('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var brandId = req.params.id
    brandModel.getbrandById(brandId)
        .then((brand) => {
            return res.status(rcode.OK).json(rformat.success(brand));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the brand ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var brandId = req.params.id
    brandModel.deleteResource(brandId)
        .then((brand) => {
            return res.status(rcode.OK).json(rformat.success(brand));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the brand ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });



router.put('/approve', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var brandId = req.body._id;
    brandModel.approvebrand(brandId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to approve the brand ${error}`));
        })
})
    .options('/approve', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/unapprove', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var brandId = req.body._id;
    brandModel.unapprovebrand(brandId)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.success(result));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to unapprove the brand ${error}`));
        })
})
    .options('/unapprove', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });


router.put('/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var brandId = req.params.id;
    let currentUser=req.author;
    brandModel.updateResource(brandId,req.body, currentUser)
        .then((brand) => {
            return res.status(rcode.OK).json(rformat.success(brand));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the brand ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

module.exports = router;