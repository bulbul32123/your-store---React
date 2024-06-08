import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/cart_reducers";

const CartContext = createContext();

const getLocalCartData = ()=>{
  let newCartData = localStorage.getItem('storeData')
  if (newCartData === [] ) {
    return []
  }
  else{
    return JSON.parse(newCartData)
  }
}

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_price: 0,
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };
  
  useEffect(()=>{
    dispatch({type:'CART_TOTAL_ITEM'})
    dispatch({type:'CART_TOTAL_PRICE'})
    
    localStorage.setItem('storeData', JSON.stringify(state.cart))
  },[state.cart])

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };
  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREASE", payload: id });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem,clearCart,setIncrease,setDecrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };