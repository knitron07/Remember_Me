import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/online";
function rightbar({profile}) {

    const HomeRightbar=()=>{
        return(
        <>
            <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
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
                    <span className="rightbarInfovalue">Delhi</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfovalue">Alwar</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">School:</span>
                    <span className="rightbarInfovalue">DTU</span>
                </div>
            </div>

            <h4 className="rightbarprofileTitle"> User friends</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">samar</span>
                </div>
            </div>
        </>
        );
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar />:<HomeRightbar/>}
            </div>
        </div>
    )
}

export default rightbar
