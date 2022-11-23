import React from 'react';
import { Link } from 'react-router-dom';
import rootReducer from "../_reducers"
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../_actions/auth/auth';
import "../styles/Header.css";

const Header = () =>{
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const signOut = () => {  
        dispatch(logout());
    };


    console.log(auth);
    return (
        <div className='header'>
            <div className='mainIcon'>
                <Link to="/">
                    Travel
                </Link>
            </div>
            <div className='loginOut'>
            {
                auth.isLoggedIn
                ?   <>   
                        <Link to="profile">
                            <button>내 정보</button>
                        </Link>
                        <button onClick={signOut}>로그아웃</button>
                    </>
                :   <Link to="signIn">
                        <button>로그인</button>
                    </Link>
            }
            </div>
        </div>
    );
}

export default Header;