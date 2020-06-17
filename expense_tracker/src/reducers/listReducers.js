import {FETCH_CURRENT_LIST,UPDATED_LIST} from "../actions/types";


const intialState={
    currentlist:[],
    lastUpdated: ""
};

export default function(state=intialState,action)
{
    switch(action.type)
    {
        case FETCH_CURRENT_LIST:
        {
            console.log("list reducer called");
            console.log("list in reducer ");
            console.log(action.payload);
            return {
               ...state,
                currentlist: action.payload
            };
        }
        case UPDATED_LIST:
        {
            console.log("reducer for update called");
            console.log(new Date());
            return{
                ...state,
                lastUpdated: new Date() 
            };
        }
        default:
            return state;
    }
   
}