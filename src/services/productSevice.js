import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8081/products2';

class ProductService {
    getProducts() {
        try {
            return axios.get(API_URL, { headers: authHeader() });
        } catch (error) {
            return error
        }
    }
    getProductById(id) {
        try {
            return axios.get(API_URL + '/' + id, { headers: authHeader() });
        } catch (error) {
            console.log(error)
            return error
        }

    }
    async addNewProduct(product) {
        try {
          return await axios.post(API_URL, product, { headers: authHeader() })
        } catch (error) {
            // Error 😨
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
/*                 console.log('na ez innen jön' + error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers); */
                return error.response
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                //console.log(error.request);
                return error.request
            } else {
                // Something happened in setting up the request and triggered an Error
                //console.log('Error', error.message);
                return error.message
            }
        }

    }
    async updateProductById(id, updatedObject) {
        try {
            await axios.patch(API_URL + '/' + id, updatedObject, { headers: authHeader() });
        }
        catch (error) {
            // Error 😨
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
        }
        //res.data.headers['Content-Type']; //application/json;charset=utf-8
    }

    async addDiscountForProductById(discount, id) {
        try {
            await axios.patch(API_URL + '/' + id + '/add-discount', discount, { headers: authHeader() });
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    async deleteProductById(id) {
        try {
            await axios.delete(API_URL + '/' + id, { headers: authHeader() });
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
        }
    }

}

export default new ProductService;