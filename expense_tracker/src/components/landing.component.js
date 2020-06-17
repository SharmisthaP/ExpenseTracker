import React, { Component } from "react";
import { Link } from "react-router-dom";


class Landing extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }} className=" valign-wrapper "id="grad1">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Manage your expenses seamlessly with
              <span className="indigo-text text-darken-3" style={{ fontFamily: "monospace",color:"#283593"}}> Expense Tracker </span> 
             every month.
            </h4>
            <br />
            <br />
            <div className="col s6 ">
                <p className="flow-text grey-text text-darken-1">Register in one simple step using your credentials! </p>
              <Link
                to="/register"
                style={{
                  width: "200px",
                  borderRadius: "5px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable indigo darken-3"
              >
                Register
              </Link>
              <br/>
            </div>
            <div className="col s6 ">
            <p className="flow-text grey-text text-darken-1">Already have an account?<br/> Sign In.</p>
              <Link
                to="/login"
                style={{
                  width: "200px",
                  borderRadius: "5px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white-text indigo darken-3"
              >
                Log In
              </Link>
              <br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}export default Landing;