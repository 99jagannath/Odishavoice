const BaseResource = require('../common/base.resource');
const mongoose = require('mongoose');
const collection = mongoose.model('Author');
const dbModel = require('../database/database.model');
const {AUTH_TOKEN, SID, PHN_NO} = require('../auth/config');
const twilio = require("twilio")(SID, AUTH_TOKEN);

class ValidationModel extends BaseResource {
    
    constructor() {
        super(collection);
    }

    sendNotification(email,otp) {
        let reciever = "+91"+email;
        return new Promise(function (resolve, reject) {
            twilio.messages.create({
                from: PHN_NO,
                to: reciever,
                body: otp
            }).then((result) => {
                console.log("msg sent");
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    setExpary(author, resetToken, expireToken) {
        console.log("set expiry")
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, author._id, {resetToken: resetToken,expireToken: expireToken})
                .then((result) =>{
                    console.log(result);
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
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

    getCheckedAuthor() {
        return new Promise(function (resolve, reject) {
            dbModel.find(collection, {term: "checked"})
                .then((result) =>{
                    
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    getresetAuthor(otp) {
        return new Promise(function (resolve, reject) {
            dbModel.findOne(collection, {resetToken:otp,expireToken:{$gt:Date.now()}})
                .then((result) =>{
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                })
        })
    }

    updatePassword(author, password) {
        return new Promise(function (resolve, reject) {
            dbModel.findByIdAndUpdateElement(collection, author._id, {password: password})
            .then((post) =>{
                return resolve(post);
            })
            .catch((error) => {
                return reject(error);
            })
                

        })
    }

    makeAdmin(email) {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.getAuthor(email)
                .then((author) => {
                    dbModel.findByIdAndUpdateElement(collection, author._id, {isAdmin: true})
                    .then((post) =>{
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
    }

    removeAdmin(email) {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.getAuthor(email)
                .then((author) => {
                    dbModel.findByIdAndUpdateElement(collection, author._id, {isAdmin: false})
                    .then((post) =>{
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