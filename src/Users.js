import React from 'react';
import AuthComponent from "./helperComponents/AuthComponent";
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
class User extends React.Component{
  render(){
    var user = this.props.user;
    return(
      <div>
        <Divider/>
        <h3>{user.fullname}</h3>
        <p>{user.description}</p>
      </div>
    )
  }
}

class Users extends AuthComponent{
  state = {
    users:[],
    query:"",
    status:""
  }
  getUsers = (query=this.state.query,status=this.state.status)=>{
    this.query("users",{query:query,status:status},(users)=>{
      this.setState({users:users})
    },(fail)=>{console.log(fail);})
  }
  componentDidMount(){
    this.getUsers();
  }
  onQueryChange = (e)=>{
    var newQuery = e.target.value;
    this.setState({query:newQuery});
    this.getUsers(newQuery,this.state.status);
  }
  onStatusChange = (e,i,value)=>{
    console.log(value);
    var newStatus = value;
    this.setState({status:newStatus});
    this.getUsers(this.state.query,newStatus);
  }
render(){
  var users = this.state.users || [];
  var userItems = users.map((user)=>{
    return <User user={user} key={user.id}/>;
  });

  return (
      <Paper>
        <div>
          <TextField floatingLabelText="Search" value={this.state.query} onChange={this.onQueryChange}/>
          {/* <TextField floatingLabelText="Role" value={this.state.status} onChange={this.onStatusChange}/> */}
          <SelectField
          floatingLabelText=""
          value={this.state.status}
          onChange={this.onStatusChange}
        >
          <MenuItem value={""} primaryText="Any" />
          <MenuItem value={"student"} primaryText="Student" />
          <MenuItem value={"staff"} primaryText="Staff" />
          <MenuItem value={"external"} primaryText="Partners" />

        </SelectField>
        </div>
        {userItems}
      </Paper>
  );
}
}
export default Users;
