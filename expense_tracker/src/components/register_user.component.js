import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { createNewList } from "../actions/listActions";
import {createNewEventList} from "../actions/eventActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      monthly_budget:"",
      start_date:"",
      end_date:"",
      errors: {}
    };
    this.handleStart=this.handleStart.bind(this);
    this.handleEnd=this.handleEnd.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
 /* componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }*/
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleStart(date) {
    console.log(date);
    this.setState({
      start_date: date
    });
  };
  handleEnd(date) {
    console.log(date);
    this.setState({
      end_date: date
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      monthly_budget: this.state.monthly_budget,
      password: this.state.password,
      start_date : this.state.start_date,
      end_date : this.state.end_date
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history); 
    this.props.createNewList(newUser);
    this.props.createNewEventList(newUser);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">

        <div className="row">

        <div id="grad1" className="col m5 " style={{ height: "80vh"}}>
           
          <div className="row">
            <div className="col m12 center"><h4 className="indigo-text text-darken-3"><b>Spend</b> wisely!</h4></div>
            <p className="grey-text text-darken-1 center" >
                 with <span style={{fontFamily: "monospace",fontSize:"18px"}}>Expense Tracker</span>
              </p>
          </div>
          <br></br>
          
          <div className="row">
            <div className="col m11 offset-m1 indigo-text text-darken-3">
              <i className="material-icons left">dynamic_feed</i>
              <h6><b>All your expenses at one place.</b></h6>
            </div>
            </div>
            <div className="row">
            <div className="col m11 offset-m1 indigo-text text-darken-3">
              <i className="material-icons left">priority_high</i>
              <h6><b>Get alerts when you overspend.</b></h6>
            </div>
            </div>
            <div className="row">
            <div className="col m11 offset-m1 indigo-text text-darken-3">
              <i className="material-icons left">filter_vintage</i>
              <h6><b>Plan expenses for your events.</b></h6>
            </div>
            </div>
            <div className="row">
            <div className="col m11 offset-m1 indigo-text text-darken-3">
              <i className="material-icons left">trending_up</i>
              <h6><b>Analyse with insights into your spending data.</b></h6>
            </div>
  
          </div>
        </div>

        <div id="grad2" className="col m7 " style={{ height: "80vh"}}>

          <div className="row">
            <div className="col m8 offset-m3" >
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
          <div className="row ">
          <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col m6">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  style={{ width: "230px" }} 
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <label htmlFor="username">Name</label>
                <span className="red-text">{errors.username}</span>
              </div>
              <div className="input-field col m6">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  style={{ width: "230px" }} 
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col m6">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  style={{ width: "230px" }} 
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col m6">
                <input
                  onChange={this.onChange}
                  value={this.state.monthly_budget}
                  error={errors.monthly_budget}
                  id="monthly_budget"
                  type="text"
                  style={{ width: "230px" }} 
                  className={classnames("", {
                    invalid: errors.monthly_budget
                  })}
                />
                <label htmlFor="monthly_budget">Monthly Budget</label>
                <span className="red-text">{errors.monthly_budget}</span>
              </div>
              <div className="col m6 input-field">
                Start date of the first expense period<DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={ this.state.start_date }
                    onChange={ this.handleStart }
                    id="start_date"
                    name="start_date"
                  />
                  
              </div>
              <div className="col m6 input-field ">
              End date of the first expense period
                  <DatePicker
                    selected={ this.state.end_date }
                    dateFormat="yyyy/MM/dd"
                    onChange={ this.handleEnd }
                    id="end_date"
                    name="end_date"
                  /> 
                  
                </div>
              <div className="col s12 center">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable indigo darken-3"
                >
                  Sign up
                </button>
              </div>
              <br></br>
            </form>
          
          </div>

        </div>
        
      </div>

    </div>
     
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  createNewList: PropTypes.func.isRequired,
  createNewEventList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser,createNewList,createNewEventList}
)(withRouter(Register));