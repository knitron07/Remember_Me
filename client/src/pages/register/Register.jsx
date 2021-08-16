import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleClick= async(e)=>{
  e.preventDefault();


  if(passwordAgain.current.value !== password.current.value){
    passwordAgain.current.setCustomValidity("password don't match")
  }else{
    const user={
      username:username.current.value,
      email:email.current.value,
      password:password.current.value,
    }
    try {

      await axios.post("/auth/register",user);
      history.push("/login")
    } catch (error) {
      console.log(error)
    }  
  }

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
            <input placeholder="Username"  ref={username} required className="loginInput" />
            <input placeholder="Email"  ref={email} required type="email" className="loginInput" />
            <input placeholder="Password" ref={password} required  type="password" className="loginInput" />
            <input placeholder="Password Again" ref={passwordAgain} type="password" required  className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
