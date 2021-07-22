const io= require("socket.io")(8900,{
  cors: {
    origin: "http://localhost:3000",
  },
});

let users=[];

const addUser= (userId,socketId)=>{
  !users.some((user)=>user.userId===userId) && users.push({userId,socketId});
};


const removerUser= (socketId)=>{
      users=  users.filter((user)=>user.socketId !== socketId);
}

const getUser=(userId)=>{
      return users.find(user=> user.userId === userId);
};

io.on("connection",(socket)=>{
  //when connected
    console.log("userconnected");


    //add user whenever a user is connected to servers
    socket.on("addUser",(userId)=>{
      
          addUser(userId,socket.id);
         
          io.emit("getUsers",users);
    });

    //
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user= getUser(senderId);
        io.to(user.socketId).emit("getMessage",{senderId,text})
    })

    //when user disconnect
    socket.on("disconnect",()=>{
      removerUser(socket.id);
      io.emit("getUsers",users);
    });
}) 