import React, { Component } from 'react';
import './css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {NavLink,withRouter} from 'react-router-dom';
import Store from './services/Store';
class App extends Component {
  handleLogout = ()=>{
    Store.deauthenticate();
    this.props.history.push("/login");
    this.props.history.goForward();
    this.forceUpdate();
    }
  render() {
    var loginLink=(
        <NavLink className="link" activeClassName="link-active login" to="/login">Login</NavLink>
    );
    if(Store.isAuthenticated()){
      loginLink=(
      <a className="link" onClick={this.handleLogout}>Logout</a>
      )
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">

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
