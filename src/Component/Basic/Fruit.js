import React, {useState} from 'react';
import Main from './Main';
import Navb from './Navbar';
import { Routes,Route,Switch } from 'react-router-dom';
import Cart from './cart';
import Cart2 from './cart2';
import Signup from './Signup';
import Login from './Login';
import ErrorPage from "./ErrorPage.js";
import "./App.css"
import { useSelector } from 'react-redux';
import PaymentSuccessPage from './payemntSuccess';

const Fruit = () => {

  const{messages}=useSelector(state=>state.items3)
  const{navitems}=useSelector(state=>state.items2)
  const{messages2}=useSelector(state=>state.items4)
  const{messages3}=useSelector(state=>state.items5)
  const{user}=useSelector(state=>state.items6)
  const[Already,setAlready]=useState(false)
  const[Added,setAdded]=useState(false)
  const[login,setlogin]=useState(false)

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
     <Switch>
     <Route path="/" exact element={<Main setlogin={setlogin} setAdded={setAdded} setAlready={setAlready}/>}></Route>
  {navitems?.map((e,i)=>(
    <Route key={i} path={`/${e}`} element={<Main setlogin={setlogin} setAdded={setAdded} setAlready={setAlready}/>}></Route>
  ))}
     
     <Route path="/success" element={<PaymentSuccessPage/>}></Route>
     <Route path="/login" element={<Login />}></Route>
     {messages2 ? (
     <Route path="/cart" element={<Cart/>}></Route>
     ):(
     <Route  path="/cart" element={<Cart2/>}></Route>
     )}
     <Route path="/signup" element={<Signup/>}></Route>
     <Route element={<ErrorPage/>}></Route>
     </Switch>
    </>
   
  )
  }

export default Fruit;

