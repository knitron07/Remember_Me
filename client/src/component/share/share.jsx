import "./share.css";
import {PermMedia,Label,Room,EmojiEmotions} from "@material-ui/icons";
function share() {
    return (
        <div className="share">
            <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="assets/person/1.jpeg" alt=""/>
                <input placeholder="whats's in your mind samar" className="shareInput"></input>
            </div>
            <hr className="shareHr" />
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor ="tomato" className="shareIcon"/>
                        <span className="shareOptionText"> Photo or video</span>
                    </div>
                    <div className="shareOption">
                        <Label htmlColor ="blue" className="shareIcon"/>
                        <span className="shareOptionText"> Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor ="green" className="shareIcon"/>
                        <span className="shareOptionText"> Locations</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor ="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText"> Reaction </span>
                    </div>
                </div>
                <button className="sharebutton"> Share </button>
            </div>
            </div>

           
        </div>
    )
}

export default share
