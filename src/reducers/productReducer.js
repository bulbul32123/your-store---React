const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: true }

        case 'ERROR_IN_FETCHINHG_DATA':
            return { ...state, isLoading: false, isError: true }

        case 'FETCH_DATA_SUCCESS':

            const featuresData = action.payload.filter((curElemt) => curElemt.featured === true)

            return { ...state, isLoading: false, isError: false, products: action.payload, featureProducts: featuresData }

        case 'SET_SINGLE_LOADING':
            return { ...state, isSingleLoading: true }


        case 'FETCH_Single_API_DATA_SUCCESS':
            return { ...state, isSingleLoading: false, singleProduct: action.payload }

        case 'ERROR_IN_SINGLE_DATA_FETCHINHG_DATA':
            return { ...state, isSingleLoading: false, isError: true}
        default:
            return state;
    }




}
export default productReducer
