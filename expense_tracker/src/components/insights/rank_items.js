import React,{Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] < b[property])  
          return 1;  
       else if(a[property] > b[property])  
          return -1;  
   
       return 0;  
    }  
  }

class RankItems extends Component
{
    constructor()
    {
        super()
        this.state={
            categories:[
                {name:"Grocery",spent:0},
                {name:"Fresh Produce",spent:0},
                {name:"Medicine",spent:0},
                {name:"Stationaries",spent:0},
                {name:"Rents",spent:0},
                {name:"Toiletries",spent:0},
                {name:"Bakery",spent:0},
                {name:"Electricity",spent:0},
                {name:"Miscllaneous",spent:0},
                {name:"Fuel",spent:0},
                {name:"Events",spent:0},

            ]
        }
    }
    componentDidMount()
    {
        const {currentlist} = this.props.list;
        const {eventlist} = this.props.events;

        var temp=0;
        // eslint-disable-next-line
        eventlist.map((list)=>{
            // eslint-disable-next-line
            list.events.map((event)=>{
                // eslint-disable-next-line
                event.event_items.map((item)=>{
                    temp=temp+item.cost
                })
            })
        });
        var grocery=0;
        var electricity=0;
        var medicine=0;
        var rents=0;
        var monthly_subscriptions=0;
        var fresh_produce=0;
        var stationaries=0;
        var toiletries=0;
        var bakery=0;
        var misc=0;
       
        // eslint-disable-next-line
        currentlist.map((list)=>{
            const categories = [...this.state.categories];
            grocery+=list.grocery;
            categories[0] = {
                ...categories[0],
                spent:grocery
            };
            fresh_produce+=list.fresh_produce;
            categories[1] = {
                ...categories[1],
                spent:fresh_produce
            };
            medicine+=list.medicine;
            categories[2] = {
                ...categories[2],
                spent:medicine
            };
            stationaries+=list.stationaries;
            categories[3] = {
                ...categories[3],
                spent:stationaries
            };
            rents+=list.rents;
            categories[4] = {
                ...categories[4],
                spent:rents
            };
            toiletries+=list.toiletries
            categories[5] = {
                ...categories[5],
                spent:toiletries
            };
            bakery+=list.bakery;
            categories[6] = {
                ...categories[6],
                spent:bakery
            };
            electricity+=list.electricity
            categories[7] = {
                ...categories[7],
                spent:electricity
            };
            misc+=list.misc;
            categories[8] = {
                ...categories[8],
                spent:misc
            };
            monthly_subscriptions+=list.monthly_subscriptions;
            categories[9] = {
                ...categories[9],
                spent:monthly_subscriptions
            };
            categories[10] = {
                ...categories[10],
                spent:temp
            };
            this.setState({
                categories
            });
        });
        M.AutoInit();
    }

    render()
    {
       
        this.state.categories.sort(sortByProperty("spent"));
        console.log(this.state.categories);
        return(
            <ul className="collapsible popout" ref={Collapsible => {this.Collapsible = Collapsible;}}>
                <li>
                   
                    <div className="collapsible-header">
                        <i className="material-icons">emoji_events</i>
                        <span style={{fontFamily: "monospace",color:"#283593",fontSize:"16px",fontWeight:"bold"}} className="indigo-text text-darken-3 center">Click to see rank of categories according to your spending</span>
                        
                    </div>
                    <div className="collapsible-body">
                        {this.state.categories.map((category,idx)=>(
                            <div key={idx}>
                            <div className="row center" >
                                <p><span className="col m4 indigo-text text-darken-3"><b>Rank {idx+1}</b></span> 
                                <span className="col m4 "><b>{category.name}</b> </span> 
                                <span className="col m4 light-green-text text-darken-1 "><b>Rs.{category.spent}</b></span></p>
                            </div>
                            <div className="divider"></div>
                            </div>
                        ))}
                    </div>
                </li>
            </ul>
        );
    }
}
RankItems.propTypes = {
    
    auth: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    events:PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list,
    events:state.events
  });
export default connect(mapStateToProps)(RankItems);