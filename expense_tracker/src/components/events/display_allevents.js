import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {withRouter } from "react-router-dom";
import { fetchCurrentEvents} from "../../actions/eventActions";
var moment = require('moment');

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
  }

class DisplayAllEvents extends Component
{

   
    componentDidMount()
    {
        const {user}=this.props.auth;
        console.log("componentdidmount");
        console.log(user.username);
        this.props.fetchCurrentEvents(user);
    
    }
    componentDidUpdate(prevProps)
    {
        if(prevProps.list.lastUpdated!== this.props.list.lastUpdated)
        {
            const {user}=this.props.auth;
            this.props.fetchCurrentEvents(user);
        
        }
    }
    onView=(e)=>
    {
        console.log("on view clicked");
        const url="/viewEvent/"+e.target.value;
        console.log(url);
        this.props.history.push(url);
    }
    displayEvents=()=>
    {
        const{eventlist}=this.props.events;
       if(!eventlist) return null;
     
       var today = new Date();
       return eventlist.slice(0,1).map((list)=>
       {
           list.events.sort(sortByProperty("event_date"));
           return list.events.map((event,index)=>
           
                    <div key={index} className="col m3 offset-m1 card yellow lighten-1">
                       <div className="card-content center indigo-text text-darken-3">
                           <i className="material-icons small">push_pin</i>
                           {moment(event.event_date).isBefore(today)? (
                                <span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} className="card-title">{event.event_name}</span>
                                ) : (
                                <span className="card-title">{event.event_name}</span>
                            )}
                            <p>{moment(event.event_date).format("MMMM Do YYYY")}</p>
                            <p>{moment(event.event_date).format("dddd")}</p>
                       
                        <button style={{ width: "150px", borderRadius: "5px",marginTop: "1rem"}} value={event._id} onClick={this.onView} className="btn  waves-effect waves-light hoverable indigo darken-3">
                            View Expenses
                        </button>
                        </div>
                   </div>
               
               
           
           );

        
        });
        
        
    }
    
    render()
    {
        return(
            
            this.displayEvents()
            
        
       
        
        
        );
    }
}
DisplayAllEvents.propTypes = {
    fetchCurrentEvents: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
   
  };
const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events,
    list:state.list
  });
export default withRouter(connect(mapStateToProps,{fetchCurrentEvents})(DisplayAllEvents));