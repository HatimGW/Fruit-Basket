import React, { useEffect, useState} from 'react';
import Main from './Main';
import Navb from './Navbar';
import { Routes,Route } from 'react-router-dom';
import Cart from './cart';
import Cart2 from './cart2';
import Signup from './Signup';
import Login from './Login';
import "./App.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {users,message2, loginSuccess, cartUpdated } from '../Redux/Action';
import PaymentSuccessPage from './payemntSuccess';
import { BASE_URL } from '../uri';
import socket from '../socket';

const Fruit = () => {

  const{messages}=useSelector(state=>state.items3)
  const{messages2}=useSelector(state=>state.items4)
  const{messages3}=useSelector(state=>state.items5)
  const{user}=useSelector(state=>state.items6)
  const[Already,setAlready]=useState(false)
  const[Added,setAdded]=useState(false)
  const[login,setlogin]=useState(false)


  const dispatch = useDispatch()


  const check = async() =>{
   
    try {
        const response = await axios.get(`${BASE_URL}/check`,{withCredentials:true,credentials:"include"})
        
        if(response.data.success){
        dispatch(users(response.data.username))
        dispatch(loginSuccess(response.data.userID))
        dispatch(message2(response.data.success))
        socket.emit('updateCart', response.data.userID);

        }
        else{
            dispatch(user(""))
            dispatch(loginSuccess(""))
            dispatch(message2(false))
        }
    } catch (error) {
        console.log(error)
    }
}

  
useEffect(()=>{
    check()
 },[])

  return (
    <>
    <Navb login={login} Already={Already} Added={Added}/>
    <div className='submit'>
    {messages && (
    <span><p>SignedUp Successfully</p></span>
    )}
    {messages3 && (
    <span><p>Welcome to Fruit Basket {user}</p></span>
    )}
    </div>
     <Routes>
  
     <Route path="/" element={<Main check={check} setlogin={setlogin} setAdded={setAdded} setAlready={setAlready}/>}></Route>
     <Route path="/success" element={<PaymentSuccessPage/>}></Route>
     <Route path="/login" element={<Login check={check}/>}></Route>
     {messages2 ? (
     <Route path="/cart" element={<Cart check={check}/>}></Route>
     ):(
     <Route  path="/cart" element={<Cart2/>}></Route>
     )}
     <Route path="/signup" element={<Signup/>}></Route>
     </Routes>
    </>
   
  )
  }

export default Fruit;

