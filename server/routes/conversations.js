const router =require("express").Router();
const Conversations = require("../models/Conversations")

//new Conversations.
router.post("/",async(req,res)=>{
 const newConversations= new Conversations({
     members:[req.body.senderId,req.body.receiverId]
 });

 try {
     const savedConversation= await newConversations.save();
     res.status(200).json(savedConversation);

 } catch (error) {
     res.status(200).json(error);
 }
});

router.get("/:userId",async(req,res)=>{
    try {
        const Conversation= await Conversations.find({
            members:{$in:[req.params.userId]}
        });
        res.status(200).json(Conversation);
   
    } catch (error) {
        res.status(200).json(error);
    }
   });
//get user conservation   
module.exports=router;