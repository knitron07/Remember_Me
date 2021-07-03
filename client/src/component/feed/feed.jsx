import "./feed.css"
import Share from "../share/share.jsx";
import Post from "../Post/post";
import {Posts} from "../../dummyData";
function feed() {
    return (
        <div className="feed">
           <div className="feedWrapper">
                <Share />
                {Posts.map((singlePost)=>{
                   return (<Post key={singlePost.id} postData={singlePost}/>);
                })}
           </div>
        </div>
    )
}

export default feed
