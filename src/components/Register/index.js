import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import accountUrl from '../../helpers/routes.js';
import '../Login/login.css';
   
export default function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        const credentials = { firstName, lastName, nickname, email, password, confirmPassword };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials)
        };
    
        fetch('https://localhost:44310/api/account/register', requestOptions)
        .then( response => {
            if (!response.ok) { throw response }
            else { history.push('/') }
          })
          .catch( err => {
              err.json().then( errorMessage => setErrors(errorMessage.errors))
            });

    }

    const handleChange = (event) => {
        let  { value } = event.target;
        if(value === "")
            event.target.style = "background: var(--redFireTransparent)";
        else 
            event.target.style = "outline: none";
    }

    return (
        <div className="login">
            <span className="sign">Sign up</span>

            <input type="text" className="input" placeholder="First name" name="firstname" onChange={(e) => {handleChange(e); setFirstName(e.target.value)}}/>
            <input type="text" className="input" placeholder="Last name" name="lastname" onChange={(e) => {handleChange(e); setLastName(e.target.value)}}/>

            {errors ? (errors.Email ? 
                <ul>
                    {errors.Email.map(e => <li>{e}</li>)}
                </ul>: "") : ""}

            <input autoComplete="off" type="text" className="input" placeholder="Email" name="email" onChange={(e) => {handleChange(e); setEmail(e.target.value) }}/>

            {errors ? (errors.Nickname ? 
                <ul>
                    {errors.Nickname.map(e => <li>{e}</li>)}
                </ul>: "") : ""}
            <input type="text" className="input" placeholder="Nickname" name="nickname" onChange={(e) => {handleChange(e); setNickname(e.target.value)}}/>

            {errors ? (errors.Password ? 
                <ul>
                    {errors.Password.map(e => <li>{e}</li>)}
                </ul>: "") : ""}
            <input autoComplete="new-password" type="password" className="input" placeholder="Password" name="password" onChange={(e) => {handleChange(e); setPassword(e.target.value)}}/>

            {errors ? (errors.ConfirmPassword ? 
                <ul>
                    {errors.ConfirmPassword.map(e => <li>{e}</li>)}
                </ul>: "") : ""}
            <input type="password" className="input" placeholder="Confirm password" name="confirmPassword" onChange={(e) => {handleChange(e); setConfirmPassword(e.target.value)}}/>
            <button  className="submit-button"onClick={handleClick}>Sign up</button>
        </div>
    );
}