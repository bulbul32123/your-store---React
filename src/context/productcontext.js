import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import reducer from "../reducers/productReducer";

export const AppContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {}
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const API = 'https://api.pujakaitem.com/api/products';

    const getProducts = async () => {
        dispatch({ type: 'SET_LOADING ' })
        try {
            const { data } = await axios.get(API)
            dispatch({ type: "FETCH_DATA_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: 'ERROR_IN_FETCHINHG_DATA ' + error });
        }
    }
   const getSingleProducts = async (url) => {
        dispatch({ type: 'SET_SINGLE_LOADING ' })
        try {
            const { data } = await axios.get(`https://api.pujakaitem.com/api/products${url}`)
            dispatch({ type: "FETCH_Single_API_DATA_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: 'ERROR_IN_SINGLE_DATA_FETCHINHG_DATA ' + error });
        }
    }


        useEffect(() => {
            getProducts()
        }, [])





    return <AppContext.Provider
        value={{ ...state,getSingleProducts }}>
        {children}
    </AppContext.Provider>
}



export const useProductContext = () => {
    return useContext(AppContext)
}