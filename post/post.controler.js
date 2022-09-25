var express = require('express');
var router = express.Router();
var rformat = require('../utils/response-formater');
var rcode = require('../utils/response-code');
var PostModel = require('./post.model').PostModel;
var Authenticate =require('../auth/authenticate');
var app_init = require('../app');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', Authenticate,  function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.body) {
        
        let currentUser=req.author;
        console.log(req.author);
        PostModel.craeteResource(req.body, currentUser)
        .then((result) => {
            console.log('Post created successfully');
            return res.status(rcode.OK).json(rformat.successMsg(`post created successfully!`))
            
        //     let notificationContent = 'notificaion details';
        //     PostModel.sendNotication(notificationContent)
        //         .then((result) => {
        //             return res.status(rcode.OK).json(rformat.successMsg(`notification send successfully!`))
        //         })
        //         .catch((error) => {
        //             return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Failed to send notifaction ${error}`))
        //         })
            
        }).catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to create post ${error}`))
        })
    } else {
        console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Invalid payload for post`));
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Invalid payload for Post`))
    }

})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });



router.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    PostModel.getposts()
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the post ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/raw', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    PostModel.getResource(true)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the post ${error}`));
        })
})
    .options('/raw', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

    router.get('/authorpost',Authenticate, function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        let currentUser=req.author;
        PostModel.filterPost({createdBy: currentUser._id, status: {$ne: "deteted"} })
            .then((post) => {
                return res.status(rcode.OK).json(rformat.success(post));
            })
            .catch((error) => {
                return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the post ${error}`));
            })
    })
        .options('/authorpost', function (req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
        });

router.get('/hashtags', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    PostModel.getHashTags()
        .then((hashtags) => {
            return res.status(rcode.OK).json(rformat.success(hashtags));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the post ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/category/:category', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var category = req.params.category;
   let key = {
        category: category,
        status: 'approved'
    }
    PostModel.filterPost(key)
        .then((posts) => {
            return res.status(rcode.OK).json(rformat.success(posts));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch category ${category} posts ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/tag/:tag', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var tag = "#"+req.params.tag;


    let key = {
        hashtags: { 
            $elemMatch: {$eq:tag}
        },
        status: 'approved'
    }
    console.log(key);
    PostModel.filterPost(key)
        .then((posts) => {
            console.log(posts)
            return res.status(rcode.OK).json(rformat.success(posts));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch tag ${tag} posts ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/type/:type', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var type = req.params.type;
    let key = {
        type: type,
        status: 'approved'
    }
    console.log(key);
    PostModel.filterPost(key)
        .then((posts) => {
            console.log(posts.length)
            return res.status(rcode.OK).json(rformat.success(posts));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch option ${type} posts ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.get('/search', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    let tagPattern = new RegExp("^"+req.body.query)
    PostModel.searchpost(tagPattern)
        .then((posts) => {
            return res.status(rcode.OK).json(rformat.success(posts));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to search posts ${error}`));
        })
})
    .options('/', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });


router.get('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.params.id;
    PostModel.getPostById(postId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the post ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.delete('/:id', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.params.id;
    PostModel.deletePost(postId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to delete the post ${error}`));
        })
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/like', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.body._id;
    var userId = req.author._id;
    console.log(postId)
    console.log(userId);
    PostModel.likePost(postId, userId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to like the post ${error}`));
        })
})
    .options('/like', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/unlike', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.body._id;
    var userId = req.author._id;
    PostModel.unLikePost(postId, userId)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to unike the post ${error}`));
        })
})
    .options('/unlike', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/view', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var postId = req.body._id;
    PostModel.getPostById(postId)
        .then((post) => {
            var currentViews = post['views'] + 1;
            PostModel.viewPost(postId, currentViews)
                .then((result) => {
                    return res.status(rcode.OK).json(rformat.success(result));
                })
                .catch((error) => {
                    return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to view the post ${error}`));
                })
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to fetch the post ${error}`));
        })
})
    .options('/view', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });

router.put('/:id', Authenticate, function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log('hiting hear');
    var postId = req.params.id;
    let currentUser=req.author;
    if (req.body) {
        PostModel.updateResource(postId, req.body, currentUser)
        .then((post) => {
            return res.status(rcode.OK).json(rformat.success(post));
        })
        .catch((error) => {
            return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Fail to update the post ${error}`));
        })
    } else {
        console.log(rcode.INTERNAL_SERVER_500, rformat.failure(`Invalid payload for post`));
        return res.status(rcode.INTERNAL_SERVER_500).json(rformat.failure(`Invalid payload to update the post ${error}`));
    }
})
    .options('/:id', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'content-type, x-access-token');
    });
module.exports = router;