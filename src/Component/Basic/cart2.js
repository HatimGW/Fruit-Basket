import React from 'react'
import "./App.css"
import {useNavigate } from 'react-router-dom'

const Cart2 = () => {
  const navigate = useNavigate()
  return (
    <section>
    <div className='cartmain'>
     <h1 style={{fontFamily:"math",color:"cadetblue"}}>Your shopping cart</h1>
     <div className='cartmain2'>
<table>
<tr style={{justifyContent:"center",padding:"15px"}}>
    <th style={{fontFamily:"monospace",color:"cadetblue",fontSize:"1.5rem"}}>Please Login First</th>
</tr>
</table>
  
     </div>
     <div className='formbutn'>
    <button onClick={()=>navigate("/login")}>LOGIN NOW</button>
     </div> 
    </div>
    </section>
  )
}

export default Cart2