import React from 'react';
import './App.css';
import classNames from "classnames";
import ReactDOM from 'react-dom';
import { Tab } from 'carbon-components';
import { DataTable, Dropdown } from 'carbon-components-react';
import { CSVLink, CSVDownload } from "react-csv";

const {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader} = DataTable;

const headerData = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'role',
    header: 'Role',
  },
  {
    key: 'status',
    header: 'Status',
  },
];
const stringItems = ['Name', 'Role', 'Status'];

class App extends React.Component {

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
        .then(res => this.setState({ apiResponse: res}));
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
    var idsub= ReactDOM.findDOMNode(this.refs.tab2);
    idsub.className ="bx--tabs__nav-item ";
    var idlib= ReactDOM.findDOMNode(this.refs.tab1);
    idlib.className ="bx--tabs__nav-item bx--tabs__nav-item--selected";
    var idpen= ReactDOM.findDOMNode(this.refs.tab3);
    idpen.className ="bx--tabs__nav-item ";
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
      var idsub= ReactDOM.findDOMNode(this.refs.tab2);
      idsub.className ="bx--tabs__nav-item bx--tabs__nav-item--selected ";
      var idlib= ReactDOM.findDOMNode(this.refs.tab1);
      idlib.className ="bx--tabs__nav-item ";
      var idpen= ReactDOM.findDOMNode(this.refs.tab3);
      idpen.className ="bx--tabs__nav-item";
    //  console.log("++++++++++++++"+idLic.className);
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
      var idsub= ReactDOM.findDOMNode(this.refs.tab2);
      idsub.className ="bx--tabs__nav-item";
      var idlib= ReactDOM.findDOMNode(this.refs.tab1);
      idlib.className ="bx--tabs__nav-item";
      var idpen= ReactDOM.findDOMNode(this.refs.tab3);
      idpen.className ="bx--tabs__nav-item bx--tabs__nav-item--selected";
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
         <br/><br/>
    				<a id="addSingleUser" className="bx--link" href="#" onClick={this.addSingleUser}>
            <i className="fa fa-plus"></i> Add New user </a>&nbsp;&nbsp;&nbsp;
    				<a id="addMultipleUser" className="bx--link" href="#" onClick={this.addMultipleUser}>
            <i className="fa fa-plus"></i>Add Multiple user </a>
    				<hr/>
            <div data-tabs className="bx--tabs">

                  <ul className="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
                    <li className="bx--tabs__nav-item bx--tabs__nav-item--selected "
                    data-target=".tab-1-default" role="tab" aria-selected="true" ref="tab1">
                      <a tabIndex="0" id="tab-link-1-default" className="bx--tabs__nav-link"
                      href="#" role="tab" aria-controls="tab-panel-1-default" onClick={this.loadLicencedUser}>Liscenced User</a>
                    </li>
                    <li className="bx--tabs__nav-item " data-target=".tab-2-default" role="tab" ref="tab2" >
                      <a tabIndex="0" id="tab-link-2-default" className="bx--tabs__nav-link" href="#" role="tab"
                      aria-controls="tab-panel-2-default" onClick={this.loadSubscriptionUser}>Subscription Administrator</a>
                    </li>
                    <li className="bx--tabs__nav-item " data-target=".tab-3-default" role="tab" ref="tab3" >
                      <a tabIndex="0" id="tab-link-3-default" className="bx--tabs__nav-link"
                      href="#" role="tab" aria-controls="tab-panel-3-default"
                      onClick={this.loadPendingUser}>Pending Interaction</a>
                    </li>
                  </ul>
                </div>

            <hr/>
            <div className="row">
                      <div className="col-lg-4">
                          <div className="upper-left">
                              <div className="dataTables_filter">
                                  <label>
                                      <input type="search" className="bx--search-input"  value={this.state.inputSearchValue} placeholder="Search by name or IBMid" className="form-control input-sm" name="customFilter" onChange={this.handleFilter} />
                                      <button onClick={this.searchString}><i className="fa fa-search"></i></button>
                                      &nbsp;&nbsp;&nbsp;
                                      <CSVLink data={this.state.tableData}>
                                        <i className="fa fa-download"></i>
                                        Export User File</CSVLink>
                                  </label>


                              </div>
                          </div>
                      </div>

            </div>

            <div>

            <br/>
            <div className="row">
                       <div className="col-lg-12">
                           <div id="headerText" className="row">
                               <div className="col-lg-12">
                                  <DataTable rows={this.state.tableData}
                                  headers={headerData}
                                  render={({ rows, headers, getHeaderProps }) => (
                                    <TableContainer>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            {headers.map(header => (
                                              <TableHeader {...getHeaderProps({ header })}>
                                                {header.header}
                                              </TableHeader>
                                            ))}
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {rows.map(row => (
                                            <TableRow key={row.id}>
                                              {row.cells.map(cell => (
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                              ))}
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>)}
                                />
                              </div>
                        </div>
                  </div>
              </div>

          </div>


       </div>
    );
  }
}
export default App;
