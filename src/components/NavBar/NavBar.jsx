import React from 'react'
import { Link } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="header">
        <div>
          <Link to="/" >Home</Link>
        </div>
        <div className="container">
          <h5>Where in the world are you!</h5>
        </div>
        <div style={{paddingTop:'9px'}}>
          <Link to="/favourites"><Favorite style={{color:'red'}} /></Link>
          
        </div>
        
    </div>
  );
}

export default NavBar
