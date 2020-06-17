import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
   // console.log("cons called");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      //console.log("wil recieve props called");
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
     username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData,this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  
  render() {
    const { errors } = this.state;
  
    return (
      <div className="container">
        
        <div className="row" style={{paddingTop:"50px"}}>
          <div id="grad2" className="col m7" style={{ height: "60vh"}}>
          <div className="col s12 center" >
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username || errors.usernamenotfound
                  })}
                />
                <label htmlFor="username">Username</label>
                <span className="red-text">
                  {errors.username}
                  {errors.usernamenotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12 center" >
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
                  Login
                </button>
              </div>
            </form>

          </div>
          <div id="grad1" className="col m5" style={{ height: "60vh"}}>
            <div className="row" style={{paddingTop:"100px"}}>
              <div className="col m12 center"><h4 className="indigo-text text-darken-3"><b>Welcome</b> back!</h4></div>
              <p className="grey-text text-darken-1 center" >
                 to <span style={{fontFamily: "monospace",fontSize:"18px"}}>Expense Tracker</span>
                </p>
            </div>

          </div>
        </div>
      </div>
      /*<div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username || errors.usernamenotfound
                  })}
                />
                <label htmlFor="username">Username</label>
                <span className="red-text">
                  {errors.username}
                  {errors.usernamenotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>*/
    );
  }
}
LoginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(LoginUser);
