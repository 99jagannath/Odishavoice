const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Post');
const dbModel = require('../database/database.model')
class PollModel extends BaseResource {
    
    constructor() {
        super(collection);
    }

    getLatestPoll() {
        return new Promise(function (resolve, reject) {
            dbModel.findLastInserted(collection)
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    votePoll(pollId, option, answer, currentUser) {
        const self = this;
        answer = Number(answer);
        let key ={};
        if(option == '1') {
           key = {ans1: answer+1}
        }else if(option == '2') {
            key = {ans2: answer+1}

        }else if(option == '3') {
            key = {ans3: answer+1}
        }else {
            key = {ans4: answer+1}
        }
        return new Promise(function (resolve, reject) {
            self.getPollById(pollId)
            .then((poll) => {
                let vote_arr = poll.vote;
                if(vote_arr.includes(currentUser._id)) {
                    return resolve(poll);
                }
                let f_key = {$push: {vote: currentUser._id}}
                dbModel.findByIdAndUpdateElement(collection, pollId, key, true)
                    .then((post) => {
                        dbModel.findByIdAndUpdateElement(collection, pollId, f_key, true)
                    .then((post) => {
                        return resolve(post);
                    })
                    .catch((error) => {
                        return reject(error);
                    })
                    })
                    .catch((error) => {
                        return reject(error);
                    })
            })
            
        })
    }

    getPollById(_id) {
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

    deletePoll(pollId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, pollId, {status: deteted})
                .then((post) => {
                    return resolve(post);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }
    approvePoll(pollId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, pollId, {status: 'approved'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

    unapprovepoll(pollId) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, pollId, {status: 'pending'}, true)
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            }) 
        })
    }

}

module.exports.PollModel = new PollModel();