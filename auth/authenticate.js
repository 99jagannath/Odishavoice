var jwt = require('jsonwebtoken');
var config = require('./config');
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var ValidationModel = require('../validation/validation.model').ValidationModel;

function Authenticate(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(rcode.UNAUTHORIZED).json(rformat.failure(`No token provided`));
    }

    jwt.verify(token, config.JWT_SECRET, function(error, decodedId) {
        if (error) {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to Authenticate ${error}`));
        }
        ValidationModel.getAuthorById(decodedId)
            .then((author) => {
                author.password = undefined;
                req.author = author;
                next();
            })
            .catch((error) => {
                console.log("Unable to fetch author's details");
                return res.status(rcode.UNAUTHORIZED).json(rformat.failure(`Unable to fetch author's details ${error}`));
            })
        
        
    });
}

module.exports = Authenticate;