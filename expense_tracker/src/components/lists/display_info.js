import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

var moment = require('moment');

class DisplayInfo extends Component
{
  
  displayInfo=()=>
  {
    const {currentlist} = this.props.list;
    const {user}=this.props.auth;
    
    const spent=this.props.total;
    return currentlist.slice(0, 1).map((list,index)=>
      <div key={index} >
          <br></br>
          <div className="col m2  center">
            <i className="material-icons small indigo-text text-darken-3">face</i>
            <p style={{fontFamily: "monospace",color:"#283593",fontSize:"12px"}}>{user.username}</p>
          </div>
          <div className="col m2 center ">
            <i className="material-icons-round small indigo-text text-darken-3">account_balance_wallet</i><br/>
            <p style={{fontFamily: "monospace",color:"#283593",fontSize:"12px"}}>Monthly Budget Rs.<b>{list.monthly_budget}</b></p>
          </div>
          <div className="col m3 center ">
              <i className="material-icons small indigo-text text-darken-3">post_add</i><br/>
              {spent > user.monthly_budget? (
                  <p style={{fontFamily: "monospace",color:"#283593",fontSize:"12px"}} className="card-title red-text text-darken-1">
                   Total Spent Rs.<b>{spent}</b><br></br>Exceeded your budget by Rs.{spent-list.monthly_budget}!!</p>
                  ) : (
                    <p style={{fontFamily: "monospace",color:"#283593",fontSize:"12px"}}>Total Spent Rs.<b>{spent}</b></p>
              )}
              
          </div>
          <div className="col m3 center ">
              <i className="material-icons small indigo-text text-darken-3">access_time</i><br/>
              <p style={{fontFamily: "monospace",color:"#283593",fontSize:"12px"}}>{moment(list.start_date).format("MMMM Do YYYY")} - {moment(list.end_date).format(" MMMM Do YYYY")}</p>
          </div>
          <div className="col m2">
            <button style={{ width: "100px", borderRadius: "5px",marginTop: "1rem"}} onClick={this.onLogoutClick} className="btn  waves-effect waves-light hoverable indigo darken-3">
              Logout
            </button>
          </div>

      </div>

    );
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    
  };

  render()
  {
      return (    
                
          <div>
              {this.displayInfo()}
          </div>
  );
  }
}
DisplayInfo.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list
  });
export default connect(
    mapStateToProps,
    {logoutUser}
  )(DisplayInfo);