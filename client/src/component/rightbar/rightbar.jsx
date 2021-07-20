import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../Context/AuthContext";


function Rightbar({user}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends]=useState([]);
    
    const {user:currentUser,dispatch}=useContext(AuthContext);
    const [isFollowed,setisFollowed]=useState(currentUser.followings.includes(user?._id));
    

    useEffect(() => {
        const getFriends= async ()=>{
            const res = await axios.get("/users/friends/"+user._id);
            setFriends(res.data);
        }
        
         user && getFriends();
    },[user])
    
    const handleClick=async()=>{
        try {
            if(isFollowed){
                await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }else{
                await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }
        } catch (error) {
            console.log(error);
        }

        setisFollowed(!isFollowed);
    }


    const HomeRightbar=()=>{
        return(
        <>
            <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText"> none of your friend have birthday today</span>
            </div>
                <img className="rightbarAd" src="/assets/ad.png" alt=""/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map( singleUser=>{
                        return <Online key={singleUser.id} user={singleUser} />
                    })}
                </ul>
        </>
        );
    }
    const ProfileRightbar= ()=>{
        return  (
        <>
            {   user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                  {isFollowed ? "Unfollow" : "Follow"}
                  {isFollowed ? <Remove /> : <Add />}
                </button>
            )}
            <h4 className="rightbarprofileTitle"> User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfovalue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfovalue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship Status:</span>
                    <span className="rightbarInfovalue">{user.relationship}</span>
                </div>
            </div>

            <h4 className="rightbarprofileTitle"> User friends</h4>
            <div className="rightbarFollowings">
                {friends.map((friend)=>{

                    return (
                        <Link to={'/profile/'+friend.username} style={{textDecoration:"none",color:"black"}}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? PF+friend.profilePicture:`https://ui-avatars.com/api/?name=${friend.username}`}  className="rightbarFollowingImg"/>
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                            );
                })}
                
            </div>
        </>
        );
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar />:<HomeRightbar/>}
            </div>
        </div>
    )
}

export default Rightbar
