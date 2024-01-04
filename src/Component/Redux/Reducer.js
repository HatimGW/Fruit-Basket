const products = []
const navitems= []
const cartData = []
const user = ""
const userID = ""
const messages = false
const messages2 = false
const messages3 = false

const Reducer = (state={products},action)=>{
  switch(action.type){
        case "success":
            return {products:action.payload}
        case "Failed":
            return {products:action.payload}
        default :
        return state;

  }
}
const Reducer2 =(state={navitems},action)=>{
  switch (action.type){
    case "Fetched":
      return {navitems:action.payload}
    case "FetchedFailed":
      return {navitems:action.payload}
    default:
      return state
  }
}
const Reducer3 = (state={messages},action)=>{
  switch(action.type){
    case "submit":
      return {messages:action.payload}
    default:
      return state
  }
}
const Reducer4 = (state={messages2},action)=>{
  switch(action.type){
    case "submit2":
      return {messages2:action.payload}
    default:
      return state
  }
}
const Reducer5 = (state={messages3},action)=>{
  switch(action.type){
    case "submit3":
      return {messages3:action.payload}
    default:
      return state
  }
}
const Reducer6 = (state={user},action)=>{
  switch(action.type){
    case "user":
      return {user:action.payload}
    default:
      return state
  }
}
const Reducer7 = (state={cartData},action)=>{
  switch(action.type){
    case "CART_UPDATED":
      return {cartData:action.payload}
    case "resetCart":
      return {cartData:[]}
    default:
      return state;
  }
}



export const Reducer8 = (state={userID}, action)=>{
  switch(action.type){
    case "LOGIN_SUCCESS":
      return {userID: action.payload}
    default:
      return state;
  }
}

export default Reducer;
export {Reducer2,Reducer3,Reducer4,Reducer5,Reducer6,Reducer7}