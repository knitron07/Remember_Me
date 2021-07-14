import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/online";



function rightbar({user}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    
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
    const ProfileRightbar=()=>{
        return(
        <>
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
                <div className="rightbarFollowing">
                    <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/3.jpeg`} alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/4.jpeg`} alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/5.jpeg`} alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/6.jpeg`} alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
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

export default rightbar
