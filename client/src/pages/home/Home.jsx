import React from 'react';
import "./home.css";
import Topbar from '../../component/TopBar/Topbar';
import Sidebar from '../../component/sidebar/sidebar';
import Feed from "../../component/feed/feed";
import Rightbar from "../../component/rightbar/rightbar";
function Home() {
    return (
        <>
            <Topbar />
            <div className="HomeContainer">
                <Sidebar />
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )
}

export default Home
