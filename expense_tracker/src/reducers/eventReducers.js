import {FETCH_CURRENT_EVENTS,UPDATED_EVENT,SET_UPDATE_ID} from "../actions/types";

const intialState={
    eventlist:[],
    lastUpdated: "",
    updateid:""
};

export default function(state=intialState,action)
{
    switch(action.type)
    {
        case FETCH_CURRENT_EVENTS:
        {
            console.log("event reducer called");
            console.log("events in reducer ");
            console.log(action.payload);
            return {
               ...state,
                eventlist: action.payload
            };
        }
        case UPDATED_EVENT:
        {
            console.log("reducer for event update called");
            return{
                ...state,
                lastUpdated: new Date() 
            };
        }
        case SET_UPDATE_ID:
        {
            console.log("reducer for set update id");
            console.log(action.payload);
            return {
                ...state,
                updateid:action.payload
            }
        }
        default:
            return state;
    }
   
}