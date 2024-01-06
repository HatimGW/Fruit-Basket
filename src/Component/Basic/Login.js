import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { cartUpdated, loginSuccess, message2, message3,users } from '../Redux/Action'
import fruit from "./back.png"
import { BASE_URL } from '../uri'



const Login = ({socket}) => {
    const[logindata,setlogin]=useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}/login`,logindata,{withCredentials:true,credentials:"include"})
        if(response.data.success){

            dispatch(message2(response.data.success))
            dispatch(message3(response.data.success))
            dispatch(users(response.data.username))
            dispatch(loginSuccess(response.data.userID));
            socket.emit('login',response.data.userID)
              socket.on('cartUpdateds', (data) => {
                      dispatch(cartUpdated(data));
                    });
            setTimeout(()=>{
              dispatch(message3(false))
            },3000)
            navigate("/")
        }
        else{
            alert("Invalid Credential")
        }
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <section>
    <div className='signmain'>
        <img className='imgback' style={{left:"-2rem",rotate:"-4deg",position: "absolute",minWidth: "100vw"}} src={fruit}></img>
    <div className='loginform'>
    <h1>Login</h1>
        <form>
            <div className='formdata'>
            <label>Email</label>
            <input value={logindata.email} onChange={(e)=>setlogin({...logindata,email:e.target.value})} type='email' placeholder='Email'></input>
            </div>
            <div className='formdata'>
            <label>Password</label>
            <input value={logindata.password} onChange={(e)=>setlogin({...logindata,password:e.target.value})} type='password' placeholder='Password'></input>
            </div>
            <div className='formbutn'>
            <button onClick={login}>Login</button>
            <button onClick={()=>navigate("/signup")}>Create Account</button>
            </div>
           
        </form>
        </div>
        </div>
    </section>
  )
}

export default Login