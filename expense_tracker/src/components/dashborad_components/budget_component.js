import React, {Component} from 'react';
import {updateBudget} from "../../actions/authActions";
import { fetchCurrentList} from "../../actions/listActions";
import PropTypes from "prop-types";
import M from "materialize-css";
import { connect } from "react-redux";

class BudgetUpdate extends Component {

    constructor()
    {
        super();
        this.state={
            monthly_budget:""
        };
        
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount() {
        /*const options = {
            inDuration: 200,
            outDuration: 200,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, options);
          M.Modal.init(this.Tooltip);*/
          M.AutoInit();
    }
    onUpdate=e=>
    {
        e.preventDefault();
        const {currentlist}=this.props.list;
        const {user}=this.props.auth;
        // eslint-disable-next-line
        currentlist.slice(0,1).map((list)=>{
            const info = {
                monthly_budget:this.state.monthly_budget,
                userid:list._id   
            };
            this.props.updateBudget(info);
            this.props.fetchCurrentList(user);
            alert("Budget has been Updated! Refresh the page to see changes");

        })
        

    }
    render() {
        
        const {currentlist}=this.props.list;
        return(
        <>
            <a href="/#" ref={Tooltip => {this.Tooltip = Tooltip;}}
            className="waves-effect waves-light modal-trigger btn-floating btn-large indigo darken-3 tooltipped"
            data-position="left" 
            data-tooltip="Update current budget"
            data-target="modal1">

                <i className="large material-icons yellow-text text-accent-3">attach_money</i>
            </a>
            <div ref={Modal => {this.Modal = Modal;}}  id="modal1" className="modal">
                <div className="modal-content center">
                    
                    <h5 style={{fontFamily: "monospace",color:"#283593"}}>Current Monthly Budget is Rs. {currentlist.slice(0,1).map((list)=>list.monthly_budget)}</h5>
                    <p style={{fontFamily: "monospace",color:"#283593",fontSize:"15px",fontWeight:"bold"}}>Enter new Budget</p>
                    <textarea value={this.state.monthly_budget}  onChange={this.onChange} id="monthly_budget" style={{ width: "230px" }} />
                    <br></br>
                    <br></br>
                    <button style={{ width: "300px", borderRadius: "5px",marginTop: "1rem"}} onClick={this.onUpdate} className="modal-close btn  waves-effect waves-light hoverable indigo darken-3">
                        <span className="yellow-text text-accent-3">Update Budget</span>
                    </button>
                    <br></br>
                </div>

            </div>
        </>
        )
    }
}

BudgetUpdate.propTypes = {
    updateBudget:PropTypes.func.isRequired,
    fetchCurrentList:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list
  });
export default connect(
    mapStateToProps,
    {updateBudget,fetchCurrentList}
  )(BudgetUpdate);
