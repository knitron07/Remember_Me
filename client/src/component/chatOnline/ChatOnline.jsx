import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css"

function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
    const [friends,setFriends]=useState([]);
    const [onlineFriends,setOnlineFriends]=useState([]);
    

    useEffect(() => {
        const getFriends = async ()=>{
            const res = await axios.get("/users/friends/"+currentId);
            setFriends(res.data);
        }

        getFriends();
    }, [currentId]);
    
    useEffect(() => {
        setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)));

    }, [friends,onlineUsers]);
    
    const handleClick=async (user)=>{
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
          } catch (err) {
            console.log(err);
          }
    }
    
    return (
        <div className="chatOnline">
        {onlineUsers.map((o)=>{
            <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={o.profilePicture ? o.profilePicture: `https://ui-avatars.com/api/?name=${o.username}`} alt=""/>
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">{o.username} </span>
            </div>   
        })}
        </div>
    )
}

export default ChatOnline;
