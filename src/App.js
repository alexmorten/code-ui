import React, { Component } from 'react';
import './css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {NavLink,withRouter} from 'react-router-dom';
import Store from './services/Store';
import logo from './appicon.jpg';
class App extends Component {
  handleLogout = ()=>{
    Store.deauthenticate();
    this.props.history.push("/login");
    this.props.history.goForward();
    this.forceUpdate();
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
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} alt="logo" className="logo"/>
            <div className="navbar">
              <NavLink className="link" activeClassName="link-active" to="/" exact={true}>Dashboard</NavLink>
                <NavLink className="link" activeClassName="link-active" to="/learning" exact={true}>Learning</NavLink>
                <NavLink className="link" activeClassName="link-active" to="/profiles" exact={true}>Profiles</NavLink>

            </div>
            {loginLink}
          </div>
          <div className="App-body">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
