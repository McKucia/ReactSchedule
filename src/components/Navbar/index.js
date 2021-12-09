import React from 'react';
import './navbar.css';
import { MdHome, MdLogout } from "react-icons/md";
import { AiOutlineSchedule, AiOutlineTable } from 'react-icons/ai';
import { GiMetronome } from 'react-icons/gi';
import {
    Link
  } from "react-router-dom";
  

function Navbar() {

    return (
        <div id="sidenav">
            <Link className="nav-button" to="/"><MdHome/></Link>
            <Link className="nav-button" to="/schedule"><AiOutlineSchedule/></Link>
            <Link className="nav-button" to="/tracer"><AiOutlineTable/></Link>
            <Link className="nav-button" to="/metronome"><GiMetronome/></Link>
            <Link className="nav-button" to="/login"><MdLogout/></Link>
        </div>
    );
}

export default Navbar;