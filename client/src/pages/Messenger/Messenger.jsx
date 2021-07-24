import  "./messenger.css"
import Topbar from '../../component/TopBar/Topbar'
import Conversation from "../../component/conversations/conversation"
import Message from "../../component/Message/Message"
import ChatOnline from "../../component/chatOnline/ChatOnline"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios";
import {io} from "socket.io-client";



function Messenger() {

    const [conversations,setConversations]=useState([]);
    const [currentChat,setCurrentChat]=useState(null);
    const [messages,setMessages]=useState([]);
    const [newMessages,setNewMessages]=useState("");
    const [arrivalMessages,setArrivalMessages]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const socket=useRef();
    const {user} =useContext(AuthContext);
    const scrollRef= useRef();
    

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket.current.on("getMessage", (data)=>{
            setArrivalMessages({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) && setMessages( prev =>[...prev,arrivalMessages]) ;
        
    }, [arrivalMessages,currentChat]);

    useEffect(() => {
 
        socket.current.emit("addUser",user._id);

        socket.current.on("getUsers",(users)=>{
            console.log(users);
         setOnlineUsers(user.followings.filter((f) => users.some((u)=> u.userId === f)));
        });

    }, [user])

    useEffect(() => {
        const getConversations= async()=>{
            try {
                const res= await axios.get("/conversations/"+user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        getConversations();
    }, [user])


    useEffect(() => {
       const getMessages= async()=>{
           try {
               const res= await axios.get("/messages/"+currentChat?._id);
               setMessages(res.data);

           } catch (error) {
               console.log(error);
           }
       }

       getMessages();
    }, [currentChat]);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const message={
            sender:user._id,
            text:newMessages,
            ConversationId:currentChat._id
        }


        const receiverId= currentChat.members.find(member=> member !== user._id);

        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newMessages
        })

        try {
            const res= await axios.post("/messages",message);
            setMessages([...messages,res.data]);
            setNewMessages("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
     }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeHolder="Search for Friends" className="chatMenuInput"/>
                        {conversations.map((c)=>{
                            return (<div onClick={()=>setCurrentChat(c)}>

                            <Conversation conversation={c} currentUser={user} />
                            </div>);
                        })}
                    </div>
                </div>
                <div className="chatBox">
                    {currentChat?
                    <>
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            { messages.map((m)=>{
                                return (<div ref={scrollRef}>
                                <Message message={m} own={ m.sender === user._id}/>

                                </div>);
                            })}
                        </div>
                        <div className="chatBoxBottom ">
                            <textarea value={newMessages} onChange={(e)=>setNewMessages(e.target.value)} className="chatMessageInput" placeholder="Write your message....">
                            </textarea>
                            <button  onClick={handleSubmit} className="chatSubmitButton">Send</button>
                        </div>
                    </div>
                    </>:<span className="noConversationText">Open Conversation to start chating</span>}
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline  onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
