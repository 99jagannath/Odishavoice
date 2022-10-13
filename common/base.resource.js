const dbModel = require('../database/database.model');

class BaseResource {
    constructor(collection) {
        this.collection = collection;
    }

    craeteResource(payload, currentUser={}, mode= null) {
        const self = this;
        return new Promise(function (resolve, reject) {
            payload['createdBy'] = currentUser;
            payload['mode'] = mode;
            dbModel.insert(self.collection, payload)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    getResource(populate=false, mode=null) {
        const self = this;
        const key ={mode: mode};
        return new Promise(function (resolve, reject) {
            dbModel.find(self.collection,key,populate)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    updateResource(resourceId, payload, currentUser='') {
        const self = this;
        return new Promise(function (resolve, reject) {
            payload['createdBy'] = currentUser;
            dbModel.findByIdAndUpdate(self.collection, resourceId, payload)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    deleteResource(resourceId) {
        const self = this;
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndRemove(self.collection, resourceId)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }
}

module.exports = BaseResource;