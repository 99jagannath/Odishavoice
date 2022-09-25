const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Author');
const dbModel = require('../database/database.model');
class ValidationModel extends BaseResource {
    
    constructor() {
        super(collection);
    }

    getAuthor(email) {
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

    getAuthorById(_id) {
        return new Promise(function (resolve, reject) {
            dbModel.findById(collection, _id)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    bookmarkPost(postId, userId){
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, userId, {$push: {bookmarks: postId}})
                .then((post) =>{
                    return resolve(post);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    unBookmarkPost(postId, userId){
        console.log("unbbokmark called");
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, userId, {$pull: {bookmarks: postId}})
                .then((post) =>{
                    return resolve(post);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }
}

module.exports.ValidationModel = new ValidationModel();