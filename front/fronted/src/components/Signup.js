import React, { useState } from 'react';
import axios from 'axios';


const API_URL = "http://localhost:8080/api/auth/";

const Signup = () => {
    const [ inputs, setInputs ] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
    });

    const { id, password, username, email } = inputs;
    const [ secondPassword, setSecondPassword ] = useState("");
    const [ checkPw, setCheckPw ] = useState("");

    const onChange = (e) => {
        const { value, name } = e.target;

        setInputs({
            ...inputs,
            [name] : value
        });
    };

    const passwordCheck = (e) => {
        let afterpw = e.target.value;
        console.log(afterpw);
        console.log(password);
        setSecondPassword(afterpw);

        if(password === afterpw){
            setCheckPw("일치");
        }else{
            setCheckPw("비밀번호 불일치");
            
        }
    } 
    const onClick = () => {
        return axios.post(API_URL + "signup", {
            id,
            username,
            email,
            password,
        })
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                alert("회원가입완료");
                window.location.replace("/signin");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("다시 시도하세요");
        })
    };

    return (
        <div>
            <div>
            <input name="id" placeholder='id' onChange={onChange} value={id} />
            <input name="username" placeholder='username' onChange={onChange} value={username} />
            <input type="email" name="email" placeholder='email' onChange={onChange} value={email} />
            <input type="password" name="password" placeholder="password" onChange={onChange} value={password} />
            <input type="password" name="password2" placeholder="password for Check" onChange={passwordCheck} value={secondPassword} />
            {checkPw}
            </div>
            <button onClick={onClick}>회원가입</button>
        </div>
    );
}

export default Signup;