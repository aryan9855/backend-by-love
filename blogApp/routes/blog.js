const express = require("express")

const router = express.Router();

//Import Controller
const {dummyLink,likePost,unlikePost} = require("../controllers/likeController")
const {createComment} = require("../controllers/commentController")
const {createPost} = require("../controllers/postController")
const {getAllPost} = require("../controllers/postController")

//Mapping
router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);


//export
module.exports = router