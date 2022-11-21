import React from 'react';
import { Link } from 'react-router-dom';
import rootReducer from "../_reducers"
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../_actions/auth/auth';

const Header = () =>{
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const signOut = () => {  
        dispatch(logout());
    };

    console.log(auth);
    return (
        <div>
            <Link to="/">
                <h1>헤더</h1>
            </Link>
            {
                auth.isLoggedIn
                ?   <button onClick={signOut}>로그아웃</button>
                :   <Link to="signIn">
                        <button>로그인</button>
                    </Link>
            }
            <hr />
        </div>
    );
}

export default Header;