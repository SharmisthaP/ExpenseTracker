import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentList,updateCurrentList } from "../../actions/listActions";

class DisplayList extends Component
{
    constructor()
    {
        super();
        this.state={
        monthly_budget:"",
        grocery:0,
        electricity:0,
        medicine:0,
        rents:0,
        monthly_subscriptions:0,
        fresh_produce:0,
        stationaries:0,
        toiletries:0,
        bakery:0,
        misc:0
        };
        console.log("dashboard cons called");
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    componentDidMount()
    {
        const {user}=this.props.auth;
        this.setState({
            monthly_budget:user.monthly_budget
        });
        console.log("componentdidmount");
        console.log(user.username);
        this.props.fetchCurrentList(user);
    
    }
    componentDidUpdate(prevProps)
    {
        if(prevProps.list.lastUpdated!== this.props.list.lastUpdated)
        {
        const {user}=this.props.auth;
        this.props.fetchCurrentList(user);
        this.setState({
            grocery:0,
            electricity:0,
            medicine:0,
            rents:0,
            monthly_subscriptions:0,
            fresh_produce:0,
            stationaries:0,
            toiletries:0,
            bakery:0,
            misc:0
            

        });
        }
    }
    displayList=()=>{
        const {currentlist} = this.props.list;
        //currentlist.map((list)=>{console.log(list);this.displayTotal()});
          if(!currentlist)return null;
          return currentlist.slice(0, 1).map((list,index)=>
            <div key={index}>
                <form noValidate onSubmit={this.onSubmit} >
                <div className="container">
    
                <div className="row">
                  <div className="col m3 center">
                    <i className="material-icons medium indigo-text text-darken-3">local_grocery_store</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Gro</b>cery</span>
                    <p><b>{list.grocery} + </b><input onChange={this.onChange} value={this.state.grocery} id="grocery" type="number" style={{ width: "100px" }}/></p>
                  </div>
    
                  <div className="col m3  center ">
                    <i className="material-icons medium indigo-text text-darken-3">emoji_nature</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Fre</b>sh Produce</span>
                    <p><b>{list.fresh_produce} + </b><input onChange={this.onChange} value={this.state.fresh_produce} id="fresh_produce" type="number" style={{ width: "100px" }}/></p>
                  </div>
    
                  <div className="col m3 center ">
                    <i className="material-icons medium indigo-text text-darken-3">healing</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Med</b>icine</span>
                    <p><b>{list.medicine} + </b><input onChange={this.onChange} value={this.state.medicine} id="medicine" type="number" style={{ width: "100px" }}/></p>     
                  </div>
    
                  <div className="col m3 center ">
                    <i className="material-icons medium indigo-text text-darken-3">attach_file</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Sta</b>tionaries</span>
                    <p><b>{list.stationaries} + </b><input onChange={this.onChange} value={this.state.stationaries} id="stationaries" type="number" style={{ width: "100px" }}/></p>
                  </div>
    
                </div>
    
                <br></br>
    
                <div className="row">
                  <br></br>
                  <div className="col m3 center">
                    <i className="material-icons medium indigo-text text-darken-3">wash</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Toi</b>letries</span>
                    <p><b>{list.toiletries} + </b><input onChange={this.onChange} value={this.state.toiletries} id="toiletries" type="number" style={{ width: "100px" }}/></p>
                  </div>
    
                  <div className="col m3 center">
                    <i className="material-icons medium indigo-text text-darken-3">electrical_services</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Ele</b>ctricity</span>
                    <p><b>{list.electricity} + </b><input onChange={this.onChange} value={this.state.electricity} id="electricity" type="number" style={{ width: "100px" }}/></p>
                  </div>
          
                  <div className="col m3 center ">
                    <i className="material-icons medium indigo-text text-darken-3">local_gas_station</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Fue</b>l</span>
                    <p><b>{list.monthly_subscriptions} + </b><input onChange={this.onChange} value={this.state.monthly_subscriptions} id="monthly_subscriptions" type="number" style={{ width: "100px" }}/></p>
                  </div>
    
                  <div className="col m3 center">
                    <i className="material-icons medium indigo-text text-darken-3">receipt_long</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b >Ren</b>ts</span>
                    <p><b>{list.rents} + </b><input onChange={this.onChange} value={this.state.rents} id="rents" type="number" style={{ width: "100px" }}/></p>
                  </div>
    
                </div>
                <br></br>
    
                <div className="row">
                  <br></br>
                  <div className="col m3 center">
                    <i className="material-icons medium indigo-text text-darken-3">cake</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Bak</b>ery</span>
                    <p><b>{list.bakery} + </b> <input onChange={this.onChange} value={this.state.bakery} id="bakery" type="number" style={{ width: "100px" }}/></p>
                  </div> 
                  <div className="col m3 center">
                    <i className="material-icons medium indigo-text text-darken-3">all_inclusive</i><br/>
                    <span style={{fontFamily: "monospace",color:"#283593",fontSize:"18px"}}><b>Misc</b>llaneous</span>
                    <p><b>{list.misc} + </b> <input onChange={this.onChange} value={this.state.misc} id="misc" type="number" style={{ width: "100px" }}/></p>
                  </div>     
                </div>
    
               
    
                <div className=" center " style={{ paddingLeft: "11.250px" }}>
                    <button style={{width: "500px",borderRadius: "3px",letterSpacing: "1.5px", marginTop: "1rem"}}
                      type="submit" className="btn btn-large  hoverable indigo darken-3">
                      <span className="yellow-text text-accnet-3">Update List</span>
                    </button>
                </div>
                <br></br>
                <div className="divider"></div>
              </div>
            </form>
          </div>
        ); 
            
      };

    onSubmit=e=>{
    e.preventDefault();
    const{currentlist}=this.props.list;
    const{user}=this.props.auth;
    
    // eslint-disable-next-line
        currentlist.slice(0, 1).map((list)=>{
        console.log(list);
        const listData = {
        id:list._id,
        username: user.username,
        grocery:parseFloat(this.state.grocery)+list.grocery,
        medicine:parseFloat(this.state.medicine)+list.medicine,
        electricity:parseFloat(this.state.electricity)+list.electricity,
        rents:parseFloat(this.state.rents)+list.rents,
        monthly_subscriptions:parseFloat(this.state.monthly_subscriptions)+list.monthly_subscriptions,
        stationaries:parseFloat(this.state.stationaries)+list.stationaries,
        toiletries:parseFloat(this.state.toiletries)+list.toiletries,
        fresh_produce:parseFloat(this.state.fresh_produce)+list.fresh_produce,
        bakery:parseFloat(this.state.bakery)+list.bakery,
        misc:parseFloat(this.state.misc)+list.misc,
        };
        this.props.updateCurrentList(listData);
      });
    };


    render()
    {
        return (    
                  
            <div>
                {this.displayList()}
            </div>
    );
    }
}
 DisplayList.propTypes = {
      fetchCurrentList: PropTypes.func.isRequired,
      updateCurrentList:PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired,
      list: PropTypes.object.isRequired
    };
  const mapStateToProps = state => ({
      auth: state.auth,
      list: state.list
    });
  export default connect(
      mapStateToProps,
      {fetchCurrentList,updateCurrentList}
    )(DisplayList);
