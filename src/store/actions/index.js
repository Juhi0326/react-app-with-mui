
export const signIn = (payload)=> {
    return {
        type: 'SIGN_IN',
        payload
    }
}

export const signOut = ()=> {
    return {
        type: 'SIGN_OUT'
    }
}

export const toastShow = (text, textType)=> {
    return {
        type: 'TOAST_SHOW',
        payload: text,
        textType,
    }
}

export const toastHide = (text)=> {
    return {
        type: 'TOAST_HIDE',
        payload: '',
        textType: '',
    }
}

export const addToCart = (payload)=> {
    return {
        type: 'ADD_TO_CART',
        payload,
    }
}
export const clearCart = (payload)=> {
    return {
        type: 'CLEAR_CART',
    }
}


/* export const changeQuantityOfProductById = (productId,quantity)=> {
    return {
        type: 'CHANGE_QUANTITY_OF_PRODUCT',
        productId,
        quantity

    }
} */
