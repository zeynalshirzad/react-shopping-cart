import produce from 'immer'

export const initalState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress') ? localStorage.getItem('shippingAddress') : {},
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}

const actionTypes = {
    CART_ADD_ITEM: 'CART_ADD_ITEM',
    CART_UPDATE_ITEM_QUANTITY: 'CART_UPDATE_ITEM_QUANTITY',
    CART_DELETE_ITEM: 'CART_DELETE_ITEM',
    USER_SIGNIN: 'USER_SIGNIN',
    USER_SIGNOUT: 'USER_SIGNOUT',
    SAVE_SHIPPING_ADDRESS: 'SAVE_SHIPPING_ADDRESS'
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
        case actionTypes.USER_SIGNIN:
            state.userInfo = action.payload
            break
        case actionTypes.USER_SIGNOUT:
            state.userInfo = null
            state.cart.shippingAddress = {}
            state.cart.cartItems  = []
            break
        case actionTypes.SAVE_SHIPPING_ADDRESS:
            state.cart.shippingAddress = action.payload
            break
        default:
            break
    }
}, initalState)