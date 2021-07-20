const router =require("express").Router();
const Messages = require("../models/Messages");

//add

router.post("/",async(req,res)=>{
    const newMessage=new Messages(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
});
//get messages
router.get("/:conversationId",async(req,res)=>{
    try {
        const messages = await Messages.find({
            ConversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports=router;