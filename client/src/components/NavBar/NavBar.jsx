import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from '../../images/logo.png'

const NavBar = () => {
  return (
    <div className="nav">

      <div><img className="img" src={logo}/></div>

      <button className='button'>
        <NavLink className='text' to='/create'>Create Recipe</NavLink>
      </button>

      <button className='button1'>
        <NavLink className='text' to='/home'>Home</NavLink>
      </button>

      <button className='button2'>
        <NavLink className='text' to='/about'>About</NavLink>
      </button>
      
      <button className='button3'>
        <NavLink className='text' to='/recipes'>Recipes list</NavLink>
      </button>

    </div>
    
    
  );
};

export default NavBar;