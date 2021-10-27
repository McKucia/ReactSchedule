import React from 'react';
import './navbar.css';
import {
    Link
  } from "react-router-dom";
  

function Navbar() {

    const closeNav = () => document.getElementById("sidenav").style.width = "0px";
    const openNav = () => document.getElementById("sidenav").style.width = "250px";

    return (
        <div>
            <ul id="sidenav" className="sidenav">
                <button className="closebtn" onClick={closeNav}>x</button>
                <li>
                    <Link to="/">Strona główna</Link>
                </li>
                <li>
                    <Link to="/schedule">Twój plan</Link>
                </li>
                <li>
                    <Link to="/login">Wyloguj</Link>
                </li>
            </ul>
        <span className="opennav" onClick={openNav}>&#9776;</span>
      </div>
    );
}

export default Navbar;