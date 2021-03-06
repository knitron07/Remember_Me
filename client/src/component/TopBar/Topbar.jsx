import React, { useContext } from 'react';
import "./topbar.css";
import {Search,Person,Chat,Notifications} from "@material-ui/icons";
import {Link} from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';

function Topbar() {
    const {user} =useContext(AuthContext)
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Remember Me</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                  <Search className="searchIcon" />
                  <input placeHolder="Search" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <Link to="/messenger">
                    <div className="topbarIconItem">

                       <Chat />
                       <span className="topbarIconBadge">1</span>
                    </div>
                    </Link>
                    <div className="topbarIconItem">
                       <Person />
                       <span className="topbarIconBadge">1</span>
                    </div><div className="topbarIconItem">
                       <Notifications/>
                       <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                {user && <Link to={`/profile/${user.username}`}>
                    <img src={ user.profilePicture ? PF+user.profilePicture : `https://ui-avatars.com/api/?name=${user.username}`} alt="" className="topbarImg" />
                </Link>}
                
            </div>

        </div>
    )
}

export default Topbar
