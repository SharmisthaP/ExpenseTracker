import React,{Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Line} from "react-chartjs-2";
var moment = require('moment');


class SpendingChart extends Component
{
    constructor()
    {
        super();
        this.state={
            chartData:{
                labels:[],
                datasets:[]
            }
        };
    }
    componentDidMount()
    {   
        const {currentlist} = this.props.list;
        const {eventlist} = this.props.events;

        const list_total=currentlist.map((list)=>list.grocery+list.medicine+list.bakery+list.rents+list.electricity+list.monthly_subscriptions
        +list.fresh_produce+list.stationaries+list.toiletries);

        const budget=currentlist.map((list)=>list.monthly_budget);

        var temp=0;
        const event_total=eventlist.map((list)=>{
            temp=0;
            // eslint-disable-next-line
            list.events.map((event)=>{
                // eslint-disable-next-line
            event.event_items.map((item)=>{
                temp=temp+item.cost
            })
            })
            return temp;
        });

        var total = list_total.map(function (num, idx) {
            return num + event_total[idx];
        });
        var savings = total.map(function (num, idx) {
            return budget[idx] - num;
        });

        console.log("componentdidmount");
        console.log(total);
        const dates=currentlist.map((list)=>{
            const start_date=moment(list.start_date).format("MMMM Do YYYY");
            const end_date=moment(list.end_date).format("MMMM Do YYYY");
            const label= start_date+" - "+end_date;
            return label;
        });

        total.reverse();
        dates.reverse();
        savings.reverse();

        this.setState({
            chartData:{
                datasets:[
                    {
                        label:'Total expenses',
                        data:total,
                        fill: false,
                        backgroundColor: "#ffcdd2",
                        borderColor: "#c62828"
                    },
                    {
                        label:'Savings',
                        data:savings,
                        fill: false,
                        backgroundColor: "#dcedc8",
                        borderColor: "#33691e"
                    }
                ]
                ,
                labels:dates
            }
        });
       
    }
 
    render()
    {
        console.log("in line chart component");
        console.log(this.state.chartData);
        return(
            <Line
            data={this.state.chartData}
            width={120}
            height={30}
            options={{
                title:{display:true,text:"Your Spending Trends ",position:'top',fontSize:15},
                legend:{display:true,position:'right'},
                scales: {
                    yAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'Amount (Rs)'
                      }
                    }],
                    xAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'Expense periods'
                      }
                    }],
                }     
            }}
            />
        )
    }

}
SpendingChart.propTypes = {
    
    auth: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    events:PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list,
    events:state.events
  });
export default connect(mapStateToProps)(SpendingChart);