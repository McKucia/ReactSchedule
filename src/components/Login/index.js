import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
   
export default function Login() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem("token");
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        const credentials = {email, password}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials)
        };
    
        fetch('https://localhost:44310/api/account/login', requestOptions)
        .then(response => response.text())
        .then(res => { 
            localStorage.setItem("token", res); 
            history.push('/');
        });
    
      }

    return (
        <div className="login">
            <span className="sign">Sign in</span><hr/>
            <input type="text" placeholder="Email" className="input" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className="input" name="password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="button" onClick={handleClick}>Login</button>
        </div>
    );
}