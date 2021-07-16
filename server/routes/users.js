const Users = require("../models/User");
const router = require("express").Router();
const bcrypt=require("bcrypt");


//Update user
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password)
        {
            try {
                const salt= await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password,salt);
            } catch (error) {
                return res.status(500).json(error); 
            }
        }

        try {
            const user=await Users.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("your account has been updated");
        } catch (error) {
            return res.status(500).json(error); 
        }
    }else{
        return res.status(403).json("you can update only your account!");
    }
});


//Delete user
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user=await Users.findByIdAndDelete(req.params.id);
            res.status(200).json("your account has been deleted");
        } catch (error) {
            return res.status(500).json(error); 
        }
    }else{
        return res.status(403).json("you can delete only your account!");
    }
});

//Get a user
router.get("/", async (req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    try {
        const user = userId? await Users.findById(userId) : await Users.findOne({username:username});
        const {password,...others}=user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);        
    }
});

// get User's friend
router.get("/friends/:userId", async(req,res)=>{
    try {
        const user = await Users.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return Users.findById(friendId);
            })
        );
        
        const friendList= await friends.map((friend)=>{
            const {_id,username,profilePicture}=friend;
            return {_id,username,profilePicture}
        });

        res.status(200).json(friendList);

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//follow a user
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id)
    {
        try {
            const user = await Users.findById(req.params.id);
            const currentUser=await Users.findById(req.body.userId);
            
            console.log(1);
            if(!user.followers.includes(req.body.userId))
            {
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("user has been followed");
            }
            else
            {
                res.status(403).json("user has already been followed")
            }
        } catch (error) {
            res.status(403).json(error);
        }
    }
    else
    {
        res.status(403).json("you can't follow yourself")
    }
});

//unfollow a user
router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id)
    {
        try {
            const user = await Users.findById(req.params.id);
            const currentUser=await Users.findById(req.body.userId);
            
            console.log(1);
            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("user has been unfollowed");
            }
            else
            {
                res.status(403).json("you dont follow this user")
            }
        } catch (error) {
            res.status(403).json(error);
        }
    }
    else
    {
        res.status(403).json("you can't unfollow yourself")
    }
});


 module.exports=router;