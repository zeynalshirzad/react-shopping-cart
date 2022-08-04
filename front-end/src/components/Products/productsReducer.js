export const initalState = {
    products: [],
    loading: false,
    error: ''
}

export const actionTypes = {
    FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAIL: 'FETCH_FAIL'
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case actionTypes.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const fetchProducts = () => ({
    type: actionTypes.FETCH_PRODUCTS
})

export const fetchSucceed = (products) => ({
    type: actionTypes.FETCH_SUCCESS,
    payload: products
})

export const fetchFailed = (errorMsg) => ({
    type: actionTypes.FETCH_FAIL,
    payload: errorMsg
})
