import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Payment from './payment'
import {useNavigate } from 'react-router-dom'
import { BASE_URL } from '../uri'
import socket from '../socket'



const Cart = ({check}) => {

const[prices,setPrice]=useState(null)
const{userID}=useSelector(state=>state.items8)

const navigate = useNavigate()

const{cartData}=useSelector(state=>state.items7)

const price = () =>{
  let total = 0
  if(Array.isArray(cartData) && cartData.length > 0){
  cartData.map((item)=>{
   total += item.amount*item.NewPrice
  })
 }
setPrice(total)
}

const amounts = async(item,amt)=>{

  try {

  const response = await axios.post(`${BASE_URL}/amount`,{...item, amount: Math.max(1,item.amount + amt)},{withCredentials:true,credentials:"include"})
 
  if(response.data.success){
    socket.emit('updateCart',userID);
    price()
  }
  } catch (error) {
    console.log(error)
  }

}

const del = async(id)=>{
try {
  const response = await axios.get(`${BASE_URL}/del?id=${id}`,{withCredentials:true,credentials:"include"})
  if(response.data.success){
    socket.emit('updateCart', userID);
  }
 } catch (error) {
  console.log(error)
 }
}

const handleToken = async(token) => {
 try {
  const response = await axios.post(`${BASE_URL}/charge`,{cartData,token,amount:prices},{withCredentials:true,credentials:"include"})

  if(response){
     const del = await axios.get(`${BASE_URL}/alldel`,{withCredentials:true,credentials:'include'})
     if(del.data.success){
      socket.emit('updateCart',userID);
      navigate("/success",{state:{item:response.data.charge}})
     }
     else{
      console.log("Not deleted")
     }
  }
 } catch (error) {
  console.log(error)
 }
};


useEffect(()=>{
  if(cartData){
    price()
  }
},[cartData])

  return (
    <section>
    {cartData && cartData.length > 0 ?(
      <>
    <div className='cartmain'>
     <h1 style={{fontFamily:"math",color:"cadetblue"}}>Your shopping cart</h1>
   
     <div className='cartmain2'>
<table>

<tr style={{backgroundColor:"cadetblue",color:"lightyellow"}}>
    <th>Qty</th>
    <th>Items</th>
    <th>Price</th>
</tr>

{cartData?.map((item,index)=>(
  <tr style={{backgroundColor:"lightyellow",color:"cadetblue",fontFamily:"serif",fontWeight:"bold"}} key={index}>
        <td><button style={{borderRadius:"6px",backgroundColor:"cadetblue",color:"lightyellow"}} onClick={()=>amounts(item,-1)}>-</button><button style={{backgroundColor:"#e4e4e4",color:"black"}}>{item.amount}</button><button style={{borderRadius:"6px",backgroundColor:"cadetblue",color:"lightyellow"}} onClick={()=>amounts(item,+1)}>+</button><br></br><i onClick={()=>del(item.id)} style={{cursor:"pointer"}} class="fa-solid fa-trash"></i></td>
        <td>{item.Name}</td>
        <td>Rs {item.NewPrice}/-</td>
    </tr>
))}
<tr style={{backgroundColor:"cadetblue",color:"lightyellow"}}>
    <th>Total</th>
    <th></th>
    <th>Rs {prices}/-</th>
</tr>
</table>
     </div>
     <div style={{display:"flex",justifyContent:"center",minWidth:"100vw",bottom:"-3rem",position:"absolute"}}>
<Payment handleToken={handleToken} cartTotal={prices}/>
</div>
    </div>
    </>    
    ):(
      <h3 style={{color:"cadetblue",fontFamily:"monospace"}}>Oh no, an empty cart!  <i class='bx bx-cart-alt'></i></h3>
    )}

    </section>
  )
}

export default Cart