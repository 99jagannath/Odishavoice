const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const db = require('../database/database.model')

router.post("/",(req,res)=>{
    const {title, body, pic} = req.body;
    console.log(title);
    console.log(body);
    console.log(pic);
    var data = {
        title: title,
        body: body,
        photo: pic,
    }
    db.insert(Post, data)
    .then((result)=> {
        res.json({post:result});
    })
    .catch(err=>{
        console.log(err);
    })
  });

router.delete("/",(req,res)=>{

    var key = {
        title: 'title'
    }
    db.remove(Post,key)
    .then(result=>{
        res.json({post:result});
    })
    .catch(err=>{
        console.log(err);
    })
  });

module.exports = router;