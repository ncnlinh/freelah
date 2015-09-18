import React from 'react';
import {PropTypes, Link} from 'react-router'
import {AppStore} from '../stores';
import AppActions from '../actions/AppActions';
import {Grid, Row, Col} from 'react-bootstrap';
import {TextField, RaisedButton} from 'material-ui';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class Signup extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    if (this.state.user) {
      this.context.history.pushState(null, '/');
    }
    AppStore.listen(this.onChange);
  }

  ComponentWillUnMount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    if (this.state.isLoggedIn) {
      // AppStore.unlisten(this.onChange);   
      console.log(state);
      this.context.history.pushState(null, '/');
    } else if (this.state.error) {
      // error handler
      console.log(state);
    }
  }

  handleSignUp(e) {
    e.preventDefault();

    let username = this.refs.username.refs.input.getDOMNode().value;
    let password = this.refs.password.refs.input.getDOMNode().value;
    let email = this.refs.email.refs.input.getDOMNode().value;
    let phone = this.refs.phone.refs.input.getDOMNode().value;
    let confirmPassword = this.refs.confirmPassword.refs.input.getDOMNode().value;
    if (password === confirmPassword) {
      AppActions.signup(username, email, phone, password);  
    } else {
      console.log("Sign Up failed!");
    }
  }

  render() {
    let error = this.state.error ? ' ' : null;
    console.log(error)
    return (
      <Grid>
        <div className="fl-auth lead">
        <Row>
            <Col xs={3} md={4}/>
            <Col xs={6} md={4} style={{textAlign: 'center', paddingTop: '40px'}}>
              <h3>FreeLah</h3>
            </Col>
            <Col xs={3} md={4}/>
        </Row>
        <form bsStyle="inline" onSubmit={this.handleSignUp}>
        <Row>
          <Col style={{paddingLeft: '20px', paddingRight:'20px'}}>
            <TextField ref="username" hintText="User Name" floatingLabelText="User Name" required={true} errorText={error} fullWidth/>
            <TextField ref="email" hintText="Email" floatingLabelText="Email" required={true} errorText={error} fullWidth/>
            <TextField ref="phone" hintText="Phone Number" floatingLabelText="Phone Number" required={true} errorText={error} fullWidth/>
            <TextField ref="password" hintText="Password" floatingLabelText="Password" type="password" required={true} errorText={error} minLength={5} fullWidth/>
            <TextField ref="confirmPassword" hintText="Confirm Password" floatingLabelText="Confirm Password" type="password" required={true} errorText={error} minLength={5} fullWidth/>
          </Col>
        </Row>
        <Row>
          <Col style={{'padding': '20px'}}>
            <RaisedButton type="submit" bsStyle="success" onClick={this.handleSignUp} fullWidth>
              Sign up
            </RaisedButton >
            <Link to={`/login`} style={{textAlign: 'center', fontSize:'14px'}}>
                <p style={{paddingTop:'5px', color:'blue'}}>Don't have an account</p>
            </Link>
          </Col>
        </Row>
        </form>
        </div>
      </Grid>
    );
  }

}
Signup.childContextTypes = {
  muiTheme: React.PropTypes.object
};
Signup.contextTypes = {
  history: PropTypes.history
}

export default Signup;
