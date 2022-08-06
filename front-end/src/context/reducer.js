import produce from 'immer'

export const initalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}

const actionTypes = {
    CART_ADD_ITEM: 'CART_ADD_ITEM',
    CART_UPDATE_ITEM_QUANTITY: 'CART_UPDATE_ITEM_QUANTITY',
    CART_DELETE_ITEM: 'CART_DELETE_ITEM'
}
export const reducer = produce((state, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            const cartItems = state.cart.cartItems
            const newItem = action.payload
            const existItem = cartItems.find(p => p._id === newItem._id)
            existItem ? existItem.quantity++ : cartItems.push(action.payload)
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            break
        case actionTypes.CART_UPDATE_ITEM_QUANTITY:
            const updatedItem = action.payload
            const item = state.cart.cartItems.find(p => p._id === updatedItem._id)
            item.quantity = updatedItem.quantity
            localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))
            break
        case actionTypes.CART_DELETE_ITEM:
            const deletedItemId = action.payload
            state.cart.cartItems = state.cart.cartItems.filter(p => p._id !== deletedItemId)
            localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))
            break
        default:
            break
    }
}, initalState)