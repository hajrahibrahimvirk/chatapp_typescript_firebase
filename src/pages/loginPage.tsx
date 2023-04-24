import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


const Login: React.FC = () => {


  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: any) =>{
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
    

    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    }catch(err){
      setErr(true)
    }

  }
  
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat App</span>
            <span className='title'>Login</span>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password' />
                <input style={{display:'none'}} type="file" id='file' />
                <button>Sign in</button>
                 {err && <span>Something went wrong</span>}
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
     
    </div>
  );
}

export default Login;
