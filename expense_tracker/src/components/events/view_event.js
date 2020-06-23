import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {updateEvent,fetchCurrentEvents,setUpdateId} from"../../actions/eventActions";
import {withRouter,Link } from "react-router-dom";
var moment = require('moment');

class ViewEvent extends Component
{
    constructor()
    {
        super();
        this.state={
            display_event:{},
            display_items:[]
        };
    }
   
    componentDidMount()
    {
       
        window.scrollTo(0, 0);
        const{eventlist}=this.props.events;
        const events=eventlist[0].events;
        const updateid=this.props.match.params.id;
        // eslint-disable-next-line
        events.map((event)=>{
            if(event._id === updateid)
            {
                console.log("view event componentdidmount");
                console.log(event);
                this.setState({
                    display_event:event,
                    display_items:event.event_items
                });

            }
        });
    }

    onSubmit=(e)=>
    {
        e.preventDefault();
        const{eventlist}=this.props.events;

        // eslint-disable-next-line
        eventlist.slice(0,1).map((list,index)=>{
            const event={
                listid:list._id,
                eventid:this.props.match.params.id,
                event_name:this.state.display_event.event_name,
                event_date:this.state.display_event.event_date,
                event_items:this.state.display_items
            };
            this.props.updateEvent(event);
            console.log(event);
            alert("event updated!!"); 
        });
    }
        
        
    handleChange = idx => e => {
        const { name, value } = e.target;
        const display_items = [...this.state.display_items];
        display_items[idx] = {
            ...display_items[idx],
            [name]: value
        };
        this.setState({
            display_items
        });
    };
    handleAddRow = () => {
        console.log("add row called");
        const new_item = {
           item: "",
           cost: ""
        };
        this.setState({
            display_items: [...this.state.display_items, new_item]
        });
    };
    handleRemoveRow = (e) => {
        console.log(e.target.value);
        let display_items = [...this.state.display_items]
        display_items.splice(e.target.value, 1);
        this.setState({ 
        display_items:display_items
        });
        
    };

    render()
    {
            const event=this.state.display_event;
           // console.log();
           
            return(
            <div className="container">
               <Link to="/dashboard" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> 
                    <span className="blue-text text-accent-3">Back to home</span> 
                </Link>
                   
                <h4 className="center" style={{fontFamily: "monospace",color:"#283593",fontWeight:"bold"}}>{event.event_name}</h4>
                    
                <h5 style={{fontFamily: "monospace",color:"#283593",fontWeight:"bold"}} className="center">{moment(event.event_date).format("dddd,MMMM Do YYYY")}</h5>
                <br></br>

                <h6 style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}} className="center">Expenses for the event..</h6>
                <table className="centered yellow lighten-1">
                <thead >
                    <tr>
                        <th> # </th>
                        <th>Item</th>
                        <th>Cost</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.display_items.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                            <td>{idx}</td>
                            <td>
                            <textarea
                                type="text"
                                name="item"
                                style={{ width: "150px" }} 
                                value={this.state.display_items[idx].item}
                                onChange={this.handleChange(idx)}
                            />
                            </td>
                            <td>
                            <textarea
                                type="text"
                                name="cost"
                                style={{ width: "150px" }} 
                                value={this.state.display_items[idx].cost}
                                onChange={this.handleChange(idx)}
                            />
                            </td>
                            <td>
                                <button  className="btn hoverable indigo darken-3" value={idx} onClick={this.handleRemoveRow}>Delete Row</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <br></br>
                <div className="row center">  
                    <button style={{width: "200px",borderRadius: "3px",letterSpacing: "1.5px", marginTop: "1rem"}}
                    onClick={this.handleAddRow}
                    className="btn btn-large  hoverable indigo darken-3"
                    >
                        + Add Row
                    </button>
                </div>
                <div className="divider"></div>
                <div className="row center">  
                    <button style={{width: "300px",borderRadius: "3px",letterSpacing: "1.5px", marginTop: "1rem"}}
                    onClick={this.onSubmit}
                    className="btn btn-large  hoverable indigo darken-3"
                    >
                       Save Changes
                    </button>
                </div>
            </div>
            
            );
    }
}
ViewEvent.propTypes = {
    updateEvent:PropTypes.func.isRequired,
    fetchCurrentEvents:PropTypes.func.isRequired,
    setUpdateId:PropTypes.func.isRequired,
    events: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    events:state.events,
    auth:state.auth
  });
export default withRouter(connect(mapStateToProps,{updateEvent,fetchCurrentEvents,setUpdateId})(ViewEvent));
