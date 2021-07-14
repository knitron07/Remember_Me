/* eslint-disable react-hooks/rules-of-hooks */
import "./post.css";
import React ,{ useState,useEffect } from "react";
import {MoreVert} from "@material-ui/icons";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";


function post(props) {
    
     const [like, setLike] = useState(props.postData.likes.length);
     const [islike, setisLike] = useState(false);
     const [user, setUser] = useState({});
     const likehandler=()=>{
         setLike(islike? like+1:like-1);
         setisLike(!islike);
     }
    

    useEffect(()=>{
        const fetchUser=async ()=>{
            const response= await axios.get(`/users?userId=${props.postData.userId}`);
            setUser(response.data);
        }

        fetchUser();
    },[props.postData.userId]);

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.profilePicture ? PF+user.profilePicture: `https://ui-avatars.com/api/?name=${user.username}`} alt=""/>
                        </Link>
                        <span className="postUsername"> {user.username}</span>
                        <span className="postDate ">{format(props.postData.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/> 
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText"> {props?.postData.desc}</span>
                    <img className="postImg" src={PF+props.postData.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" onClick={likehandler} alt=""/>
                        <img className="heartIcon" src="/assets/heart.png" onClick={likehandler} alt=""/>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span clasName="postCommentText"> {props.postData.comment} comments </span>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default post
