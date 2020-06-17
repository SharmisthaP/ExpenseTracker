import React,{Component} from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    render() {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper indigo darken-3 ">
              <Link to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center yellow-text text-accent-3">
                <i className="material-icons large yellow-text text-accent-3">list_alt</i>
                Expense Tracker
              </Link>
            </div>
          </nav>
        </div>
      );
    }
  }