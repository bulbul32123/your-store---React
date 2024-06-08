const filterReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_FILTER_PRODUCTS':
            let priceArr = action.payload.map((curElem) => curElem.price);
            let maxPrice = Math.max(...priceArr);

            return {
                ...state,
                filter_Product: [...action.payload],
                all_Products: [...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice },
            };

        case 'SET_GRID_VIEW':
            return { ...state, grid_view: true }
        case 'SET_LIST_VIEW':
            return { ...state, grid_view: false }

        case 'GET_SORT_VALUE':

            return { ...state, sorting_value: action.payload }


        case 'SORTING_PRODUCTS':
            let newSortData;
            const { filter_Product } = state
            let trempSortProduct = [...filter_Product]



            const sortingProducts = (a, b) => {
                switch (state.sorting_value) {
                    case 'lowest':
                        return a.price - b.price

                    case 'highest':
                        return b.price - a.price;

                    case 'z-a':
                        return b.name.localeCompare(a.name);
                    case 'a-z':
                        return a.name.localeCompare(b.name);
                }
            }
            newSortData = trempSortProduct.sort(sortingProducts)

            return { ...state, filter_Product: newSortData }
        case 'FILTER_PRODUCTS':
            let { all_Products } = state
            let tempFilterProduct = [...all_Products];
            const { text, category, company, color,price } = state.filters
            if (text) {
                tempFilterProduct = tempFilterProduct.filter((currenelem) => {
                    return currenelem.name.toLowerCase().includes(text)
                })
            }

            if (category !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((currenelem) => {
                    return currenelem.category === category
                })
            }

            if (company !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((currenelem) => {
                    return currenelem.company.toLowerCase() === company.toLowerCase()
                })
            }
            if (color !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((currenelem) => {
                    return currenelem.colors.includes(color)
                })
            }
            if (price === 0) {
                tempFilterProduct = tempFilterProduct.filter((currenelem) => currenelem.price === price)
            }
            else{
                tempFilterProduct = tempFilterProduct.filter((currenelem) => currenelem.price <= price)
            }
            return {
                ...state,
                filter_Product: tempFilterProduct
            }

        case 'UPDATE_FILTERS_DATA':
            const { name, value } = action.payload
            return {
                ...state, filters: {
                    ...state.filters,
                    [name]: value
                }
            }


    case "CLEAR_FILTERS":
        return {
          ...state,
          filters: {
            ...state.filters,
            text: "",
            category: "all",
            company: "all",
            color: "all",
            maxPrice: state.filters.maxPrice,
            price: state.filters.maxPrice,
            minPrice: state.filters.minPrice,
          },
        };
  
        default:
            return state
    }
}

export default filterReducer