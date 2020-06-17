import React,{Component} from "react";
import {Doughnut} from "react-chartjs-2";

class ChartThree extends Component
{
    constructor(props)
    {
        super(props);
        var today=new Date();
        var end_day= new Date(props.end);
        var start_day=new Date(props.start);
        var days_gone=Math.floor( (today.getTime() - start_day.getTime())/ (1000 * 3600 * 24));
        var duration=Math.floor((end_day.getTime()-start_day.getTime())/(1000 * 3600 * 24));
        var days_left=duration-days_gone;
        var percent=Math.floor((days_gone/duration)*100);
        console.log( "start day :"+start_day+" end day "+end_day+" duration "+duration+" today "+today+" gone"+days_gone);
        this.state={
            percentage:percent,
            chartData:{
                labels:['Days completed in the period','Dyas left in the period'],
                datasets:[{label:'Days',data:[days_gone,days_left],backgroundColor:['#283593','#eeeeee']}]
            }
        };
    }
   
    UNSAFE_componentWillReceiveProps(newProps){


        var today=new Date();
        var end_day= new Date(newProps.end);
        var start_day=new Date(newProps.start);
        var days_gone=Math.ceil((today.getTime()-start_day.getTime())/ (1000 * 3600 * 24));
        var duration=Math.ceil((end_day.getTime()-start_day.getTime())/(1000 * 3600 * 24));
        var days_left=duration-days_gone;
        var percent=Math.floor((days_gone/duration)*100);

        console.log( "start day :"+start_day+" end day "+end_day+" duration "+duration+" today "+today);
        console.log("days gone : "+days_gone);
        console.log("days left : "+days_left);

        this.setState({
            percentage:percent,
            chartData:{
                labels:['Days completed in the period','Days left in the period'],
                datasets:[{label:'Days',data:[days_gone,days_left],backgroundColor:['#283593','#eeeeee']}]
            }
            
        });
     }
    render()
    {
        console.log("in chart3 component");
        //console.log(this.state.chartData);
        return(
            <Doughnut
            data={this.state.chartData}
            width={120}
            height={50}
            options={{title:{display:true,text:this.state.percentage+" % of the period completed",position:'top',fontSize:12},legend:{display:false},cutoutPercentage:70 }}
            />
        )
    }
}
export default ChartThree;
