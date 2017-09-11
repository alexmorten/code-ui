import React, { Component } from 'react';
import './css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {NavLink,withRouter} from 'react-router-dom';
import Store from './services/Store';
import logo from './appicon.jpg';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
class App extends Component {
  state={
    openDrawer:false
  }
  handleLogout = ()=>{
    Store.deauthenticate();
    this.props.history.push("/login");
    this.props.history.goForward();
    this.forceUpdate();
    }
    handleToggleDrawer=()=>{
      this.setState({openDrawer:!this.state.openDrawer});
    }
    handleCloseDrawer=()=>{
      this.setState({openDrawer:false});
    }
  render() {
    var loginLink=(
        <NavLink className="link login" activeClassName="link-active login" to="/login">Login</NavLink>
    );
    if(Store.isAuthenticated()){
      loginLink=(
      <a className="link login" onClick={this.handleLogout}>Logout</a>
      )
    }
    var menuItemStyle={
      color:"white",
      textAlign:"left",
      fontSize:"15px",
      margin:"0",
      lineHeight:"15px",
      minHeight:"30px"
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            {/* <RaisedButton label="open" onClick={this.handleToggleDrawer}/> */}
            <img src={logo} alt="logo" className="logo" onClick={this.handleToggleDrawer}/>
            <div className="navbar">
              <NavLink className="link" activeClassName="link-active" to="/" exact={true}>Dashboard</NavLink>
                <NavLink className="link" activeClassName="link-active" to="/learning" exact={true}>Learning</NavLink>
                <NavLink className="link" activeClassName="link-active" to="/profiles" exact={true}>Profiles</NavLink>

            </div>
            {loginLink}
          </div>
          <div className="App-body">
            <Drawer
              style={{
                top:"40px",
                color:"white"
              }}
              containerStyle={{
                backgroundColor:"black",
                color:"white"
              }}
              docked={false}
              width={200}
              open={this.state.openDrawer}
              onRequestChange={(open) => this.setState({openDrawer:open})}>
              <br/>
              <br/>
              <br/>
              <br/>

              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Prog. Languages</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Databases</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Tools & OS</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >DevOps</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Math & Algorithms</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Computer Architecture</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Planning & QA</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Collaboration</MenuItem>
              <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Did I forget something?</MenuItem>

            </Drawer>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
