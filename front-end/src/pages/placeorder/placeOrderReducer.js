export const initalState = {
    loading: false
}

export const actionTypes = {
    CREATE_REQUEST: 'CREATE_REQUEST',
    CREATE_SUCCESS: 'CREATE_SUCCESS',
    CREATE_FAIL: 'CREATE_FAIL'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.CREATE_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
export default reducer