import { useDispatch, useSelector } from 'react-redux';
import Fruit from './Component/Basic/Fruit';
import socket from './Component/socket';
import Fetch, { cartUpdated } from './Component/Redux/Action';
import { useEffect } from 'react';

function App() {

const{userID}=useSelector(state=>state.items8)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Attempting to set up socket listener for cartUpdated');
    socket.on('cartUpdated', (data) => {
      console.log(data)
      dispatch(cartUpdated(data));
    });
  
    return () => {
      console.log('Cleaning up socket listener for cartUpdated');
      socket.off('cartUpdated');
    };
  },[userID,dispatch]);
  
  useEffect(()=>{
    dispatch(Fetch("All"))
  },[dispatch])


  return (
   <>
    <Fruit/>
   </>
  );
}
export default App;
