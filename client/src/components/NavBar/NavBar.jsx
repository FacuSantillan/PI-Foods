import { Link } from "react-router-dom";

import React from "react";
import "./NavBar.css";
import logo from '../../images/logo.png'
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className="nav">

      <SearchBar/>

      <div><Link to='/home'><img className="img" alt="img" src={logo}/></Link></div>

      <button className='button'>
        <Link className='text' to='/create'>Create Recipe</Link>
      </button>

      <button className='button1'>
        <Link className='text' to='/home'>Home</Link>
      </button>

      <button className='button2'>
        <Link className='text' to='/about'>About</Link>
      </button>
      
      <button className='button3'>
        <Link className='text' to='/recipes'>Recipes list</Link>
      </button>

    </div>
    
    
  );
};

export default NavBar;