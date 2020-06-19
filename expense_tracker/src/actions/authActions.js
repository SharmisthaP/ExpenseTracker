import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING,UPDATE_BUDGET} from "./types";

//register user
export const registerUser = (user, history) => dispatch => {
  console.log("auth called");
  console.log(user);
    axios
      .post("http://localhost:7000/users/register", user)
      .then(res => {console.log("user added");history.push("/login");}) // re-direct to login on successful register history.push("/login");
      .catch(err =>{
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
  };
//login-get user token
export const loginUser= (user,history) =>dispatch=>{
    axios
    .post("http://localhost:7000/users/login", user)
    .then(res=>{
        //console.log("auth action called");
        const {token}=res.data;
        localStorage.setItem("jwtToken",token);
        setAuthToken(token);
        const decoded=jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        
    })
    .catch(err=>dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};
//set current user
export const setCurrentUser=(decoded)=>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
//userloading
export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
//user log out
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
export const updateBudget=(info)=>dispatch=>{

  console.log(info.userid);
  const url="http://localhost:7000/users/updateBudget/"+info.userid;
  console.log("auth url : "+url);
  axios
  .post(url,info)
  .then(res=>{
    console.log(res);
    dispatch({type:UPDATE_BUDGET});
  })
  .catch(err=>console.log(err));

}

