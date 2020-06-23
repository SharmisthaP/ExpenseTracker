import axios from "axios";
import {FETCH_CURRENT_EVENTS,UPDATED_EVENT,CREATE_EVENT,CREATE_EVENT_LIST,SET_UPDATE_ID} from "./types";

export const fetchCurrentEvents=(user) => dispatch=>{

    console.log("fetch event action called");
    axios.post("events/currentEvents",user)
    .then(res=>{
        const events=res.data;
        console.log("events fetched");
        console.log(events);
        dispatch(getCurrentEvents(events)); 
    })
    .catch(err=>console.log(err));

};
export const getCurrentEvents=(events)=>{
    return{
        type:FETCH_CURRENT_EVENTS,
        payload:events
    };
};

export const updateEvent=(event)=>dispatch=>{
    console.log("event update action called");
    const url="events/updateCurrentEvent/"+event.listid;
    console.log(url);
    axios.post(url,event)
    .then(res=>{
        console.log(res);
        dispatch({type:UPDATED_EVENT});
    })
    .catch(err=>console.log(err));
};

export const addEvent=(event)=>dispatch=>{
    console.log("add event action");
    const url ="events/addEvent/"+event.list_id;
    console.log("url "+url);
    axios.post(url,event)
    .then(res=>{
        console.log(res);
        dispatch({type:CREATE_EVENT});
    })
    .catch(err=>console.log(err));
};

export const createNewEventList=(info)=>dispatch=>{
    console.log("create new list action");
    axios.post("events/createNewEventList",info)
    .then(res=>{
        console.log(res);
        dispatch({type:CREATE_EVENT_LIST});
    })
    .catch(err=>console.log(err));
}

export const setUpdateId=(id)=>dispatch=>{
    console.log(" update id action called");
    dispatch({
        type:SET_UPDATE_ID,
        payload:id
    });
}
