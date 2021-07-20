import  "./messenger.css"
import Topbar from '../../component/TopBar/Topbar'
import Conversation from "../../component/conversations/conversation"
import Message from "../../component/Message/Message"
import ChatOnline from "../../component/chatOnline/ChatOnline"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios";
function Messenger() {
    const [conversations,setConversations]=useState([]);
    const [currentChat,setCurrentChat]=useState(null);
    const [messages,setMessages]=useState([]);
    const [newMessages,setNewMessages]=useState("");
    const {user} =useContext(AuthContext);
    

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
    }, [user._id])


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
    }, [currentChat])

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
                                return (<Message message={m} own={ m.sender === user._id}/>);
                            })}
                        </div>
                        <div className="chatBoxBottom ">
                            <textarea value={newMessages} onChange={(e)=>setNewMessages(e.target.value)} className="chatMessageInput" placeholder="Write your message....">
                            </textarea>
                            <button className="chatSubmitButton">Send</button>
                        </div>
                    </div>
                    </>:<span className="noConversationText">Open Conversation to start chating</span>}
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
