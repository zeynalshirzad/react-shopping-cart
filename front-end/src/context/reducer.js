import produce from 'immer'

export const initalState = {
    cart: {
        cartItems: []
    }
}

const actionTypes = {
    CART_ADD_ITEM: 'CART_ADD_ITEM'
}
export const reducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            const newItem = action.payload
            const existItem = state.cart.cartItems.find(p => p._id === newItem._id)
            existItem ? existItem.quantity++ : state.cart.cartItems.push(action.payload)
            break
        default:
            break
    }
}, initalState)