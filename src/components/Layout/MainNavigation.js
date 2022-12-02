import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
import Authcontext from '../../store/auth-context';

import './main_navigation.scss'

const MainNavigation = () => {
  const authCtx  =useContext(Authcontext);

  const isLodingIn = authCtx.isLoggedIn;

 const logoutHandle =()=>{
    authCtx.logout()
 }

  return (
    <header className='header'>
        <Link>
            <div className='logo'>React Auth App</div>
        </Link>
        <nav>
            <ul>
                { !isLodingIn && (<li>
                    <Link to="/auth">Login</Link>
                </li>)
                }
                {   isLodingIn && ( <li>
                    <Link to="/profile">Profile</Link>
                </li>)}
                    { isLodingIn && ( <li>
                    <button onClick={logoutHandle}>LOGOUT</button>
                </li>)}
            </ul>
        </nav>
      
    </header>
  )
}

export default MainNavigation;
