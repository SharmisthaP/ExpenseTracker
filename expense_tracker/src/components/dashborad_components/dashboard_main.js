import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentList} from "../../actions/listActions";
import {fetchCurrentEvents} from"../../actions/eventActions";
import { logoutUser } from "../../actions/authActions";
import ChartOne from "../charts/chart_one.chart";
import ChartTwo from "../charts/chart_two.chart";
import ChartThree from "../charts/chart_three.chart";
import DisplayList from "../lists/display_list";
import DisplayInfo from "../lists/display_info";
import DisplayNewList from "../lists/display_newlist";
import DisplayAllEvents from "../events/display_allevents";
import BudgetUpdate from "./budget_component";
import {withRouter } from "react-router-dom";





class Dashboard extends Component
{
  componentDidMount()
  {
    window.scrollTo(0, 0);
      const {user}=this.props.auth;
      console.log("componentdidmount in dashboard");
      //console.log(user.username);
      this.props.fetchCurrentEvents(user);
      this.props.fetchCurrentList(user);
      
  
  }
  displayChartOne=()=>
  {
    
    const {currentlist} = this.props.list;
    const {eventlist} = this.props.events;
    
    const list_total = currentlist.slice(0, 1).map((list)=>list.grocery+list.medicine+list.bakery+list.rents+list.electricity+list.monthly_subscriptions
    +list.fresh_produce+list.stationaries+list.toiletries);

    var event_total=0;
    // eslint-disable-next-line
    eventlist.slice(0,1).map((list)=>{
      // eslint-disable-next-line
      list.events.map((event)=>{
        // eslint-disable-next-line
        event.event_items.map((item)=>{
          event_total=event_total+item.cost
        })
      })
    });
   console.log("list_total "+list_total);
   console.log("event total "+event_total);
   
    const spent=list_total[0]+event_total;
    console.log("total "+spent);

    var budget=0;
    // eslint-disable-next-line
    currentlist.slice(0,1).map((list)=>{
      budget=list.monthly_budget
    });

    const left=budget-spent;
    console.log("left "+left);
    return (
      <div className="center">
        <ChartOne left={left} spent={spent}/>
      </div>);

    

  };

  
  displayChartTwo=()=>
  {
    const {currentlist} = this.props.list;
    const {eventlist} = this.props.events;
  
    var event_total=0;
    // eslint-disable-next-line
    eventlist.slice(0,1).map((list)=>{
      // eslint-disable-next-line
      list.events.map((event)=>{
        // eslint-disable-next-line
        event.event_items.map((item)=>{
          event_total=event_total+item.cost
        })
      })
    });
    
    return currentlist.slice(0, 1).map((list,index)=>
      <div key={index} className="center">
        <ChartTwo 
        grocery={list.grocery} medicine={list.medicine} rents={list.rents} monthly_subscriptions={list.monthly_subscriptions} 
        fresh_produce={list.fresh_produce} toiletries={list.toiletries} bakery={list.bakery} electricity={list.electricity}
        stationaries={list.stationaries} events={event_total}/>
      </div>
      );

  };
  displayChartThree=()=>
  {
    const {currentlist} = this.props.list;
    return currentlist.slice(0, 1).map((list,index)=>
      <div key={index} className="center">
        <ChartThree
          start={list.start_date} end={list.end_date}
        />
      </div>
    );
    

  };
  onEventClick=(e)=>
    {
        console.log("create event clicked");
        this.props.history.push("/addEvent");
       
    };
    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
      
    };
  
  render()
  {

    <button style={{ width: "100px", borderRadius: "5px",marginTop: "1rem"}} onClick={this.onLogoutClick} className="btn  waves-effect waves-light hoverable indigo darken-3">
              Logout
            </button>
    /*const {currentlist} = this.props.list;
    const {eventlist} = this.props.events;
    
    if(Object.keys(currentlist).length === 0)
      return null;
  
    var today=new Date();
    var ends=currentlist.slice(0,1).map((list)=> list.end_date);
    var end_date=new Date(ends[0]);
    console.log(today.getTime()>end_date.getTime());
    console.log("today"+today);
    console.log("ending day" + end_date);
    if(today.getTime()>end_date.getTime())
    {
      return(
        <div><DisplayNewList /></div>
      );
    }
    else
    {
      const list_total = currentlist.slice(0, 1).map((list)=>list.grocery+list.medicine+list.bakery+list.rents+list.electricity+list.monthly_subscriptions
      +list.fresh_produce+list.stationaries+list.toiletries);
      
      var event_total=0;
      // eslint-disable-next-line
      eventlist.slice(0,1).map((list)=>{
        // eslint-disable-next-line
        list.events.map((event)=>{
          // eslint-disable-next-line
          event.event_items.map((item)=>{
            event_total=event_total+item.cost
          })
        })
      });
      const total=list_total[0]+event_total;

      return (   
        <div>       
          <div id="grad2" className="row ">
              <DisplayInfo total={total} />
          </div>
          
          <div className="row">
            <br></br>
              <DisplayList />
          </div>
          <div className="row">
            <div className="col m1 offset-m11">
               <BudgetUpdate />
            </div>
          </div>
         

            <div  className="container">
            <h4 className="center"><b>Stats fo</b>r the current period</h4>
              <div className="row ">

                <div className="col m5 offset-m1 center">{this.displayChartOne()}</div>
                <div className="col m5 center">{this.displayChartThree()}</div> 
              </div>

              <div className="row">
                <div className="col m8 offset-m2 center">{this.displayChartTwo()}</div>
              </div>
              <div className="divider"></div>
            </div>
              
          <br></br>
          <div className="container">
              
              <h4 className="center"><b>Upcom</b>ing Events!</h4>
              <div className="row">
                <div className="col m3 offset-m1">
                    <div className="dash">
                        <button className="btn-round center" onClick={this.onEventClick}>
                        <i className="material-icons small yellow-text text-accent-3">add</i>
                        </button>
                        <h6 className="dash-txt"><b>Plan a</b> new event!</h6>
                    </div>
                </div>
                <DisplayAllEvents/>
              </div>      
              <div className="divider"></div>
          </div>
         
          

      </div>  
          
      
        );
      }*/
    
  }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    events:PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list,
    events:state.events
  });
export default withRouter(connect(
    mapStateToProps,
    {logoutUser,fetchCurrentList,fetchCurrentEvents}
  )(Dashboard));