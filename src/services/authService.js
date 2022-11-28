import axios from 'axios';


const API_URL = 'http://localhost:8081/users/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
  }

  RegisterForm(user) {
    return axios.post(API_URL + 'signup2', user);
  }

  sendResetPasswordEmail(email) {
    try {
      return axios.post(API_URL + 'reset-password', {email})
    } catch (error) {
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
  }

  receiveNewPassword(id, token, password) {
    try {
      return axios.post(`${API_URL}receive_new_password/${id}/${token}`, password)

    } catch (error) {
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
  }
/*   getUser() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useSelector(state => state.loggedIn);
    return user;
  } */
}

export default new AuthService();