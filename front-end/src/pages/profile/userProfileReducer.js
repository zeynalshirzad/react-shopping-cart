const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'UPDATE_SUCCESS':
            return { ...state, loading: false }
        case 'UPDATE_FAIL':
            return { ...state, loading: false }

        default:
            return state
    }
}
export default reducer