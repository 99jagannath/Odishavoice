const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Post');
const dbModel = require('../database/database.model');

class AdminModel extends BaseResource {
    
    constructor() {
        super(collection);
    }

    getAdmin(email) {
        return new Promise(function (resolve, reject) {
            dbModel.findOne(collection, {email: email})
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    approvePost(postId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, postId, {status: 'approved'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

    unapprovePost(postId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, postId, {status: 'pending'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

}

module.exports.AdminModel = new AdminModel();