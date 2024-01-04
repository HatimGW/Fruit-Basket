import React, { useState } from 'react'
import "./App.css"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { message } from '../Redux/Action'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './Login'
import fruit from "./back.png"
import { BASE_URL } from '../uri'

const Signup = () => {
    const[signup,setsignup]=useState({})
    const[signupBatch,setsignupBatch]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const send = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}/signup`,signup)
            if(response.data.success){
                dispatch(message(response.data.success))
                navigate("/login")
                setTimeout(()=>{
                    dispatch(message(false))
                },2000)
            }
            else if(response.data.Failed){
               setsignupBatch(response.data.Failed)
               setTimeout(()=>{
                setsignupBatch(false)
               },1000)
            }
        } catch (error) {
                setsignupBatch(true)
                setTimeout(()=>{
                  setsignupBatch(false)
                },3000)
            }
           
        }

  return (
    <section>
    {signupBatch &&(
    <span className='signupAl' style={{position:"absolute",top:"4rem",backgroundColor: "#fff",padding: "20px",borderRadius: "8px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",textAlign: "center"}}><p style={{color: "#ff0000",fontWeight: "bold",margin: "0"}}>User already exists with Email/Username or Invalid Credentials</p></span>
    )}
    <div className='signmain'>
        <img className='imgback' style={{left:"-2rem",rotate:"-4deg",position: "absolute",minWidth: "100vw"}} src={fruit}></img>   
    <div className='form'>
    <h1>Sign Up</h1>
     <form>
        <div className='formdata'>
            <label>Username</label>
            <input value={signup.username} onChange={(e)=>setsignup({...signup,username:e.target.value})} type='text' placeholder='Username' required></input>
            </div>
            <div className='formdata'>
            <label>Email</label>
            <input value={signup.email} onChange={(e)=>setsignup({...signup,email:e.target.value})} type='email' placeholder='Email' required></input>
            </div>
            <div className='formdata'>
            <label>Mobile Number</label>
            <input value={signup.phone} onChange={(e)=>setsignup({...signup,phone:e.target.value})} type='number' placeholder='Mobile Number' required></input>
            </div>
            <div className='formdata'>
            <label>Password</label>
            <input value={signup.password} onChange={(e)=>setsignup({...signup,password:e.target.value})} type='password' placeholder='Password' required></input>
            </div>
            <div className='formbutn'>
            <button onClick={send}>Signup</button>
            <button style={{marginLeft:"0.5rem"}} onClick={()=>navigate("/login")}>Already have an account?</button>
            </div>
        </form>
        </div>
        </div>
    </section>
  )
}

export default Signup