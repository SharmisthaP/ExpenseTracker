import React,{Component} from "react";
import {Doughnut} from "react-chartjs-2";

class ChartOne extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            percentage:Math.floor((props.spent/(props.spent+props.left))*100),
            chartData:{labels:['Amount Spent','Amount Left'],
            datasets:[{label:'Spending',data:[props.spent,props.left],backgroundColor:['#b71c1c','#eeeeee'] }]
        }
          };
    }
    
   
    UNSAFE_componentWillReceiveProps(newProps){
        this.setState({
            percentage:(newProps.spent/(newProps.spent+newProps.left))*100,
            chartData:{
            labels:['Amount Spent','Amount Left'],
            datasets:[{label:'Spending',data:[newProps.spent,newProps.left],backgroundColor:['#ffea00','#eeeeee'] }]
            }
        })//this method will not get called first time
     }
    render()
    {
        console.log("in chart1 component");
        console.log(this.state.chartData);
        return(
            <Doughnut
            data={this.state.chartData}
            width={120}
            height={50}
            options={{title:{display:true,text:Math.floor(this.state.percentage)+" % of the budget spent",position:'top',fontSize:12},legend:{display:false,position:'bottom'},cutoutPercentage:70  }}
            />
        )
    }
}
export default ChartOne;