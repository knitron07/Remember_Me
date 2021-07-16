import "./share.css";
import {PermMedia,Label,Room,EmojiEmotions,Cancel} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";


function Share() {
    const {user} = useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const UP=process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const CN=process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const desc =useRef();
    const [file,setFile] = useState(null);
    const submitHandler=async(e)=>{
        e.preventDefault();
        const newpost={
            userId:user._id,
            desc:desc.current.value,
        }
        try {
            if(file){
                let formData = new FormData();
                formData.append("file",file)
                formData.append("upload_preset",UP) ;
                const res= await axios.post("https://api.cloudinary.com/v1_1/"+CN+"/upload",formData);
                newpost.img=res.data.secure_url;
            }
            await axios.post("/posts/",newpost);
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : `https://ui-avatars.com/api/?name=${user.username}`} alt=""/>
                <input placeholder={"whats's in your mind "+user.username+" ?"} ref={desc} className="shareInput"></input>
            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor ="tomato" className="shareIcon"/>
                        <span className="shareOptionText"> Photo </span>
                        <input style={{display:"none"}}type="file" id="file" accept=".jpeg,.jpg,.png,.img" onChange={(e)=>setFile(e.target.files[0])} />
                    </label>
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
                <button className="sharebutton" type="submit"> Share </button>
            </form>
            </div>

           
        </div>
    )
}

export default Share
