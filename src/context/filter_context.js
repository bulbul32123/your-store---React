import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontext";
import filterReducer from "../reducers/Filter_reducers";

const FilterContext = createContext();
const initialState = {
    filter_Product: [],
    all_Products: [],
    sorting_value: "lowest",
    grid_view: true,
    filters: {
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        maxPrice: 0,
        price: 10,
        minPrice: 0,
    }
}
export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext()
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const setGridView = () => {
        dispatch({ type: 'SET_GRID_VIEW' })
    }
    const setListView = () => {
        dispatch({ type: 'SET_LIST_VIEW' })
    }
    const sorting = (event) => {
        let value = event.target.value;
        dispatch({ type: 'GET_SORT_VALUE', payload: value })
    }
    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCTS' })
        dispatch({ type: 'SORTING_PRODUCTS' })
    }, [products, state.sorting_value, state.filters])
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" });
    };

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products })
    }, [products])
    const updateFilterValue = (event) => {
        let name = event.target.name
        let value = event.target.value

        return dispatch({ type: 'UPDATE_FILTERS_DATA', payload: { name, value } })
    }

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, clearFilters, sorting, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    );
};
export const useFilterContext = () => {
    return useContext(FilterContext);
};