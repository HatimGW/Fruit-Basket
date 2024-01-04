import axios from "axios"
import { BASE_URL } from "../uri"

const Fetch = (category) => async(dispatch)=>{
 
    try {
    const fetch = await axios.get(`${BASE_URL}/fetch?cat=${category}`,{withCredentials:true,credentials:"include"})
    const response = fetch.data.fil
    dispatch({
        type:"success",
        payload:response
    })
  }
 catch (error) {
    dispatch({
        type:"Failed",
        payload:error
    })
}
}
const Filter = () => async(dispatch)=>{
 
    try {
    const fetch = await axios.get(`${BASE_URL}/filter`,{withCredentials:true,credentials:"include"})
    const response = fetch.data.data
    dispatch({
        type:"Fetched",
        payload:response
    })
} catch (error) {
    dispatch({
        type:"FetchedFailed",
        payload:error
    })
}
}

// const cartUpdate = () => async(dispatch)=>{
 
//   try{
//      const response = await axios.get(`${BASE_URL}/update`,{withCredentials:true,credentials:"include"})
//      const cartdata = response.data.Data
    
//        dispatch({
//         type:"cart",
//         payload: cartdata
//        })
//   }
//   catch (error){
//     dispatch({
//       type:"cart",
//       payload: error
//      })
//   }
// }/

// export const updateCart = (userId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`/update?userId=${userId}`); // Update the URL based on your server route
//     const cartData = response.data.data;

//     dispatch({
//       type: 'CART_UPDATED',
//       payload: cartData,
//     });
//   } catch (error) {
//     console.error('Error updating cart:', error);
//   }
// };

export const cartUpdated = (cartData) => ({
  type:"CART_UPDATED",
  payload: cartData.data,
});

export const loginSuccess = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload
});

const users = (payload)=>{
    return {
      type:"user",
      payload
    }
}
const resetCart = () => ({
  type: "resetCart",
});
const message = (payload) => {
    return {
      type: "submit",
      payload
    };
  };

const message2 = (payload) => {
    return {
      type: "submit2",
      payload
    };
  };
const message3 = (payload) => {
    return {
      type: "submit3",
      payload
    };
  };

export default Fetch;
export {Filter,message,message2,message3,users,resetCart}