import axios from "axios";
import {CHART_ONE} from "./types";

export const fetchCurrentList=(user) => dispatch=>{

    console.log("fetch list action called");
    axios.post("http://localhost:5000/expense_lists/currentList",user)
    .then(res=>{
        const list=res.data;
        console.log("list fetched in chart action");
        const total=currentlist.map((list) =>list.grocery+list.medicine+list.bakery+list.rents+list.electricity+list.monthly_subscriptions
        +list.fresh_produce+list.stationaries+list.toiletries);
        dispatch(); 
    })
    .catch(err=>console.log(err));

};