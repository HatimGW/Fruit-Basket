import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Fetch, { Filter, loginSuccess, message2, resetCart} from '../Redux/Action';
import "./App.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import png from "../Basic/fruitsbaskt.png"
import { BASE_URL } from '../uri';


const Navb=({Added,Already,login})=> {
  const{navitems}=useSelector(state=>state.items2)
  const{messages2}=useSelector(state=>state.items4)
  const{cartData}=useSelector(state=>state.items7)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const[search,setSearch]=useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

const handleDropdownToggle = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

const logout = async()=>{
 try {
  const response = await axios.get(`${BASE_URL}/logout`,{withCredentials:true,credentials:"include"})
  if(response.data.success){
     dispatch(resetCart())
     dispatch(loginSuccess(""))
     dispatch(message2(response.data.log)) 
  }
  navigate("/login")
 } catch (error) {
  console.log(error)
 }
}
const searched = (value)=>{
 
  if(value !== undefined){
    const name = value.toLowerCase().trim()
    const newname = name[0].toUpperCase()+name.slice(1)
     
    dispatch(Fetch(newname))
  }
  else{
    alert("Please write something")
  }
}

useEffect(()=>{
  dispatch(Filter())
},[dispatch])

return (

<nav id='navmain'>
{Added &&(
  <div style={{display:"flex",justifyContent:"center",position:'absolute', minWidth:"100vw"}}>
      <div className='addBatch'>
      <p style={{margin:'0'}}>Successfully added</p>
      </div>
      </div>
    )}
{Already &&(
  <div style={{display:"flex",justifyContent:"center",position:'absolute', minWidth:"100vw"}}>
      <div className='alrdyBatch'>
      <p style={{margin:'0'}}>Already in cart</p>
      </div>
      </div>
)}
{login && (
  <div style={{display:"flex",justifyContent:"center",position:'absolute', minWidth:"100vw"}}>
      <div className='alrdyBatch'>
      <p style={{margin:'0'}}>Please login first</p>
      </div>
      </div>
)}

<img alt='logo' style={{position:"absolute",left:"4px",maxWidth:"1.8rem"}} src={png}></img><h4>Fruit Basket</h4>
<div className='nav2'>


<Link to='/' className='link2' onClick={()=>dispatch(Fetch("All"))}>Home</Link>

<Link className="link2" onClick={handleDropdownToggle}>Category</Link>
      {isDropdownOpen && (
        <div className="dropdown-content">
        {navitems?.map((e,i)=>(
          <Link to='/' className='link' key={i} onClick={()=>{dispatch(Fetch(e)); handleDropdownToggle()}}>{e}</Link>
      ))}
        </div>
      )}
    </div>

<Link style={{textDecoration:"none"}} className='cart' to="/cart" ><div className='cartpng'><span className='count'>{messages2 ? cartData?.length : null}</span><i class="fa-solid fa-cart-shopping"></i></div></Link>


<i onClick={handleDropdownToggle} class="fa-solid fa-bars bars"></i>



{!messages2 ? (
<div className='auth'>
<Link to='/signup' className='link2'>Signup</Link>
<Link to='/login' className='link2'>Login</Link>
</div>
):(
  <>
  <div className='grpInp'>
    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search for Category'></input>
    <button onClick={()=>searched(search)}>Submit</button>
    </div>
<Link onClick={logout} className='link2'><i class="fa-solid fa-right-from-bracket"></i></Link>
</>
)}

{isDropdownOpen && (
 <div className='nav3'>
 <div className='grpInp2'>
    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search for Category'></input>
    <button onClick={()=>searched(search)}>Submit</button>
</div>

 <Link to='/' className='link' onClick={()=>{dispatch(Fetch("All")); handleDropdownToggle()}}>Home</Link>
 {navitems?.map((e,i)=>(
          <Link to='/' className='link' key={i} onClick={()=>{dispatch(Fetch(e)); handleDropdownToggle()}}>{e}</Link>
  ))}
 {!messages2 && (
  <>
  <Link onClick={handleDropdownToggle} to='/signup' className='link'>Signup</Link>
  <Link onClick={handleDropdownToggle} to='/login' className='link'>Login</Link>
  </>
  )}
</div>
)}
</nav>

    
  );
}


    


export default Navb;