import "./login.css";
import {useContext, useRef} from "react";
import {loginCall} from "../../apiCalls";
import { AuthContext } from "../../Context/AuthContext";
import {CircularProgress} from "@material-ui/core";

export default function Login() {
  const email=useRef();
  const password=useRef();
  const {user,isFetching,error,dispatch} = useContext(AuthContext);
  const handleClick =(e)=>{
    e.preventDefault();
    loginCall({
      email:email.current.value,
      password:password.current.value
    },dispatch);
     
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Remember ME</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Remember Me.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="loginInput" ref={email} />
            <input placeholder="Password" type="password" required className="loginInput" ref={password} />
            <button className="loginButton">{isFetching ? <CircularProgress color="white" style={{size:"20px"}} />:"login"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
