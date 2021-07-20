import "./chatOnline.css"

function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://picsum.photos/500" alt=""/>
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">John Doe</span>

            </div>
            
        </div>
    )
}

export default ChatOnline;
