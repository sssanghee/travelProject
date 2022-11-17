import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import MainPage from './MainPage';

const Signin = () => {
    const API_URL = "http://localhost:8080/api/auth/";

    const [ id, setId ] = useState("");
    const [ password, setPassword ] = useState("");

    const onIdChange = (e) => {
        setId(e.target.value);        
    }
    const onPwChange = (e) => {
        setPassword(e.target.value);
    }

    const onSignin = () => {
        
        return axios
        .post(API_URL + "signin", { id, password })
        .then((res) => {
            if(res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log(res);
            }
            window.location.replace("/");
            return res.data;
        }).catch((e) => {
            console.log(e);
        })
    }
    
    return (
        <div>
            <input id="id" placeholder='id' onChange={onIdChange} value={id}></input>
            <input type="password" id="password" placeholder='password' onChange={onPwChange} value={password}></input>
            <button onClick={onSignin}>로그인</button>
            <Link to ="/signup">
                <button>회원가입</button>
            </Link>
        </div>
    );
}

export default Signin;