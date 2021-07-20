import "./message.css"
import {format} from "timeago.js"
function Message({message,own}) {
    console.log(own)
    return (
        <div className={own ?"message own":"message"}>
            <div className="messageTop">
                { !own? <img className="messageImg" src="https://picsum.photos/500" alt="" />: null}
                <p className="messageText"> { message.text } </p>

            </div>
            <div className="messageBottom">
                    {format(message.createdAt)}
            </div>
        
            
        </div>
    )
}

export default Message;
