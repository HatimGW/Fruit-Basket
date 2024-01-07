import { useDispatch, useSelector } from 'react-redux';
import Fruit from './Component/Basic/Fruit';
import socket from './Component/socket';
import Fetch, { cartUpdated, loginSuccess, message2, users } from './Component/Redux/Action';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './Component/uri';

function App() {

const{userID}=useSelector(state=>state.items8)

  const dispatch = useDispatch()

  const check = async() =>{
   
    try {
        const response = await axios.get(`${BASE_URL}/check`,{withCredentials:true,credentials:"include"})
        
        if(response.data.success){
        socket.emit('updateCart', response.data.userID);
        socket.on('cartUpdated', (data) => {
          console.log(data)
          dispatch(cartUpdated(data));
      });
        dispatch(users(response.data.username))
        dispatch(loginSuccess(response.data.userID))
        dispatch(message2(response.data.success))
        

        }
        else{
            dispatch(users(""))
            dispatch(loginSuccess(""))
            dispatch(message2(false))
        }
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    console.log('Attempting to set up socket listener for cartUpdated');
    socket.on('cartUpdated', (data) => {
      console.log(data)
      dispatch(cartUpdated(data));
  });
  
    return () => {
      console.log('Cleaning up socket listener for cartUpdated');
      socket.disconnect()
    };
  },[userID,dispatch]);
  
  useEffect(()=>{
    dispatch(Fetch("All"))
  },[dispatch])

  useEffect(()=>{
    check()
 },[])


  return (
   <>
    <Fruit/>
   </>
  );
}
export default App;
