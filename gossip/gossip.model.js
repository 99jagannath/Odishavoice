const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Gossip');
const dbModel = require('../database/database.model')
class GossipModel extends BaseResource {
    
    constructor() {
        super(collection);
    }

    getgossips() {
        return new Promise(function (resolve, reject) {
            dbModel.find(collection , {status: 'approved'}, true)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    getgossipById(_id) {
        return new Promise(function (resolve, reject) {
            dbModel.findById(collection, _id, true)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    approveGossip(gossipId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, gossipId, {status: 'approved'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

    unapproveGossip(gossipId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, gossipId, {status: 'pending'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

    likeGossip(gossipId, userId){
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, gossipId, {$push: {likes: userId}}, true)
                .then((post) =>{
                    return resolve(post);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    unlikeGossip(gossipId, userId){
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, gossipId, {$pull: {likes: userId}}, true)
                .then((post) =>{
                    return resolve(post);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

 
}

module.exports.GossipModel = new GossipModel();