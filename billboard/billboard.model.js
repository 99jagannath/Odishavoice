const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Billboard');
const dbModel = require('../database/database.model')
class BillboardModel extends BaseResource {
    
    constructor() {
        super(collection);
    }

    getBillboards() {
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

    getBillboardById(_id) {
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

    getBillboardBySize(size) {
        return new Promise(function (resolve, reject) {
            dbModel.find(collection, {size: size, status: 'approved'}, true)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    approveBillboard(gossipId) {
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

    unapproveBillboard(gossipId) {
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

 
}

module.exports.BillboardModel = new BillboardModel();