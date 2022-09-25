var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var PollModel = require('./poll.model').PollModel;
var Authenticate =require('../auth/authenticate');


router.post('/',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    let currentUser=req.author;
    if (req.body) {
        PollModel.craeteResource(req.body, currentUser)
        .then((result) => {
            return res.status(rcode.OK).json(rformat.successMsg(`Poll created successfully!`))
        }).catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to create poll ${error}`))
        })
    } else {
        console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Invalid payload for poll`));
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Invalid payload for Poll`))
    }

})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    PollModel.getResource()
        .then((polls) => {
            return res.status(rcode.OK).json(rformat.success(polls));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the polls ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/latest', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    PollModel.getLatestPoll()
        .then((poll) => {
            return res.status(rcode.OK).json(rformat.success(poll));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the latest poll ${error}`));
        })
})
    .options('/latest', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var pollId = req.params.id
    PollModel.getPollById(pollId)
        .then((poll) => {
            return res.status(rcode.OK).json(rformat.success(poll));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the poll ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var pollId = req.params.id
    PollModel.deletePoll(pollId)
        .then((poll) => {
            return res.status(rcode.OK).json(rformat.success(poll));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the poll ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/vote/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var pollId = req.params.id
    var option = req.body.opt;
    var answer = req.body.ans;
    PollModel.votePoll(pollId, option, answer)
        .then((poll) => {
            return res.status(rcode.OK).json(rformat.success(poll));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the poll ${error}`));
        })
})
    .options('/vote/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/:id',Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var pollId = req.params.id;
    let currentUser=req.author;
    PollModel.updateResource(pollId,req.body, currentUser)
        .then((poll) => {
            return res.status(rcode.OK).json(rformat.success(poll));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the poll ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

module.exports = router;