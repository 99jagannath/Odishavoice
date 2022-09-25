const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Brand');
const dbModel = require('../database/database.model')
class BrandModel extends BaseResource {
    
    constructor() {
        super(collection);
    }
    getBrands() {
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

    getbrandById(_id) {
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

    approvebrand(brandId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, brandId, {status: 'approved'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

    unapprovebrand(brandId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, brandId, {status: 'pending'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }
}

module.exports.brandModel = new BrandModel();