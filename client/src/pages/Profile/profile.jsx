import "./Profile.css"
import Topbar from '../../component/TopBar/Topbar';
import Sidebar from '../../component/sidebar/sidebar';
import Feed from "../../component/feed/feed";
import Rightbar from "../../component/rightbar/rightbar";
function Profile() {
    return (
        <>
        <Topbar />
        <div className="profile">
            <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
                    <img className="profileUserImg" src="assets/person/7.jpeg" alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName"> Samardeep</h4>
                    <span className="profileInfoDesc">samardeeep singh </span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed/>
                <Rightbar profile/>
            </div>
            </div>
        </div>
    </>
    )
}

export default Profile
