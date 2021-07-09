const router = require("express").Router();
const Users = require("../models/User")
const bcrypt = require("bcrypt");



router.post("/register", async(req,res)=>{
    
    const newUser= new Users({
        username: req.body.username,
        email:req.body.email,
        password:req.body.password
    });

    try {

        // generating hashed password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        
        //creating new user
        const newUser= new Users({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        // saving user and returning response
        const user= await newUser.save();
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post("/login", async(req,res)=>{
    try {
        const user = await Users.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
}
});

module.exports=router;