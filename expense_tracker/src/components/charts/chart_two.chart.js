import React,{Component} from "react";
import {Pie} from "react-chartjs-2";

class ChartTwo extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            chartData:{
                labels:['Grocery','Electricity','Medicine','Rents','Monthly Subscriptions','Fresh Produce','Stationaries',
                'Toiletries','Bakery','Events'],
                datasets:[{label:'Spending',data:[props.grocery,props.electricity,props.medicine,props.rents,props.monthly_subscriptions,props.fresh_produce,props.stationaries,props.toiletries,props.bakery,props.events],
                backgroundColor:['#1a237e','#3f51b5','#7986cb','#c5cae9 ','#e8eaf6','#ffd600','#ffea00', '#ffff00', '#ffff8d', '#fff59d']
            }]
            }
          };
    }
   
    UNSAFE_componentWillReceiveProps(newProps){
        this.setState({chartData:{
            labels:['Grocery','Electricity','Medicine','Rents','Monthly Subscriptions','Fresh Produce','Stationaries',
                'Toiletries','Bakery','Events'],
            datasets:[{label:'Spending',data:[newProps.grocery,newProps.electricity,newProps.medicine,newProps.rents,newProps.monthly_subscriptions,newProps.fresh_produce,newProps.stationaries,newProps.toiletries,newProps.bakery,newProps.events]}]
        }})//this method will not get called first time
     }
    render()
    {
        console.log("in chart2 component");
        console.log(this.state.chartData);
        return(
            <Pie
            data={this.state.chartData}
            width={180}
            height={70}
            options={{title:{display:true,text:'Category wise spending'},legend:{display:true,position:'bottom'} }}
            />
        )
    }
}
export default ChartTwo;