import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link,withRouter } from "react-router-dom";
import {fetchCurrentEvents} from"../../actions/eventActions";
import {addEvent} from "../../actions/eventActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({onChange,value,onClick}) => (
    <textarea
        onChange={onChange}
        value={value}
        onClick={onClick}
        style={{ width: "250px" }} 
    />
);

class AddEvent extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            list_id:props.list_id,
            event_date:"",
            event_name:"",
            rows:[]

        };
        this.handleDate=this.handleDate.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            ...rows[idx],
            [name]: value
        };
        this.setState({
            rows
        });
    };

    handleAddRow = () => {
        console.log("add row called");
        const new_item = {
           item: "",
           cost: ""
        };
        this.setState({
            rows: [...this.state.rows, new_item]
        });
    };

    handleRemoveRow = (idx) => {
        let rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ 
        rows: rows
        })
    };
    
    handleDate(date) {
        this.setState({
         event_date: date
        });
      
    };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
   
    onSubmit=e=>{
        e.preventDefault();
        console.log("submit called");
        const{eventlist}=this.props.events;
        // eslint-disable-next-line
        eventlist.slice(0,1).map((list,index)=>{
            const event={
                list_id:list._id,
                event_date:this.state.event_date,
                event_name:this.state.event_name,
                event_items:this.state.rows
            };
            this.props.addEvent(event);
            alert("event created!!");
            
        });
        

    };
   
    render()
    {
        return (
            <div className="container">

                <Link to="/dashboard" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> 
                    <span className="blue-text text-accent-3">Back to home</span> 
                </Link>
                
                    <div className="row">
                    
                        <div className="col m6 center">
                            <p style={{fontFamily: "monospace",color:"#283593",fontSize:"20px",fontWeight:"bold"}}>Name of the event</p>
                            <textarea  type="text" value={this.state.event_name}  onChange={this.onChange} id="event_name" style={{ width: "250px" }} />
                        </div>
                        <div className="col m6 center">
                            <p style={{fontFamily: "monospace",color:"#283593",fontSize:"20px",fontWeight:"bold"}}>Date of the event</p>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                customInput={<Input/>}
                                selected={ this.state.event_date }
                                onChange={ this.handleDate }
                                name="event_date"
                                />
                        </div>
                            
                    </div>
                    <div className="divider"></div>
                    <div className="row center">
                        <p style={{fontFamily: "monospace",color:"#283593",fontSize:"20px",fontWeight:"bold"}}>Add to expense list</p>
                        <table className="centered amber lighten-3">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th >Item</th>
                                    <th>Cost </th>
                                    <th >Delete</th>  
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.rows.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <td>{idx}</td>
                                        <td>
                                        <textarea
                                            type="text"
                                            name="item"
                                            style={{ width: "250px" }} 
                                            value={this.state.rows[idx].item}
                                            onChange={this.handleChange(idx)}
                                        />
                                        </td>
                                        <td>
                                        <textarea
                                            type="text"
                                            name="cost"
                                            style={{ width: "250px" }} 
                                            value={this.state.rows[idx].cost}
                                            onChange={this.handleChange(idx)}
                                        />
                                        </td>
                                        <td>
                                        <button  className="btn waves-effect waves-light hoverable indigo darken-3" onClick={idx => this.handleRemoveRow(idx)}>Delete Row</button>
                                        </td>
                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <div className="row center">
                        
                            <button style={{width: "200px",borderRadius: "3px",letterSpacing: "1.5px", marginTop: "1rem"}}
                            onClick={this.handleAddRow}
                            className="btn btn-large waves-effect waves-light hoverable indigo darken-3"
                            >
                            + Add Row
                            </button>
                    </div>
                    <div className="divider"></div>
                    <br></br>
                    <div className="row center">
                        
                            <button onClick={this.onSubmit} style={{width: "300px",borderRadius: "3px",letterSpacing: "1.5px", marginTop: "1rem"}} type="submit" className="btn btn-large waves-effect waves-light hoverable indigo darken-3">
                                Create Event
                            </button>
                    </div>   
            </div>

            
          );
    }

}

AddEvent.propTypes = {
    addEvent:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
   
  };
const mapStateToProps = state => ({
    auth: state.auth,
    events:state.events
  });
export default withRouter(connect(mapStateToProps,{addEvent,fetchCurrentEvents})(AddEvent));
