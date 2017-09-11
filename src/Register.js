import React, {Component} from 'react';
import Store from './services/Store';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './css/Register.css';
import Paper from 'material-ui/Paper';
class Register extends Component{
  state={
    loading:false,
    sent:false,
    failed:false,
    errors:{},
    firstname:"",
    lastname:"",
    // description:"",
    email:"",
    password:"",
    password_confirmation:"",
  }
  registrate = ()=>{
    this.setState({loading:true});
    var details = {
      email:this.state.email,
      password:this.state.password,
      password_confirmation:this.state.password_confirmation,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      // description:this.state.description
    };
    Store.registrate(details,(successBody)=>{
      this.setState({loading:false,sent:true});

    },(failResponse)=>{
      this.setState({loading:false});
      console.log(failResponse);
      failResponse.json().then((responseBody)=>{
        console.log(responseBody);
        this.setState({
          failed:true,
          errors:responseBody.errors
        });
      });
    });
  }
  handleChange = (e)=>{
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  buttonShouldBeDisabled=()=>{
    return !(this.state.email
       && this.state.password
       && this.state.password_confirmation
       && this.state.firstname
       && this.state.lastname
      //  && this.state.description
     );
  }

  render(){
    if(this.state.sent){
      return(
        <h3>Check your emails for the confirmation</h3>
      );
    }
    const style={
      container: {
      position: 'relative',
      },
    refresh: {
      display: 'inline-block',
      position: 'absolute',
      },
    };

    var loadingIndicator=(<div></div>);
    if(this.state.loading){
      loadingIndicator = (<RefreshIndicator
        size={40}
        top={-10}
        left={250}
        status="loading"
        style={style.refresh}
      />)
    }
    var emailErrors=(<div></div>);
    var passwordErrors=(<div></div>);
    var passwordConfirmationErrors=(<div></div>);
    if(this.state.failed){
      var factoryFunc = (error)=>{
        return (
          <span key={error} className="error-small">{error}</span>
        );
      };
      if(this.state.errors.email)
        emailErrors=this.state.errors.email.map(factoryFunc);
      if(this.state.errors.password)
        passwordErrors=this.state.errors.password.map(factoryFunc);
      if(this.state.errors.password_confirmation)
        passwordConfirmationErrors=this.state.errors.password_confirmation.map(factoryFunc);

    }

    return(
      <Paper className="register-form-container">
        <form className="register-form" style={style.container} >
          <h4>Create Account</h4>
          <TextField  floatingLabelText="Firstname" name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange}/>
          <TextField  floatingLabelText="Lastname" name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange}/>
          {/* <TextField  floatingLabelText="Description" multiLine={true} name="description" type="text" value={this.state.description} onChange={this.handleChange} style={{textAlign:"left"}}/> */}

          <TextField  floatingLabelText="Email" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>

          {emailErrors}
       <TextField  floatingLabelText="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
          <br/>
          {passwordErrors}
         <TextField  floatingLabelText="Password confirmation" name="password_confirmation" type="password" value={this.state.password_confirmation} onChange={this.handleChange}/>
          <br/>
          {passwordConfirmationErrors}
          <br/>
          <RaisedButton onClick={this.registrate} disabled={this.buttonShouldBeDisabled()} primary={true} label="Create Account!"/>
          {loadingIndicator}

        </form>
      </Paper>
    );
  }
}
export default Register;
