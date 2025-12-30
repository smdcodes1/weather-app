import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import {useNavigate,Navigate} from 'react-router-dom';
import "./NavBar.css";
import {supabase} from '../../supabase/supabaseClient';
import caretIcon from '../../assets/caret_icon.svg';
import { useAuth } from '../../context/AuthContext';
const NavBar = () => {
  const navigate= useNavigate();
  const {user}= useAuth();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login',{replace:true});
  };
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     setUser(user);
  //   };

  //   fetchUser();
  // }, []);
  return (
    <div className="header">
        <div>
          <Link to="/" >Home</Link>
        </div>
        <div className="container">
          <h5>Where in the world are you!</h5>
        </div>
        <div className='navbar-right'>
          
          <div style={{paddingTop:'9px'}}>
            <Link to="/favourites"><Favorite style={{color:'red'}} /></Link>
          </div>
          
          <div className="navbar-profile">
            {/* {user ? user?.email || user?.user_metadata.display_name : "Login"} */}
            {user ? user?.email : "Login"}
            <img src={caretIcon} alt="" />
            <div className='dropdown'>
              {user ? <p onClick={handleLogout}>Sign out of App</p> : <p onClick={()=> navigate("/login")}>Sign into App</p>}
            </div>
         </div>
        </div>
        
        
    </div>
  );
}

export default NavBar
