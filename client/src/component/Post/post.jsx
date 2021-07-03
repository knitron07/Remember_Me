/* eslint-disable react-hooks/rules-of-hooks */
import "./post.css";
import React ,{ useState } from "react";
import {MoreVert} from "@material-ui/icons";
import {Users} from "../../dummyData";
function post(props) {
     
     const [like, setLike] = useState(props.postData.like);
     const [islike, setisLike] = useState(false);
     const likehandler=()=>{
         setLike(islike? like+1:like-1);
         setisLike(!islike);
     }
    var userdetail=Users.filter(a_user=>a_user.id===props.postData.userId)[0];
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src={userdetail.profilePicture} alt=""/>
                        <span className="postUsername"> {userdetail.username}</span>
                        <span className="postDate ">{props.postData.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/> 
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText"> {props?.postData.desc}</span>
                    <img className="postImg" src={props.postData.photo} alt="" />
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
