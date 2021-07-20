import axios from 'axios';
import { useEffect, useState } from 'react';
import './conversation.css' 

function Conversation({conversation,currentUser}) {
    const [user,setUser]=useState({});

    useEffect(() => {
        const friendId= conversation.members.find((m)=> m!==currentUser._id);

        const getFriend= async()=>{
            try {
                const res = await axios.get("/users?userId="+friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getFriend();
    }, [conversation,currentUser])
    return (
        <div className="conversation">
            <img className="conversationImg" src={user.profilePicture ? user.profilePicture: `https://ui-avatars.com/api/?name=${user.username}`} alt=""/>
            <span className="conversationName">{user.username}</span>
        </div>
    )
}

export default Conversation;
