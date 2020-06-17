import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewList} from "../../actions/listActions";
import { createNewEventList} from "../../actions/eventActions";
import {updateBudget} from "../../actions/authActions";
import SpendingChart from "../insights/line_chart";
import CompareItems from "../insights/compare_items";
import RankItems from "../insights/rank_items";
import DatePicker from "react-datepicker";
import {withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

class DisplayNewList extends Component
{
    constructor()
    {
        super();
        this.state={
            start_date:new Date(),
            end_date:"",
            monthly_budget:""
        };
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }
    componentDidMount()
    {
        const {user}=this.props.auth;
        this.setState({
            monthly_budget:user.monthly_budget
        });
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    handleStart(date) {
      this.setState({
        start_date: date
      });
      console.log(this.state.start_date);

    };
    handleEnd(date) {
      this.setState({
        end_date: date
      });
    };

    onSubmit = e => {
    e.preventDefault();
    const {user}=this.props.auth;
    const info = {
        username: user.username,
        start_date:this.state.start_date,
        end_date:this.state.end_date,
        monthly_budget:this.state.monthly_budget,
        userid:user.id   
    };
    this.props.createNewList(info);
    this.props.updateBudget(info);
    this.props.createNewEventList(info);
    console.log("list created");
    this.props.history("/dashboard");
    };

    render()
    {
      
      return(
        
        <div className="container" >

          <div className="row">
            <div className="col m1 offset-m1">
                <i className="material-icons large yellow-text text-accent-3">insights</i>
            </div>
            <br></br>
            <div className="col m10">
                <h4>
                <b>Insights into your</b> expenses so far.. 
                </h4>
                <span className="grey-text text-darken-1">
                Your last expense period has expired and the previous list has been saved.Scroll down to start a new list.
                </span>
            </div>
          </div>
          <br></br>
          <div className="row">
              <SpendingChart />
          </div>
          <br></br>

          <div className="row">
            <div className="col m6">
                <CompareItems />
            </div>
            <div className="col m6">
              <RankItems />
            </div>
          </div>

          <div className="divider"></div>

          <div className="row">
            <div className=" col m10 offset-m2 ">
                <h4>
                <b>Start a new list</b> for a new expense period! 
                </h4>
            </div>
          </div>
          
        
            <form noValidate onSubmit={this.onSubmit}>
            <div className="row">
                <div className="col m5 offset-m1 center">
                  <p style={{fontFamily: "monospace",color:"#283593",fontSize:"18px",fontWeight:"bold"}}>Starting date of the expense period </p>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={ this.state.start_date }
                    onChange={ this.handleStart }
                    inline
                    name="start_date"
                  />
                </div>
                <div className="col m5 center">
                  <p style={{fontFamily: "monospace",color:"#283593",fontSize:"18px",fontWeight:"bold"}}>Ending date of the expense<br></br> period </p>
                  <DatePicker
                    selected={ this.state.end_date }
                    dateFormat="yyyy/MM/dd"
                    onChange={ this.handleEnd }
                    inline
                    name="end_date"
                  /> 
                </div>
              </div>
              <div className="row">
                <div className="col m8 offset-m2 center">
                <p style={{fontFamily: "monospace",color:"#283593",fontSize:"18px",fontWeight:"bold"}}>Budget for the expense period </p>
                <textarea value={this.state.monthly_budget}  onChange={this.onChange} id="monthly_budget" style={{ width: "230px" }} />
              </div>
              </div>
              <div className="row">
              <div className="col m8 offset-m3" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "500px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable indigo darken-3"
                >
                  Start New List
                </button>
                <p></p>
              </div>
            </div>
          </form>
        </div>

        );
    }
}
DisplayNewList.propTypes = {
    createNewList:PropTypes.func.isRequired,
    createNewEventList:PropTypes.func.isRequired,
    updateBudget:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
    auth: state.auth,
    
  });
export default withRouter(connect(
    mapStateToProps,
    {createNewList,updateBudget,createNewEventList}
  )(DisplayNewList));
