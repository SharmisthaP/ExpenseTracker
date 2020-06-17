import React,{Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";



class CompareItems extends Component
{
    constructor()
    {
        super();
        this.state={
            grocery:"",
            electricity:"",
            medicine:"",
            rents:"",
            monthly_subscriptions:"",
            fresh_produce:"",
            stationaries:"",
            toiletries:"",
            bakery:"",
            misc:"",
            events:""
        }
    }
    componentDidMount()
    {
        const {currentlist} = this.props.list;
        const {eventlist} = this.props.events;

        const two_events=eventlist.slice(0,2).map((event)=>{return event});

        const two_lists=currentlist.slice(0,2).map((list)=>{return list});
        console.log(two_lists);

        const list1=two_lists[0];
        const list2=two_lists[1];

        var event1=0;
        // eslint-disable-next-line
        two_events[0].events.map((event)=>{
            // eslint-disable-next-line
            event.event_items.map((item)=>{
            event1=event1+item.cost
            })
        });
        var event2=0;
        // eslint-disable-next-line
        two_events[1].events.map((event)=>{
            // eslint-disable-next-line
            event.event_items.map((item)=>{
            event2=event2+item.cost
            })
        });
        this.setState({
            grocery: list1.grocery-list2.grocery,
            fresh_produce: list1.fresh_produce-list2.fresh_produce,
            medicine: list1.medicine-list2.medicine,
            stationaries: list1.stationaries-list2.stationaries,
            electricity: list1.electricity-list2.electricity,
            rents: list1.rents-list2.rents,
            monthly_subscriptions: list1.monthly_subscriptions-list2.monthly_subscriptions,
            bakery: list1.bakery-list2.bakery,
            toiletries: list1.toiletries-list2.toiletries,
            misc: list1.misc-list2.misc,
            events:event1-event2
        });
        M.AutoInit();
        
    }
    render()
    {

        return (
            <>
            <ul className="collapsible popout" ref={Collapsible => {this.Collapsible = Collapsible;}}>
                <li>
                <div className="collapsible-header ">
                    <i className="material-icons">swap_vert</i>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"16px",fontWeight:"bold"}} className="indigo-text text-darken-3 center">Click to see comparison of expense categories over the last two periods</span>
                </div>
                <div className="collapsible-body">
                <ul className="collection">
                    <li className="collection-item avatar">

                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">local_grocery_store</i>
                        <p className="title"><b>Grocery</b></p>
                        
                        {this.state.grocery>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.grocery}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.grocery}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">emoji_nature</i>
                        <span className="title"><b>Fresh Produce</b></span>
                        
                        {this.state.fresh_produce>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.fresh_produce}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.fresh_produce}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">healing</i>
                        <span className="title"><b>Medicine</b></span>
                        
                        {this.state.medicine>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.medicine}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.medicine}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">attachment</i>
                        <span className="title"><b>Stationaries</b></span>
                        
                        {this.state.stationaries>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.stationaries}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.stationaries}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">wash</i>
                        <span className="title"><b>Toiletries</b></span>
                        
                        {this.state.toiletries>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.toiletries}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.toiletries}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">electrical_services</i>
                        <span className="title"><b>Electricity</b></span>
                        
                        {this.state.electricity>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.electricity}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.electricity}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">local_gas_station</i>
                        <span className="title"><b>Fuel</b></span>
                        
                        {this.state.monthly_subscriptions>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.monthly_subscriptions}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.monthly_subscriptions}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">receipt_long</i>
                        <span className="title"><b>Rents</b></span>
                        
                        {this.state.rents>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.rents}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.rents}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">cake</i>
                        <span className="title"><b>Bakery</b></span>
                        
                        {this.state.bakery>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.bakery}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.bakery}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">all_inclusive</i>
                        <span className="title"><b>Miscllaneous</b></span>
                        
                        {this.state.misc>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.misc}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.misc}</span>)
                        }
                        
                    </li>
                    <li className="collection-item avatar">
                        
                        <i className="material-icons circle indigo darken-3 yellow-text text-accent-3">filter_vintage</i>
                        <span className="title"><b>Events</b></span>
                        
                        {this.state.events>0? 
                        (<span className="secondary-content red-text text-darken-1"><i className="material-icons left ">trending_up</i>+{this.state.events}</span>) :
                        (<span className="secondary-content light-green-text text-darken-1"><i className="material-icons left ">trending_down</i>{this.state.events}</span>)
                        }
                        
                    </li>
                </ul>
            </div>
        </li>
        </ul>
            </>
        );
    }
}
CompareItems.propTypes = {
    
    auth: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    events:PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list,
    events:state.events
  });
export default connect(mapStateToProps)(CompareItems);