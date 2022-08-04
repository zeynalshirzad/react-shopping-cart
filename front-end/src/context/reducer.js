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
            state.cart.cartItems.push(action.payload)
            console.log(state.cart.cartItems);
            break
        default:
            break
    }
}, initalState)