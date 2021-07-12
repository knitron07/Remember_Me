const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const usersRoute = require("./routes/users");
const authRoute = require ("./routes/auth");
const postsRoute = require ("./routes/posts");
dotenv.config();

//Connecting Database
mongoose.connect("mongodb+srv://samar:samarSDSM@cluster0.vrkio.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(!error){
        console.log("connected to MONGO");
    }else{
        console.log(error);
    }
});


//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", usersRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postsRoute);

app.listen(8800,()=>{
    console.log("server is running on 8800");
});