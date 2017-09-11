import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import Register from './Register';
import Users from './Users';
import Dashboard from './Dashboard';
import Learning from './Learning';
class RouteController extends Component{
render(){
  return(
    <Router >
      <Route path="/" >
        <App>
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/profiles" component={Users}></Route>
            <Route path="/learning" component={Learning}></Route>
            <Route path="/" component={Dashboard}></Route>

          </Switch>
        </App>
      </Route>
    </Router>
  );
}
}
export default RouteController;
