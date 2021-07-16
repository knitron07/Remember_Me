import "./Profile.css"
import { useState,useEffect} from "react";
import Topbar from '../../component/TopBar/Topbar';
import Sidebar from '../../component/sidebar/sidebar';
import Feed from "../../component/feed/feed";
import Rightbar from "../../component/rightbar/rightbar";
import axios from "axios";
import { ColorLensOutlined } from "@material-ui/icons";
import { useParams} from "react-router"

function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username=useParams().username;
    
    useEffect(() => {
        const fetchUser=async()=>{
            const fetchedUser= await axios.get(`/users?username=${username}`);
            setUser(fetchedUser.data);
        }

        
    fetchUser();
    }, [username])
    return (
        <>
        <Topbar />
        <div className="profile">
            <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className="profileCoverImg" src={user.profilePicture || "https://picsum.photos/800"} alt="" />
                    <img className="profileUserImg" src={`${PF}person/7.jpeg`} alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc} </span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
            </div>
            </div>
        </div>
    </>
    )
}

export default Profile
