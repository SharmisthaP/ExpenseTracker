import axios from "axios";
import jwt_decode from "jwt-decode";
const setAuthToken = token => {
    if (token) {
      // Apply authorization token to every request if logged in
      console.log(jwt_decode(token));
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };export default setAuthToken;