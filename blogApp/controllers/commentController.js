
//import model
const Post = require("../models/postModel")
const Comment = require("../models/commentModel")

//business logic
exports.createComment = async(req , res) =>{
    try{
        //fetch data from req body
        const{post,user,body} = req.body
        // create a comment object
        const comment = new Comment({
            post,user,body
        })
        //save the new comment in DB
        const saveComment = await comment.save() ;

        //find the post by ID and add new comment
        const updatedPost = await Post.findByIdAndUpdate(post , {$push : {comments :saveComment._id}} , {new:true})
                            .populate("comments")// ye na kare to bus ids show hogi
                            .exec();
        res.json({
            post:updatedPost
        })
    }
    catch(error){
        return res.status(500).json({
            error:"Error while Creating Comment"
        })
    }
     
}