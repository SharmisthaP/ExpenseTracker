import axios from "axios";
import {FETCH_CURRENT_LIST,UPDATED_LIST,CREATE_LIST} from "./types";

export const fetchCurrentList=(user) => dispatch=>{

    console.log("fetch list action called");
    axios.post("/expense_lists/currentList",user)
    .then(res=>{
        const list=res.data;
        console.log("list fetched");
        console.log(list);
        dispatch(getCurrentList(list)); 
    })
    .catch(err=>console.log(err));

};
export const getCurrentList=(list)=>{
    return{
        type:FETCH_CURRENT_LIST,
        payload:list
    };
};
export const updateCurrentList=(list)=>dispatch=>{
    console.log("list update action called");
    const url="/expense_lists/updateCurrentList/"+list.id;
    console.log(url);
    axios.post(url,list)
    .then(res=>{
        console.log(res);
        dispatch({type:UPDATED_LIST});
    })
    .catch(err=>console.log(err));
};

export const createNewList=(info)=>dispatch=>{
    console.log("create new list action");
    axios.post("/expense_lists/createNewList",info)
    .then(res=>{
        console.log(res);
        dispatch({type:CREATE_LIST});
    })
    .catch(err=>console.log(err));
}
