const lodash = require('lodash');
const { getSumQuantity, getSubtotal, getSumCharge } = require('../../services/cartService')
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

const getDefaultState = () => {
    return {
        items: []
    }
}

const initialState = cartItems ? cartItems : getDefaultState()

const cartReducer = (state, action) => {
    state = initialState

    if (action.type === 'ADD_TO_CART') {
        let product = action.payload
        const products = state.items
        let productIndex = lodash.findIndex(products, function (o) { return o._id === product._id; });

        if (productIndex < 0) {
            let subi = getSubtotal(product)
            product = { ...product, ...{ subTotal: subi } }
            products.push(product)
        } else {
            products[productIndex].quantity = products[productIndex].quantity + product.quantity
            let subTotal = getSubtotal(products[productIndex])
            products[productIndex].subTotal = subTotal
        }
        localStorage.setItem('cartItems', JSON.stringify({ items: products }));
        return {state: products}
    } else {
        return  {state: []}
    }
}

export default cartReducer;