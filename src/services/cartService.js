const lodash = require('lodash');

const getSumQuantity = (products) => {
    var sum = 0
    lodash.forEach(products, function (value) {
        lodash.forEach(value, function (value2, key2) {
            if (key2 === 'quantity') {
                sum += value2
            }
        })
    });
    return sum
}

const getSubtotal = (product) => {

    return product.discountedPrice * product.quantity
}

const getSumCharge = (products) => {
    console.log('ide bejön, és ez a products tömb: ' + products)
    var sum = 0
    lodash.forEach(products, function (value) {
        lodash.forEach(value, function (value2, key2) {
            if (key2 === 'subTotal') {
                sum += value2
            }
        })
    });
    return sum
}



module.exports = { getSumQuantity, getSubtotal, getSumCharge }