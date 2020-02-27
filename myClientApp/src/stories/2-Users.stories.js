import React from 'react';
import './App.css';
//import './fontawesome.css';
//import Search from 'react-search';
import DataTable from 'react-data-table-component';
//import ReactSearchBox from 'react-search-box';
import { action } from '@storybook/addon-actions';//import { Welcome } from '@storybook/react/demo';
import { Button } from '@storybook/react/demo';

//const data = [{ id: 1, name: 'Henry', role: 'Liscenced user, Subscription Administration', status:'Active' },
//{ id: 2, name: 'Billy', role: 'Liscenced user', status:'Active' },
//{ id: 3, name: 'Coral', role: 'Subscription Administration', status:'Active' },
//{id: 4, name: 'Kate', role: 'Pending', status:'Inactive'}];
export default {
  title: 'Button',
  component: Button,
};

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Role',
    selector: 'role',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    right: true,
  },
];
class ManageUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date(),
                  showLicencedUser: true,
                  tableData:[] ,
                  tableDataAll:[],
                  showSubscriptionUser:false,
                  showPendingUser:false,
                  loadlicbuttonFlag:false,
                  loadsubsbuttonFlag:false,
                  loadPendButtonFlag:false,
                  apiResponse:'',
                  inputSearchValue:''};
    this.loadLicencedUser = this.loadLicencedUser.bind(this);
    this.loadSubscriptionUser = this.loadSubscriptionUser.bind(this);
    this.loadPendingUser = this.loadPendingUser.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.searchString = this.searchString.bind(this);
    this.putValue =this.putValue.bind(this);
  }
  callAPI() {
    fetch("http://localhost:9000/tableDataAPI")
        .then(res => res.text())
      //  .then(res =>  abc= res);
        .then(res => this.setState({ apiResponse: res}));

//console.log("-----"+abc);
//    }, 5000);

        //this.setState({tableData: this.state.apiResponse});
   }
   putValue(){
     var val =this.state.apiResponse;
     console.log("+++++++++val"+JSON.parse(val).data);
     this.setState({tableData:JSON.parse(val).data});

     this.setState({tableDataAll:JSON.parse(val).data});
   }
  componentDidMount() {
   this.callAPI();
   let that =this;
   setTimeout(function() {
     that.putValue();
        }, 750);
  }

  componentWillUnmount() {

  }
  addSingleUser(e) {
    e.preventDefault();
    console.log("abc");
  }
  addMultipleUser(e) {
    e.preventDefault();
    console.log('Add multiple User Clicked.');
  }
  loadLicencedUser(e) {
    e.preventDefault();
    var data=this.state.tableDataAll;
    var dataLic = [] ;
    var j=0;
    for(var i=0;i<data.length;i++){
    var datarole =(data[i]).role;
      if(datarole.includes('Liscenced')){
        dataLic[j]=data[i];
        j++;
      }
    }
    this.setState({tableData:dataLic});
  }
  loadSubscriptionUser(e){
      e.preventDefault();
      var data=this.state.tableDataAll;
      var dataSubs = [] ;
      var j=0;
      for(var i=0;i<data.length;i++){
      var datarole =(data[i]).role;
        if(datarole.includes('Subscription')){
          dataSubs[j]=data[i];
          j++;
        }
      }
      this.setState({tableData:dataSubs});
  }
  loadPendingUser(e){
    console.log('load Pending User.');
      e.preventDefault();
      var data=this.state.tableDataAll;
      var dataPend = [] ;
      var j=0;
      for(var i=0;i<data.length;i++){
      var datarole =(data[i]).role;
        if(datarole.includes('Pending')){
          dataPend[j]=data[i];
          j++;
        }
      }
      this.setState({tableData:dataPend});
  }

  handleFilter(e){
    e.preventDefault();
    this.setState({inputSearchValue: e.target.value});
    var data=this.state.tableDataAll;
    if(e.target.value === ''){
      this.setState({tableData:data});
      console.log('Input is blanck')

    }
  }
  searchString(e){
    e.preventDefault();
    let input = this.state.inputSearchValue,
        data=this.state.tableDataAll,
        dataPend = [] ,
        j=0;
    console.log('input'+input);
    for(var i=0;i<data.length;i++){
    var datarole =(data[i]).name;
      if(datarole.includes(input)){
        dataPend[j]=data[i];
        j++;
      }
    }
    this.setState({tableData:dataPend});
  }

  render() {
    return (
      <div className="page-wrapper">
         <div className="row">
                        <div className="col-lg-12">
                            <div id="headerText" className="row">
                                <div className="col-lg-12">
                                    <h2>Manage Users</h2>
                                </div>
                            </div>
                        </div>
         </div>

    				<a id="addSingleUser" className="App-link" href="#" onClick={this.addSingleUser}>
            <i className="fa fa-plus"></i> Add New user </a>&nbsp;&nbsp;&nbsp;
    				<a id="addMultipleUser" className="App-link" href="#" onClick={this.addMultipleUser}>
            <i className="fa fa-plus"></i>Add Multiple user </a>
    				<hr/>
    				<button id="licencedUser" onClick={this.loadLicencedUser}> Liscenced User </button>&nbsp;&nbsp;&nbsp;
    				<button id="subscriptionUser"  onClick={this.loadSubscriptionUser}> Subscription Administrator </button>&nbsp;&nbsp;&nbsp;
    				<button id="pendingInteraction" href="#" onClick={this.loadPendingUser}> Pending Interactions </button>
            <hr/>
            <div className="row">
                      <div className="col-lg-4">
                          <div className="upper-left">
                              <div className="dataTables_filter">
                                  <label>
                                      <input type="search" value={this.state.inputSearchValue} placeholder="Search by name or IBMid" className="form-control input-sm" name="customFilter" onChange={this.handleFilter} />
                                      <button onClick={this.searchString}><i className="fa fa-search"></i></button>
                                  </label>

                              </div>
                          </div>
                      </div></div>
            <div>
          <DataTable
        columns={columns}
        data={this.state.tableData}
      />
          </div>


       </div>
    );
  }
}
export ManageUsers;
