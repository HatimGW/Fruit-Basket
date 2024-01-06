import React, { useEffect, useState } from 'react'
import {Container,Card,Button,Row,Col} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge'
import { useSelector,useDispatch } from 'react-redux';
import Fetch, { cartUpdated } from '../Redux/Action';
import axios from 'axios';
import { BASE_URL } from '../uri';


const Main = ({setlogin,setAdded,setAlready,socket}) => {
  const{products}=useSelector(state=>state.items)
  const [isHovered, setIsHovered] = useState(Array(products?.length).fill(false));
  const{messages2}=useSelector(state=>state.items4)


  const{userID}=useSelector(state=>state.items8)

 

  const dispatch= useDispatch()
 

  const handleMouseOver = (index) => {
    if(index !== -1){
      setIsHovered((newstate)=>{
        const newstates = [...newstate];
        newstates[index] =true;
        return newstates;
      })
    }
  };

  const handleMouseOut = (index) => {
   
   if(index !== -1){
    setIsHovered((newstate)=>{
      const newstates = [...newstate];
      newstates[index] = false;
      return newstates;
    })
   }
  };
 
  const myStyles = {
  
    borderRadius: '21% / 61% 0% 47% 1%',
    transform: 'rotate(-45deg)',
    top: '20px',
    left: '-14px'
   
  };

  const marquee ={
    marginTop:"4rem",
    backgroundColor:"yellow",
    fontFamily:"math",
    fontSize:"1.5rem",
    color:'#006400'
  }

  const add = async(item)=>{
  try { 
    const response = await axios.post(`${BASE_URL}/add`,item,{withCredentials:true,credentials:"include"})
    if(response.data.success){
        socket.emit('updateCart',userID)

      setAdded(response.data.success)
      setTimeout(()=>{
        setAdded(false)
      },1500)
    }
     else if(response.data.failed){
      setAlready(response.data.failed)
      setTimeout(()=>{
        setAlready(false)
      },600)
     }
  
  } catch (error) {
    console.log(error)
  }
  }


  useEffect(()=>{
    dispatch(Fetch("All"))
  },[])

  return (
    <section>
    {products && products.length > 0 ? (
      <>
    <marquee style={marquee} behavior="scroll" scrollamount="10" direction="left">Special Fruit Sale: Apples, Oranges, Bananas - Buy 2, Get 1 Free! Fresh and Delicious Fruits for a Healthy Lifestyle.</marquee>
    <Container style={{minHeight:"100vh"}} className="d-content justify-content-center align-items-center">
    <Row xs={1} md={3} className='g-4'>
     {products.map((item,index)=>(
    <Col key={item.id} style={{transform: isHovered[index] ? "scale(1.1)" : "scale(1)",transition: "transform 0.2s ease"}} onMouseEnter={()=>handleMouseOver(index)} onMouseLeave={()=>handleMouseOut(index)} className='d-flex flex-column align-items-center'>
    <Card style={{boxShadow:"0 0 15px black", width: '100%', height: '100%', margin: '10px', marginTop:"30px" }}>
    <Badge style={myStyles} className='position-absolute' bg="success">{item.Discount}</Badge> 
    <Card.Img style={{ width: '100%'}} variant="top" src={`./images/${item.img}`} />
    <Card.Body className="d-flex flex-column justify-content-between">
    <Card.Text style={{fontSize:'8px'}}>{item.Company}</Card.Text>
    <Card.Title style={{fontSize:'12px'}}>
          {item.Name}
    </Card.Title>
    <Card.Text>
        <ins style={{textDecoration:"none"}}>&#x20b9; {item.NewPrice}/-</ins>&nbsp;<del>&#x20b9; {item.Price}/-</del>
    </Card.Text>
    {messages2 ? (
    <Button style={{
            border: "1px solid cadetblue",
            backgroundColor: isHovered[index] ? "cadetblue" : "transparent",
            color: isHovered[index] ? "lightyellow" : "initial",
            boxShadow: isHovered[index] ? "0 0 10px cadetblue" : "initial"
          }} onMouseEnter={()=>handleMouseOver(index)} onMouseLeave={()=>handleMouseOut(index)} onClick={()=>add(item)} variant="none" className="align-self-center adds">Add To Cart</Button>):(
           <Button style={{
            border: "1px solid cadetblue",
            backgroundColor: isHovered[index] ? "cadetblue" : "transparent",
            color: isHovered[index] ? "lightyellow" : "initial",
            boxShadow: isHovered[index] ? "0 0 10px cadetblue" : "initial"
          }} onMouseEnter={()=>handleMouseOver(index)} onMouseLeave={()=>handleMouseOut(index)} onClick={()=>{setlogin(true); setTimeout(()=>{setlogin(false)},3000)}} variant="none" className="align-self-center adds">Add To Cart</Button>)}
    </Card.Body>
    </Card>
    </Col>
    ))}
    </Row>
   </Container>
    </>
    ):(
      <p style={{fontSize:"20px",fontFamily:"monospace"}}>Sorry item is currently unavailable :(</p>
    )}
  
   </section>
  )
}

export default Main