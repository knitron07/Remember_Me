
import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user:{
        _id:"60ec2f33cda1592db087efc4",
        profile:"",
        coverPicture:"",
        followers:[],
        followings:["60ec31da7d281b3f700ca2d6"],
        isAdmin:false,
        username:"amar",
        email:"amar@gmail.com",
        password:"$2b$10$N/lZj88P4FwWGHgj3ManweA3tS5tBNK56LRJY17r/GoXi7JGQEI8i",
        __v:0
    },
    isFetching:false,
    error:false
}

export const AuthContext= createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{

    const [state,dispatch]=useReducer( AuthReducer,INITIAL_STATE);
    return (
        <AuthContext.Provider value={{ 
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch}}
        >
            {children} 
        </AuthContext.Provider>
    );
} 