// eslint-disable-next-line react-hooks/rules-of-hooks
import "./feed.css"
import {useState,useEffect} from "react";
import Share from "../share/share.jsx";
import Post from "../Post/post";
import axios from "axios";

function Feed({username}) {
    
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts=async ()=>{
            const response= username? await axios.get("/posts/profile/"+username):await axios.get("posts/timeline/60ec2f33cda1592db087efc4");
            setPosts(response.data);
        }

        fetchPosts();
    },[username]);
    return (
        <div className="feed">
           <div className="feedWrapper">
                <Share />
                {posts.map((singlePost)=>{
                   return (<Post key={singlePost._id} postData={singlePost}/>);
                })}
           </div>
        </div>
    )
}

export default Feed
