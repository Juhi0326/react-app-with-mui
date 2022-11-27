const lodash = require('lodash');
const { getSumQuantity, getSubtotal, getSumCharge } = require('../../services/cartService')
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

const getDefaultState = () => {
    return {
        items: [],
        sumOfCharge: 0,
        sumQuantity: 0
    }
}

const initialState = cartItems ? cartItems : getDefaultState()

const cartReducer = (state, action) => {
    state = initialState
    if (action.type === 'ADD_TO_CART') {
        let product = action.payload
        let products = state.items
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
        const SumOfCharge = getSumCharge(state.items)
        const SumQuantity = getSumQuantity(state.items)
        state = { ...state, ...{ items: products, sumOfCharge:SumOfCharge, sumQuantity: SumQuantity } }
        localStorage.setItem('cartItems', JSON.stringify({ items: products, sumOfCharge:SumOfCharge, sumQuantity: SumQuantity }));
        return state
    } else if (action.type === 'CHANGE_QUANTITY_OF_PRODUCT') {
        console.log(action.productId)
        let productId = action.productId
        let quantity = action.quantity
        let products = state.items
        let productIndex = lodash.findIndex(products, function (o) { return o._id === productId; });
            if (productIndex < 0) {
                console.log('nincs ilyen product id')
            } else {
                products[productIndex].quantity = quantity
                let subTotal = getSubtotal(products[productIndex])
                products[productIndex].subTotal = subTotal
                const SumOfCharge = getSumCharge(state.items)
                const SumQuantity = getSumQuantity(state.items)
                state = { ...state, ...{ items: products, sumOfCharge:SumOfCharge, sumQuantity: SumQuantity } }
                localStorage.setItem('cartItems', JSON.stringify({ items: products, sumOfCharge:SumOfCharge, sumQuantity: SumQuantity }));
                return state
            }
    }
    else {
        const SumOfCharge = getSumCharge(state.items)
        const SumQuantity = getSumQuantity(state.items)
        state = { ...state, ...{ sumOfCharge:SumOfCharge, sumQuantity: SumQuantity } }
        return  state;
    }
}

export default cartReducer;