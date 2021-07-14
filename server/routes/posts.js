const router =require("express").Router();
const Posts =require("../models/Post");
const Users =require("../models/User")

//Creat a post
router.post("/",async (req,res)=>{
    const newPost= new Posts(req.body);
    try {
        const savedpost= await newPost.save();
        res.status(200).json(savedpost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//update post
router.put("/:id",async(req,res)=>{
    try {
        const post = await Posts.findById(req.params.id);
        
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("your post has been updated");
        }else{
            res.status(403).json("you can update only your pust");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Like and Dislike post
router.put("/:id/like", async (req,res)=>{
    try {
        const post = await Posts.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("you like this post");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("you dislike this post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a post
router.get("/:id",async (req,res)=>{
    try {
        const post =await Posts.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get timeline posts

router.get("/timeline/:userId", async (req,res) => {
    try {
        
      const currentUser = await Users.findById(req.params.userId);
      const userPosts = await Posts.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map( async(friendId) => {
            return await Posts.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//get user's all posts

router.get("/profile/:username", async (req,res) => {
    try {
        
      const user = await Users.findOne({username:req.params.username});
      const userPosts = await Posts.find({ userId: user._id });
      
      res.status(200).json(userPosts)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router;