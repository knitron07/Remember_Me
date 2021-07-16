// eslint-disable-next-line react-hooks/rules-of-hooks
import "./feed.css"
import {useState,useEffect, useContext} from "react";
import Share from "../share/share.jsx";
import Post from "../Post/post";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function Feed({username}) {
    
    const [posts,setPosts]=useState([]);
    const {user} =useContext(AuthContext)
    useEffect(()=>{
        const fetchPosts=async ()=>{
            const response= username? await axios.get("/posts/profile/"+username):await axios.get("posts/timeline/"+user._id);
            setPosts(response.data.sort((p1,p2)=>{
               return new Date(p2.createdAt)-new Date(p1.createdAt); 
            }));
        }

        fetchPosts();
    },[username,user._id]);
    
    return (
        <div className="feed">
           <div className="feedWrapper">
               {(!username || (username === user.username)) && <Share />} 
                {posts.map((singlePost)=>{
                   return (<Post key={singlePost._id} postData={singlePost}/>);
                })}
           </div>
        </div>
    )
}

export default Feed
