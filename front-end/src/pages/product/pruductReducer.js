export const initalState = {
    product: null,
    loading: true,
    error: ''
}

export const actionTypes = {
    FETCH_PRODUCT: 'FETCH_PRODUCT',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAIL: 'FETCH_FAIL'
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
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

export const fetchProduct = () => ({
    type: actionTypes.FETCH_PRODUCT
})

export const fetchSucceed = (products) => ({
    type: actionTypes.FETCH_SUCCESS,
    payload: products
})

export const fetchFailed = (errorMsg) => ({
    type: actionTypes.FETCH_FAIL,
    payload: errorMsg
})
